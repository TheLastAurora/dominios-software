-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F', 'PND');

-- CreateEnum
CREATE TYPE "UFs" AS ENUM ('AM', 'AL', 'AC', 'AP', 'BA', 'PA', 'MT', 'MG', 'MS', 'GO', 'MA', 'RS', 'TO', 'PI', 'SP', 'RO', 'RR', 'PR', 'CE', 'PE', 'SC', 'PB', 'RN', 'ES', 'RJ', 'SE', 'DF');

-- CreateTable
CREATE TABLE "tb_user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "login" VARCHAR(20) NOT NULL,
    "password" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_concurso" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "vacancies" INTEGER NOT NULL,
    "concludedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_concurso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_candidato_concurso" (
    "id" SERIAL NOT NULL,
    "candidatoId" INTEGER NOT NULL,
    "concursoId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "type" CHAR(1) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_candidato_concurso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_candidato" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "socialName" VARCHAR(120) NOT NULL,
    "taxId" VARCHAR(15) NOT NULL,
    "documentId" VARCHAR(8) NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "mothersName" VARCHAR(120) NOT NULL,
    "fathersName" VARCHAR(120) NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "birthPlace" VARCHAR(30) NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "addressId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_candidato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_phone_number" (
    "id" SERIAL NOT NULL,
    "candidatoId" INTEGER NOT NULL,
    "telephone" VARCHAR(15) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_phone_number_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_address" (
    "id" SERIAL NOT NULL,
    "cep" VARCHAR(12) NOT NULL,
    "uf" "UFs" NOT NULL,
    "city" VARCHAR(40) NOT NULL,
    "neighborhood" VARCHAR(40) NOT NULL,
    "street" VARCHAR(40) NOT NULL,
    "number" VARCHAR(5) NOT NULL,
    "complement" VARCHAR(60) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_gabarito" (
    "id" SERIAL NOT NULL,
    "concursoId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "type" CHAR(1) NOT NULL,
    "answers" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_gabarito_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_login_key" ON "tb_user"("login");

-- CreateIndex
CREATE UNIQUE INDEX "tb_candidato_addressId_key" ON "tb_candidato"("addressId");

-- AddForeignKey
ALTER TABLE "tb_candidato_concurso" ADD CONSTRAINT "tb_candidato_concurso_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "tb_candidato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_candidato_concurso" ADD CONSTRAINT "tb_candidato_concurso_concursoId_fkey" FOREIGN KEY ("concursoId") REFERENCES "tb_concurso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_candidato" ADD CONSTRAINT "tb_candidato_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "tb_address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_phone_number" ADD CONSTRAINT "tb_phone_number_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "tb_candidato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_gabarito" ADD CONSTRAINT "tb_gabarito_concursoId_fkey" FOREIGN KEY ("concursoId") REFERENCES "tb_concurso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_gabarito" ADD CONSTRAINT "tb_gabarito_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
