-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE', 'SUSPENDED', 'DELETED');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "classID" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "Class" (
    "classID" TEXT NOT NULL,
    "name" TEXT,
    "grade" INTEGER NOT NULL,
    "classLetter" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "managedBy" TEXT NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("classID")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "lessonID" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "coverImage" TEXT,
    "description" TEXT,
    "activityData" JSONB,
    "options" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("lessonID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Class_managedBy_key" ON "Class"("managedBy");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("classID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_managedBy_fkey" FOREIGN KEY ("managedBy") REFERENCES "Teacher"("teacherID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Teacher"("teacherID") ON DELETE RESTRICT ON UPDATE CASCADE;
