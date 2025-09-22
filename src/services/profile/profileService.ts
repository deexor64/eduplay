import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';
import { UserType } from '@prisma/client';

export default async function profileService(data: any): Promise<ResType> {

  let whereUser: any = data.userID ? { 
    userID: data.userID,
  } : {
    userID: data.userPermissions.uid,
  };

  let selectUser: any = {
    userID: true,
    firstName: true,
    lastName: true,
    email: true,
    displayPicUrl: true,
    status: true,
    teacher: {},
    student: {},
  }

  if (data.userPermissions.userType === "TEACHER") {

     Object.assign(selectUser.teacher, {
      select: {
        teacherID: true,
        indexNumber: true,
        role: true,
      }
    })
    delete selectUser.student;

  } else if (data.userPermissions.userType === "STUDENT") {

    Object.assign(selectUser.student, {
      select: {
        studentID: true,
        indexNumber: true,
        grade: true,
      }
    })
    delete selectUser.teacher;

  }
  
  const user = await prisma.user.findUnique({
    where: whereUser,
    select: selectUser,
  });
  
  let userWithNotifications: any = {};
  
  // Notifications for teacher are sent with profile info
  if (data.userPermissions.userType === "TEACHER" && user && user?.teacher) {
    
    const teacherID = (user.teacher as { teacherID: string }).teacherID;
    
    const notifications = await prisma.notification.findMany({
      where: {
        OR: [
          { forTeacher: teacherID },
          { group: UserType.TEACHER }, 
        ],
      },
      select: {
        notificationID: true,
        title: true,
        message: true,
        type: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    
    userWithNotifications = {
      ...user,
      notifications: notifications,
    }
    
  }

  return { status: true, resDataType: "success", 
    data: data.userPermissions.userType === "TEACHER" ? userWithNotifications : user };

}
