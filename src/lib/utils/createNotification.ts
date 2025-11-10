import { prisma } from "@/lib/prisma";
import { NotificationType, UserType } from "@prisma/client";

interface CreateNotificationParams {
  title: string;
  message: string;
  type: NotificationType;
  teacherID?: string;
  studentID?: string;
  group?: UserType;
}

export async function createNotification(params: CreateNotificationParams) {
  
  const { title, message, type, teacherID, studentID, group } = params;

  // Ensure exactly one target is present
  const targets = [teacherID, studentID, group].filter(Boolean);
  if (targets.length !== 1) {
    throw new Error(
      "Notification must have exactly one target: teacherID, studentID, or group"
    );
  }

  // Create new notification
  const notification = await prisma.notification.create({
    data: {
      title,
      message,
      type,
      forTeacher: teacherID ?? null,
      forStudent: studentID ?? null,
      group: group ?? null,
    },
  });

  // Delete older notifications if count exceeds 25
  if (teacherID) {
    const oldNotifications = await prisma.notification.findMany({
      where: { forTeacher: teacherID },
      orderBy: { createdAt: 'desc' },
      skip: 25, // skip the latest 25
    });

    if (oldNotifications.length > 0) {
      await prisma.notification.deleteMany({
        where: { notificationID: { in: oldNotifications.map(n => n.notificationID) } },
      });
    }
  } else if (studentID) {
    const oldNotifications = await prisma.notification.findMany({
      where: { forStudent: studentID },
      orderBy: { createdAt: 'desc' },
      skip: 25,
    });

    if (oldNotifications.length > 0) {
      await prisma.notification.deleteMany({
        where: { notificationID: { in: oldNotifications.map(n => n.notificationID) } },
      });
    }
  } else if (group) {
    const oldNotifications = await prisma.notification.findMany({
      where: { group: group },
      orderBy: { createdAt: 'desc' },
      skip: 25,
    });

    if (oldNotifications.length > 0) {
      await prisma.notification.deleteMany({
        where: { notificationID: { in: oldNotifications.map(n => n.notificationID) } },
      });
    }
  }

  return notification;
}
