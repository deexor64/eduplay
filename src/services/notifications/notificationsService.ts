import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';
import { UserType } from '@prisma/client';

export default async function notificationsService(data: any): Promise<ResType> {

  const student = await prisma.student.findUnique({
    where: { userID: data.userPermissions.uid },
    select: { studentID: true },
  });

  if (!student) return { status: false, resDataType: "log", data: "Student not found" };

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
    },
    orderBy: { createdAt: 'desc' },
  });

  return { status: true, resDataType: "success", data: { notifications: notifications } };
  
} 
