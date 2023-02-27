/*
  Warnings:

  - Made the column `tipo` on table `tb_gabaritos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tb_gabaritos" ALTER COLUMN "tipo" SET NOT NULL;
