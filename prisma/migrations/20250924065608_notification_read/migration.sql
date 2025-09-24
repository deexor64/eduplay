-- CreateTable
CREATE TABLE "NotificationRead" (
    "notificationReadID" TEXT NOT NULL,
    "notificationID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "readAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationRead_pkey" PRIMARY KEY ("notificationReadID")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotificationRead_notificationID_userID_key" ON "NotificationRead"("notificationID", "userID");

-- AddForeignKey
ALTER TABLE "NotificationRead" ADD CONSTRAINT "NotificationRead_notificationID_fkey" FOREIGN KEY ("notificationID") REFERENCES "Notification"("notificationID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationRead" ADD CONSTRAINT "NotificationRead_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
