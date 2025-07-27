import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';

export default async function profileService(data: any): Promise<ResType> {

  let whereUser: any = data.userID_s ? { 
    userID: data.userID_s,
  } : {
    userID: data.userID,
  };

  let selectUser: any = {
    userID: true,
    firstName: true,
    lastName: true,
    phoneNumber: true,
    dateOfBirth: true,
    displayPicUrl: true,
    status: true,
    teacher: {},
    parent: {},
    student: {},
  }

  if (data.userType === "TEACHER") {

     Object.assign(selectUser.teacher, {
      select: {
        teacherID: true,
        indexNumber: true,
        email: true,
        role: true,
        subject: true,
      }
    })
    delete selectUser.student;
    delete selectUser.parent;

  } else if (data.userType === "PARENT") {

    Object.assign(selectUser.parent, {
      select: {
        parentID: true,
        email: true,
        myChildren: {
          select: {
            studentID: true,
            grade: true,
            class: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                userID: true,
              }
            }
          }
        }
      }
    })
    delete selectUser.student;
    delete selectUser.teacher;

  } else if (data.userType === "STUDENT") {

    Object.assign(selectUser.student, {
      select: {
        studentID: true,
        indexNumber: true,
        email: true,
        grade: true,
        class: true,
        parent: {
          select: {
            parentID: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                userID: true,
              }
            }
          }
        }
      }
    })
    delete selectUser.parent;
    delete selectUser.teacher;

  }
  
  const user = await prisma.user.findUnique({
    where: whereUser,
    select: selectUser,
  });

  return { status: true, resDataType: "success", data: user };

}
