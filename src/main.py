from delta.tables import *
from pyspark.sql import SparkSession, Row
from pyspark.sql.types import *
from pyspark.sql.functions import *
import psycopg2
import multiprocessing
import concurrent.futures
import functools
import pyarrow as pa
import pyarrow.parquet as pq
import json
import pandas as pd
import numpy as np
import os
import OCR
import pyspark


os.environ['PYSPARK_PYTHON'] = sys.executable
os.environ['PYSPARK_DRIVER_PYTHON'] = sys.executable
os.environ["PYARROW_IGNORE_TIMEZONE"] = "1"

# Inicia e configura

inst = 5  # Número de instâncias
dir_path = os.getcwd() + '\\RESPOSTAS\\'
files = [dir_path + file for file in os.listdir(dir_path)]

spark = SparkSession.builder.config(
    'spark.driver.extraClassPath', 'C:/Users/vitor/AppData/Roaming/DBeaverData/drivers/maven/maven-central/org.postgresql/postgresql-42.2.25.jar') \
    .config("spark.jars.packages", "io.delta:delta-core_2.12:2.1.0") \
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension") \
    .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog") \
    .getOrCreate()
spark.conf.set('spark.sql.execution.arrow.pyspark.enabled', 'true')
spark.conf.set('spark.sql.execution.arrow.maxRecordsPerBatch', 0)

url = 'jdbc:postgresql://localhost:5432/informacoes_concursos'
properties = {'user': 'postgres', 'password': '123'}

# Conexões com o DataBase

try:
    spark.read.jdbc(url, table="tb_gabarito",
                    properties=properties).createOrReplaceTempView("gabarito")
    spark.read.jdbc(url, table="tb_concurso",
                    properties=properties).createOrReplaceTempView("concurso")
    connection = psycopg2.connect(user='postgres',
                                  password='123',
                                  host='localhost',
                                  port='5432',
                                  database='informacoes_concursos')
    cursor = connection.cursor()
except (Exception, psycopg2.Error) as error:
    print("Erro na conexão com o DB.", error)
    sys.exit(1)

# Filtra e junta tabelas

gabaritos = spark.sql(
    '''SELECT c.id, c.cargo, g.tipo, g.respostas 
    FROM gabarito g 
    INNER JOIN concurso c ON g.concursoid = c.id 
    WHERE homologacao <= CURRENT_DATE - INTERVAL '1 day'
    SORT BY c.id;
    '''
)

# DataFrame com todos os gabaritos cadastrados.

schema = ArrayType(
    StructType([
        StructField("peso", IntegerType(), False),
        StructField("numero", IntegerType(), False),
        StructField("resposta", StringType(), False)
    ])
)

gabaritos = gabaritos.withColumn("respostas", from_json("respostas", schema))
gabaritos = gabaritos.withColumns({'numero': 'respostas.numero', 'peso': 'respostas.peso',
                                  'resposta': 'respostas.resposta'}).drop('respostas').pandas_api()

# Carrega todas os DF como RDD na memória

gabaritos = gabaritos[['id', 'tipo', 'numero', 'resposta', 'peso']].apply(
    lambda x: x.explode()).to_spark()
gabaritos.createGlobalTempView("tabela")

# FAZER 1-3-4-5-6.


def eval(path):
    header, answers = OCR.init(path)
    if (header['situacao_candidato'] or np.count_nonzero(header['tipo']) != 1):
        return {'id': header['numero_candidato'], 'nota': 0}
    ind = header['tipo'].view(bool).argmax() // header['tipo'].itemsize
    ind = ind if header['tipo'][ind] else -1
    tb = spark.sql(
        f"SELECT numero, resposta, peso FROM global_temp.tabela WHERE tipo = '{chr(65+ind)}' and id = {header['numero']} ORDER BY numero").collect()

    def equals(x, y): return chr(65 + np.nonzero(x)[0][0]) == y
    resp = np.array([equals(answers[row], tb[row].resposta) if np.count_nonzero(
        answers[row]) == 1 else False for row in range(len(tb))], dtype='bool')
    nota = 0
    for i in range(len(tb)):
        if (resp[i]):
            nota += tb[i].peso
    return {'id': header['numero_candidato'], 'nota': nota}
    # Iniciar a comparação


upd_query = '''
UPDATE tb_candidato tc SET 
nota=%(nota)s
WHERE id=%(id)s
'''

if __name__ == '__main__':
    for i in range(0, len(files), inst):
        with concurrent.futures.ThreadPoolExecutor(inst) as executor:
            rf = list(executor.map(eval, [f for f in files[i:i+inst]]))
        try:
            cursor.executemany(upd_query, rf)
            connection.commit()
            print('Registro submetido.')
        except:
            # Adicionar ao log.
            pass

cursor.close()
connection.close()
