/*
  Warnings:

  - The values [DELETED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[profileUrl]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileUrl]` on the table `Parent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileUrl]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileUrl]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileUrl` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileUrl` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileUrl` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileUrl` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE', 'SUSPENDED');
ALTER TABLE "User" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "User" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "displayPic" TEXT NOT NULL DEFAULT 'images/avatar',
ADD COLUMN     "profileUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Parent" ADD COLUMN     "displayPic" TEXT NOT NULL DEFAULT 'images/avatar',
ADD COLUMN     "profileUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "displayPic" TEXT NOT NULL DEFAULT 'images/avatar',
ADD COLUMN     "profileUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "displayPic" TEXT NOT NULL DEFAULT 'images/avatar',
ADD COLUMN     "profileUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_profileUrl_key" ON "Admin"("profileUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_profileUrl_key" ON "Parent"("profileUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Student_profileUrl_key" ON "Student"("profileUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_profileUrl_key" ON "Teacher"("profileUrl");
