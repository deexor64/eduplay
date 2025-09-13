-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('TEACHER', 'STUDENT');

-- CreateEnum
CREATE TYPE "Subject" AS ENUM ('COMMON', 'MATHEMATICS', 'SCIENCE', 'ENGLISH');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'DELETED');

-- CreateEnum
CREATE TYPE "TeacherRole" AS ENUM ('ADMIN', 'TEACHER', 'DEMONSTRATOR');

-- CreateEnum
CREATE TYPE "ActivityDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "ActivityStatus" AS ENUM ('UNPUBLISHED', 'PUBLISHED', 'DELETED');

-- CreateTable
CREATE TABLE "User" (
    "userID" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "displayPicUrl" TEXT NOT NULL DEFAULT '/images/avatar.png',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "teacherID" TEXT NOT NULL,
    "indexNumber" TEXT NOT NULL,
    "role" "TeacherRole" NOT NULL DEFAULT 'TEACHER',
    "userID" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("teacherID")
);

-- CreateTable
CREATE TABLE "Student" (
    "studentID" TEXT NOT NULL,
    "indexNumber" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("studentID")
);

-- CreateTable
CREATE TABLE "Activity" (
    "activityID" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "activityData" JSONB NOT NULL,
    "status" "ActivityStatus" NOT NULL DEFAULT 'UNPUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isScored" BOOLEAN NOT NULL DEFAULT false,
    "difficulty" "ActivityDifficulty" NOT NULL DEFAULT 'EASY',
    "grade" INTEGER NOT NULL DEFAULT 1,
    "subject" "Subject" NOT NULL DEFAULT 'COMMON',
    "templateCode" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("activityID")
);

-- CreateTable
CREATE TABLE "Template" (
    "templateID" TEXT NOT NULL,
    "templateCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "templateType" TEXT NOT NULL,
    "sampleActivity" JSONB NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("templateID")
);

-- CreateTable
CREATE TABLE "Progress" (
    "progressID" TEXT NOT NULL,
    "baseScore" INTEGER NOT NULL DEFAULT 0,
    "maxScore" INTEGER NOT NULL DEFAULT 100,
    "summery" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progressFor" TEXT NOT NULL,
    "progressOf" TEXT NOT NULL,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("progressID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_indexNumber_key" ON "Teacher"("indexNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_userID_key" ON "Teacher"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Student_indexNumber_key" ON "Student"("indexNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userID_key" ON "Student"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Template_templateCode_key" ON "Template"("templateCode");

-- CreateIndex
CREATE UNIQUE INDEX "Template_title_key" ON "Template"("title");

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_templateCode_fkey" FOREIGN KEY ("templateCode") REFERENCES "Template"("templateCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Teacher"("teacherID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_progressFor_fkey" FOREIGN KEY ("progressFor") REFERENCES "Student"("studentID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_progressOf_fkey" FOREIGN KEY ("progressOf") REFERENCES "Activity"("activityID") ON DELETE RESTRICT ON UPDATE CASCADE;
