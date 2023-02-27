/*
  Warnings:

  - You are about to drop the `tb_address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_candidato` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_candidato_concurso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_concurso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_gabarito` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_phone_number` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('Masculino', 'Feminino');

-- CreateEnum
CREATE TYPE "Uf" AS ENUM ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO');

-- DropForeignKey
ALTER TABLE "tb_candidato" DROP CONSTRAINT "tb_candidato_addressId_fkey";

-- DropForeignKey
ALTER TABLE "tb_candidato_concurso" DROP CONSTRAINT "tb_candidato_concurso_candidatoId_fkey";

-- DropForeignKey
ALTER TABLE "tb_candidato_concurso" DROP CONSTRAINT "tb_candidato_concurso_concursoId_fkey";

-- DropForeignKey
ALTER TABLE "tb_gabarito" DROP CONSTRAINT "tb_gabarito_authorId_fkey";

-- DropForeignKey
ALTER TABLE "tb_gabarito" DROP CONSTRAINT "tb_gabarito_concursoId_fkey";

-- DropForeignKey
ALTER TABLE "tb_phone_number" DROP CONSTRAINT "tb_phone_number_candidatoId_fkey";

-- DropTable
DROP TABLE "tb_address";

-- DropTable
DROP TABLE "tb_candidato";

-- DropTable
DROP TABLE "tb_candidato_concurso";

-- DropTable
DROP TABLE "tb_concurso";

-- DropTable
DROP TABLE "tb_gabarito";

-- DropTable
DROP TABLE "tb_phone_number";

-- DropTable
DROP TABLE "tb_user";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "UFs";

-- CreateTable
CREATE TABLE "Candidato" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "genero" "Genero" NOT NULL,
    "nome_mae" TEXT NOT NULL,
    "nome_pai" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "rg" TEXT NOT NULL,
    "data_expedicao" TIMESTAMP(3) NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "cod_municipio" TEXT NOT NULL,
    "uf" "Uf" NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "concursoID" INTEGER NOT NULL,
    "nota" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candidato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Concurso" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "vagas_ac" INTEGER NOT NULL,
    "vagas_pd" INTEGER NOT NULL,
    "homologacao" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Concurso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gabarito" (
    "id" SERIAL NOT NULL,
    "concursoId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "tipo" CHAR(1) NOT NULL,
    "respostas" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gabarito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidato_nome_key" ON "Candidato"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Candidato_cpf_key" ON "Candidato"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Candidato_rg_key" ON "Candidato"("rg");

-- AddForeignKey
ALTER TABLE "Candidato" ADD CONSTRAINT "Candidato_concursoID_fkey" FOREIGN KEY ("concursoID") REFERENCES "Concurso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gabarito" ADD CONSTRAINT "Gabarito_concursoId_fkey" FOREIGN KEY ("concursoId") REFERENCES "Concurso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gabarito" ADD CONSTRAINT "Gabarito_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
