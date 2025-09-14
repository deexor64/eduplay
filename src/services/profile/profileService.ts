import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';

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

  return { status: true, resDataType: "success", data: user };

}
