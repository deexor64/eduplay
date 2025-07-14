/*
  Warnings:

  - The `difficulty` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Subject" AS ENUM ('MATHEMATICS', 'SCIENCE', 'ENGLISH', 'COMMON');

-- CreateEnum
CREATE TYPE "ActivityDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "ActivityStatus" AS ENUM ('UNPUBLISHED', 'PUBLISHED', 'DELETED');

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "status" "ActivityStatus" NOT NULL DEFAULT 'UNPUBLISHED',
ADD COLUMN     "subject" "Subject" NOT NULL DEFAULT 'COMMON',
DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "ActivityDifficulty" NOT NULL DEFAULT 'EASY';

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "subject" "Subject" NOT NULL DEFAULT 'COMMON';
