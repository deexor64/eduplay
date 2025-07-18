/*
  Warnings:

  - Added the required column `data` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summery` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Progress" ADD COLUMN     "baseScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "data" JSONB NOT NULL,
ADD COLUMN     "maxScore" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "summery" TEXT NOT NULL,
ADD COLUMN     "timeTaken" INTEGER DEFAULT 0;
