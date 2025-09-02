/*
  Warnings:

  - Made the column `difficulty` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `grade` on table `Activity` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "difficulty" SET NOT NULL,
ALTER COLUMN "difficulty" SET DEFAULT 'EASY',
ALTER COLUMN "grade" SET NOT NULL,
ALTER COLUMN "grade" SET DEFAULT 1;
