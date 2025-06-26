/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `folder` on the `UploadSession` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_createdBy_fkey";

-- DropIndex
DROP INDEX "UploadSession_folder_key";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "createdBy";

-- AlterTable
ALTER TABLE "UploadSession" DROP COLUMN "folder";
