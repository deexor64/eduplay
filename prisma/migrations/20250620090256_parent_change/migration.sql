/*
  Warnings:

  - You are about to drop the column `indexNumber` on the `Parent` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Parent_indexNumber_key";

-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "indexNumber";

-- DropEnum
DROP TYPE "UserType";
