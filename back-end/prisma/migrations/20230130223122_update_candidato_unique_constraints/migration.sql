/*
  Warnings:

  - A unique constraint covering the columns `[taxId]` on the table `tb_candidato` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[documentId]` on the table `tb_candidato` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `tb_candidato` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tb_candidato_taxId_key" ON "tb_candidato"("taxId");

-- CreateIndex
CREATE UNIQUE INDEX "tb_candidato_documentId_key" ON "tb_candidato"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "tb_candidato_email_key" ON "tb_candidato"("email");
