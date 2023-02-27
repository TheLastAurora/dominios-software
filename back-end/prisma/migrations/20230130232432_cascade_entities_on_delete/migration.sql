-- DropForeignKey
ALTER TABLE "tb_candidato_concurso" DROP CONSTRAINT "tb_candidato_concurso_candidatoId_fkey";

-- DropForeignKey
ALTER TABLE "tb_candidato_concurso" DROP CONSTRAINT "tb_candidato_concurso_concursoId_fkey";

-- DropForeignKey
ALTER TABLE "tb_gabarito" DROP CONSTRAINT "tb_gabarito_concursoId_fkey";

-- DropForeignKey
ALTER TABLE "tb_phone_number" DROP CONSTRAINT "tb_phone_number_candidatoId_fkey";

-- AddForeignKey
ALTER TABLE "tb_candidato_concurso" ADD CONSTRAINT "tb_candidato_concurso_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "tb_candidato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_candidato_concurso" ADD CONSTRAINT "tb_candidato_concurso_concursoId_fkey" FOREIGN KEY ("concursoId") REFERENCES "tb_concurso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_phone_number" ADD CONSTRAINT "tb_phone_number_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "tb_candidato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_gabarito" ADD CONSTRAINT "tb_gabarito_concursoId_fkey" FOREIGN KEY ("concursoId") REFERENCES "tb_concurso"("id") ON DELETE CASCADE ON UPDATE CASCADE;
