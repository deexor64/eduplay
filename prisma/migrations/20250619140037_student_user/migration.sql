/*
  Warnings:

  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[indexNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `indexNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_userID_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "indexNumber" INTEGER NOT NULL,
ADD COLUMN     "userType" TEXT NOT NULL;

-- DropTable
DROP TABLE "Teacher";

-- CreateTable
CREATE TABLE "Student" (
    "studentID" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(20) NOT NULL,
    "password" TEXT NOT NULL,
    "indexNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("studentID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_indexNumber_key" ON "Student"("indexNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_indexNumber_key" ON "User"("indexNumber");
