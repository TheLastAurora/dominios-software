/*
  Warnings:

  - You are about to drop the `tb_candidatos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_concursos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_gabaritos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tb_candidatos" DROP CONSTRAINT "tb_candidatos_concursoID_fkey";

-- DropForeignKey
ALTER TABLE "tb_gabaritos" DROP CONSTRAINT "tb_gabaritos_concursoId_fkey";

-- DropForeignKey
ALTER TABLE "tb_gabaritos" DROP CONSTRAINT "tb_gabaritos_userId_fkey";

-- DropTable
DROP TABLE "tb_candidatos";

-- DropTable
DROP TABLE "tb_concursos";

-- DropTable
DROP TABLE "tb_gabaritos";

-- DropTable
DROP TABLE "tb_users";

-- CreateTable
CREATE TABLE "tb_candidato" (
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
    "nota" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_candidato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_concurso" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "vagas_ac" INTEGER NOT NULL,
    "vagas_pd" INTEGER NOT NULL,
    "homologacao" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_concurso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_gabarito" (
    "id" SERIAL NOT NULL,
    "concursoId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "tipo" CHAR(1) NOT NULL,
    "respostas" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_gabarito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_user" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_candidato_cpf_key" ON "tb_candidato"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "tb_candidato_rg_key" ON "tb_candidato"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_login_key" ON "tb_user"("login");

-- AddForeignKey
ALTER TABLE "tb_candidato" ADD CONSTRAINT "tb_candidato_concursoID_fkey" FOREIGN KEY ("concursoID") REFERENCES "tb_concurso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_gabarito" ADD CONSTRAINT "tb_gabarito_concursoId_fkey" FOREIGN KEY ("concursoId") REFERENCES "tb_concurso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_gabarito" ADD CONSTRAINT "tb_gabarito_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
