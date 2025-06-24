/*
  Warnings:

  - You are about to drop the column `displayPic` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `profileUrl` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `coverImage` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `displayPic` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `profileUrl` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `displayPic` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `profileUrl` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `displayPic` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `profileUrl` on the `Teacher` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[grade,classLetter]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - Made the column `classLetter` on table `Class` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Admin_profileUrl_key";

-- DropIndex
DROP INDEX "Parent_profileUrl_key";

-- DropIndex
DROP INDEX "Student_profileUrl_key";

-- DropIndex
DROP INDEX "Teacher_profileUrl_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "displayPic",
DROP COLUMN "profileUrl",
ADD COLUMN     "displayPicUrl" TEXT NOT NULL DEFAULT '/images/avatar.png';

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "classLetter" SET NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "coverImage",
ADD COLUMN     "coverImageUrl" TEXT;

-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "displayPic",
DROP COLUMN "profileUrl",
ADD COLUMN     "displayPicUrl" TEXT NOT NULL DEFAULT '/images/avatar.png';

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "displayPic",
DROP COLUMN "profileUrl",
ADD COLUMN     "displayPicUrl" TEXT NOT NULL DEFAULT '/images/avatar.png';

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "displayPic",
DROP COLUMN "profileUrl",
ADD COLUMN     "displayPicUrl" TEXT NOT NULL DEFAULT '/images/avatar.png';

-- CreateTable
CREATE TABLE "templates" (
    "templateID" TEXT NOT NULL,
    "templateCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "templateType" TEXT NOT NULL,

    CONSTRAINT "templates_pkey" PRIMARY KEY ("templateID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Class_grade_classLetter_key" ON "Class"("grade", "classLetter");
