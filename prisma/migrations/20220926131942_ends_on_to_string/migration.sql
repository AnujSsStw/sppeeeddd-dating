/*
  Warnings:

  - Made the column `endsON` on table `Match` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "endsON" SET NOT NULL,
ALTER COLUMN "endsON" DROP DEFAULT,
ALTER COLUMN "endsON" SET DATA TYPE TEXT;
