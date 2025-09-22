-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('INFO', 'SUCCESS', 'WARNING', 'ERROR');

-- CreateTable
CREATE TABLE "Notification" (
    "notificationID" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "group" "UserType",
    "forStudent" TEXT,
    "forTeacher" TEXT,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notificationID")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_forStudent_fkey" FOREIGN KEY ("forStudent") REFERENCES "Student"("studentID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_forTeacher_fkey" FOREIGN KEY ("forTeacher") REFERENCES "Teacher"("teacherID") ON DELETE SET NULL ON UPDATE CASCADE;
