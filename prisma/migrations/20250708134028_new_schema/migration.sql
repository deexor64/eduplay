-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE', 'SUSPENDED', 'DELETED');

-- CreateEnum
CREATE TYPE "TeacherRole" AS ENUM ('MASTER', 'ADMIN', 'TEACHER');

-- CreateEnum
CREATE TYPE "StudentRole" AS ENUM ('DEMONSTRATOR', 'STUDENT');

-- CreateTable
CREATE TABLE "User" (
    "userID" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "displayPicUrl" TEXT NOT NULL DEFAULT '/images/avatar.png',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "teacherID" TEXT NOT NULL,
    "indexNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "TeacherRole" NOT NULL DEFAULT 'TEACHER',
    "userID" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("teacherID")
);

-- CreateTable
CREATE TABLE "Student" (
    "studentID" TEXT NOT NULL,
    "indexNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "StudentRole" NOT NULL DEFAULT 'STUDENT',
    "grade" INTEGER NOT NULL,
    "class" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "myParent" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("studentID")
);

-- CreateTable
CREATE TABLE "Parent" (
    "parentID" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("parentID")
);

-- CreateTable
CREATE TABLE "Activity" (
    "activityID" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "coverImageUrl" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "activityData" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isGraded" BOOLEAN NOT NULL DEFAULT false,
    "timeLimit" INTEGER NOT NULL DEFAULT 0,
    "grade" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL,
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
    "progressFor" TEXT NOT NULL,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("progressID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_indexNumber_key" ON "Teacher"("indexNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_userID_key" ON "Teacher"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Student_indexNumber_key" ON "Student"("indexNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userID_key" ON "Student"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Student_myParent_key" ON "Student"("myParent");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_email_key" ON "Parent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_userID_key" ON "Parent"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Template_templateCode_key" ON "Template"("templateCode");

-- CreateIndex
CREATE UNIQUE INDEX "Template_title_key" ON "Template"("title");

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_myParent_fkey" FOREIGN KEY ("myParent") REFERENCES "Parent"("parentID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_templateCode_fkey" FOREIGN KEY ("templateCode") REFERENCES "Template"("templateCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Teacher"("teacherID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_progressFor_fkey" FOREIGN KEY ("progressFor") REFERENCES "Student"("studentID") ON DELETE RESTRICT ON UPDATE CASCADE;
