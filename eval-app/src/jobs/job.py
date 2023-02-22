from pyspark.sql import SparkSession, Row
from pyspark.sql.types import *
from pyspark.sql.functions import *
from itertools import repeat
import re
from ocr import OCR
import logging
import psycopg2
import concurrent.futures
import numpy as np
import os


def _read_answers(config):
    files = [config['path']['source_data_path'] +
             file for file in os.listdir(config['path']['source_data_path'])]
    if (not files):
        raise FileNotFoundError(
            'Nenhuma imagem encontrada no caminho especificado.')
    return files

# Conexões com o DataBase


def connect_input(spark, config):
    config = config['connection']['input']['properties']
    try:
        spark.read.jdbc(
            url=config['server']['url'], table=config['server']['tables'][0], properties=config['auth']).createOrReplaceTempView("gabarito"),
        spark.read.jdbc(
            url=config['server']['url'], table=config['server']['tables'][1], properties=config['auth']).createOrReplaceTempView("concurso")
    except:
        raise


def connect_output(config):
    server = config['connection']['output']['properties']['server']
    auth = config['connection']['output']['properties']['auth']
    try:
        connection = psycopg2.connect(
            user=auth['user'],
            password=auth['password'],
            host=server['host'],
            port=server['port'],
            database=server['database'])
    except:
        raise
    return connection


# DataFrame com todos os gabaritos cadastrados.


def _create_global_tb(spark):
    global gabaritos
    gabaritos = spark.sql(
        '''SELECT c.id, c.cargo, g.tipo, g.respostas 
        FROM gabarito g 
        INNER JOIN concurso c ON g.concursoid = c.id 
        WHERE homologacao <= CURRENT_DATE - INTERVAL '1 day'
        SORT BY c.id;
        '''
    )

    schema = ArrayType(
        StructType([
            StructField("peso", IntegerType(), False),
            StructField("numero", IntegerType(), False),
            StructField("resposta", StringType(), False)
        ])
    )

    gabaritos = gabaritos.withColumn(
        "respostas", from_json("respostas", schema))
    gabaritos = gabaritos.withColumns({'numero': 'respostas.numero', 'peso': 'respostas.peso',
                                       'resposta': 'respostas.resposta'}).drop('respostas').pandas_api()

    # Carrega todas os DF como RDD na memória

    gabaritos = gabaritos[['id', 'tipo', 'numero', 'resposta', 'peso']].apply(
        lambda x: x.explode()).to_spark()
    gabaritos.createGlobalTempView("tabela")


# Atribui nota


def eval(spark, path):
    
    header, answers = OCR.init(path)
    try:
        if (header['situacao_candidato'] or np.count_nonzero(header['tipo']) != 1):
            raise
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
    except:
        return {'id': header['numero_candidato'], 'nota': -1}


def append_error():
    pass


def run_job(spark, config, inst):
    logging.basicConfig(filename='ocr.log', format='(%(asctime)s) %(levelname)s:%(message)s', datefmt='%d/%m/%Y %I:%M:%S %p', level=logging.ERROR)
    upd_query = '''UPDATE tb_candidato tc SET nota=%(nota)s WHERE id=%(id)s'''
    files = _read_answers(config)
    connect_input(spark, config)
    connection = connect_output(config)
    cursor = connection.cursor()
    _create_global_tb(spark)
    for i in range(0, len(files), inst):
        with concurrent.futures.ThreadPoolExecutor(inst) as executor:
            rf = list(zip(list(executor.map(eval, repeat(spark),
                      [f for f in files[i:i+inst]])), [re.search(r'[^\\]*$', f).group(0) for f in files[i:i+inst]]))
            for i, x in enumerate(rf):
                if (x[0]['nota'] == -1):
                    logging.error(f"FAILED TO SCAN INSTANCE {x[1]}! Attribuition skipped.")
                    rf.remove(x)
                else:
                    rf[i] = x[0]
        try:
            cursor.executemany(upd_query, rf)
            connection.commit()
        except:
            raise
    cursor.close()
    connection.close()
