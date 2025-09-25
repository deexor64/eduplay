import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';
import { UserType } from '@prisma/client';

export default async function notificationsService(data: any):
Promise<{ status: boolean, data: any }> {

  const student = await prisma.student.findUnique({
    where: { userID: data.userPermissions.uid },
    select: { studentID: true },
  });

  if (!student) return { status: false, data: "Student not found" };

  const where = {
    OR: [
      { forStudent: student.studentID },
      { group: UserType.STUDENT },
    ],
  };

  const notifications = await prisma.notification.findMany({
    where: where,
    select: {
      notificationID: true,
      title: true,
      message: true,
      type: true,
      createdAt: true,
      reads: {
        where: { userID: data.userPermissions.uid },
        select: { notificationReadID: true },
      }
    },
    orderBy: { createdAt: 'desc' },
  });

  const formattedNotifications = notifications.map(notification => ({
    notificationID: notification.notificationID,
    title: notification.title,
    message: notification.message,
    type: notification.type,
    createdAt: notification.createdAt,
    isRead: (notification.reads?.length ?? 0) > 0,
  }));

  return { status: true, data: { notifications: formattedNotifications } };
  
} 
