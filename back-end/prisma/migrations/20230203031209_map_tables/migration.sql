/*
  Warnings:

  - You are about to drop the `Candidato` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Concurso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Gabarito` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Candidato" DROP CONSTRAINT "Candidato_concursoID_fkey";

-- DropForeignKey
ALTER TABLE "Gabarito" DROP CONSTRAINT "Gabarito_concursoId_fkey";

-- DropForeignKey
ALTER TABLE "Gabarito" DROP CONSTRAINT "Gabarito_userId_fkey";

-- DropTable
DROP TABLE "Candidato";

-- DropTable
DROP TABLE "Concurso";

-- DropTable
DROP TABLE "Gabarito";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "tb_candidatos" (
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

    CONSTRAINT "tb_candidatos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_concursos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "vagas_ac" INTEGER NOT NULL,
    "vagas_pd" INTEGER NOT NULL,
    "homologacao" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_concursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_gabaritos" (
    "id" SERIAL NOT NULL,
    "concursoId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "tipo" CHAR(1),
    "respostas" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_gabaritos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_users" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_candidatos_nome_key" ON "tb_candidatos"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "tb_candidatos_cpf_key" ON "tb_candidatos"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "tb_candidatos_rg_key" ON "tb_candidatos"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_login_key" ON "tb_users"("login");

-- AddForeignKey
ALTER TABLE "tb_candidatos" ADD CONSTRAINT "tb_candidatos_concursoID_fkey" FOREIGN KEY ("concursoID") REFERENCES "tb_concursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_gabaritos" ADD CONSTRAINT "tb_gabaritos_concursoId_fkey" FOREIGN KEY ("concursoId") REFERENCES "tb_concursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_gabaritos" ADD CONSTRAINT "tb_gabaritos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
