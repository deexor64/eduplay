/*
  Warnings:

  - You are about to drop the column `displayPicUrl` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `displayPicUrl` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `displayPicUrl` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `displayPicUrl` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the `templates` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "displayPicUrl";

-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "displayPicUrl";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "displayPicUrl";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "displayPicUrl";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "displayPicUrl" TEXT NOT NULL DEFAULT '/images/avatar.png';

-- DropTable
DROP TABLE "templates";

-- CreateTable
CREATE TABLE "Templates" (
    "templateID" TEXT NOT NULL,
    "templateCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "templateType" TEXT NOT NULL,

    CONSTRAINT "Templates_pkey" PRIMARY KEY ("templateID")
);
