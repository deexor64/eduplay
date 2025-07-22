/*
  Warnings:

  - You are about to drop the column `isGraded` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `timeLimit` on the `Activity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "isGraded",
DROP COLUMN "timeLimit",
ADD COLUMN     "isScored" BOOLEAN NOT NULL DEFAULT false;
