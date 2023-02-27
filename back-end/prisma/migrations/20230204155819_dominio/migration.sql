-- AlterEnum
ALTER TYPE "Uf" ADD VALUE 'SN';

-- AlterTable
ALTER TABLE "tb_candidatos" ALTER COLUMN "nota" DROP NOT NULL;
