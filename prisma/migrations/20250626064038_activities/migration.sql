/*
  Warnings:

  - You are about to drop the `Lesson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Templates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_createdBy_fkey";

-- DropTable
DROP TABLE "Lesson";

-- DropTable
DROP TABLE "Templates";

-- CreateTable
CREATE TABLE "Activity" (
    "activityID" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "coverImageUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "activityData" JSONB NOT NULL,
    "isGraded" BOOLEAN NOT NULL DEFAULT false,
    "timeLimit" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
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
    "sampleLesson" JSONB NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("templateID")
);

-- CreateTable
CREATE TABLE "UploadSession" (
    "sessionID" TEXT NOT NULL,
    "folder" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "UploadSession_pkey" PRIMARY KEY ("sessionID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Template_templateCode_key" ON "Template"("templateCode");

-- CreateIndex
CREATE UNIQUE INDEX "Template_title_key" ON "Template"("title");

-- CreateIndex
CREATE UNIQUE INDEX "UploadSession_folder_key" ON "UploadSession"("folder");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_templateCode_fkey" FOREIGN KEY ("templateCode") REFERENCES "Template"("templateCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Teacher"("teacherID") ON DELETE RESTRICT ON UPDATE CASCADE;
