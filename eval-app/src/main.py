import json
import os
import importlib
import argparse
import logging
import sys
import time
from pyspark.sql import SparkSession


def _parse_argv():
    parser = argparse.ArgumentParser()
    parser.add_argument("--inst", required=True, type=int)
    return parser.parse_args()


def main():
    os.environ['PYSPARK_PYTHON'] = sys.executable
    os.environ['PYSPARK_DRIVER_PYTHON'] = sys.executable
    os.environ["PYARROW_IGNORE_TIMEZONE"] = "1"

    args = _parse_argv()
    try:
        with open(f'{sys.path[0]}\config.json',  'r') as config_file:
            config = json.load(config_file)
    except:
        raise
    logging.basicConfig(filename='spark_session.log', level=logging.INFO)
    spark = SparkSession.builder.config(
        'spark.driver.extraClassPath', config['path']['spark.driver.extraClassPath']) \
        .config("spark.jars.packages", "io.delta:delta-core_2.12:2.1.0") \
        .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension") \
        .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog") \
        .appName(config.get('app_name')) \
        .getOrCreate()
    spark.conf.set('spark.sql.execution.arrow.pyspark.enabled', 'true')
    spark.conf.set('spark.sql.execution.arrow.maxRecordsPerBatch', 0)
    logging.info("Starting Spark job...")
    job = importlib.import_module('jobs.job')
    job.run_job(spark, config, args.inst)
    logging.info("Finished Spark job.")
    spark.stop()
    logging.shutdown()


if __name__ == "__main__":
    main()
