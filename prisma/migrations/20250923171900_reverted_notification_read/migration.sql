/*
  Warnings:

  - You are about to drop the `NotificationRead` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NotificationRead" DROP CONSTRAINT "NotificationRead_notificationID_fkey";

-- DropForeignKey
ALTER TABLE "NotificationRead" DROP CONSTRAINT "NotificationRead_userID_fkey";

-- DropTable
DROP TABLE "NotificationRead";
