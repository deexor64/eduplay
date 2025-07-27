import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';

const userListHandler: any = {
  teacher: prisma.teacher,
  parent: prisma.parent,
  student: prisma.student,
} as const;

export default async function usersService(data: any): Promise<ResType> {
  
  let whereUsers: any = {
    indexNumber: data.indexNumber,
    grade: data.grade,
    class: data.class,
    email: data.email ? { contains: data.email, mode: 'insensitive' } : undefined,
    role: data.role,
    user: {
      firstName: (data.fullName ? { contains: data.fullName.split(" ")[0], mode: 'insensitive' } : undefined),
      lastName: (data.fullName ? { contains: data.fullName.split(" ")[1], mode: 'insensitive' } : undefined),
      status: data.status,
    }
  };

  if (data.userListType === "parent") {
    // indexNumber, grade, class: Parent don't have indexNumber, grade, class and role
    delete whereUsers.indexNumber;
    delete whereUsers.grade;
    delete whereUsers.class;
    delete whereUsers.role;
  } else if (data.userListType === "teacher") {
    // grade, class: Teacher don't have grade, class and role
    delete whereUsers.grade;
    delete whereUsers.class;
    delete whereUsers.role;
  }
  
  let selectUsers: any = {
    indexNumber: true,
    grade: true,
    class: true,
    role: true,
    subject: true,
    user: {
      select: {
        userID: true,
        firstName: true,
        lastName: true,
        displayPicUrl: true,
        status: true
      },
    },
  }
  
  if (data.userListType === "parent") {
    // indexNumber, grade, class, role, subject: Parent don't have indexNumber, grade, 
    // subject, class and role
    delete selectUsers.indexNumber;
    delete selectUsers.grade;
    delete selectUsers.class;
    delete selectUsers.role;
    delete selectUsers.subject;
  } else if (data.userListType === "teacher") {
    // grade, class: Teacher don't have grade, class and role
    delete selectUsers.grade;
    delete selectUsers.class;
  } else {
    // role, subject: Student don't have role and subject
    delete selectUsers.role;
    delete selectUsers.subject;
  }

  const users = {
    users: await userListHandler[data.userListType].findMany({
      where: whereUsers,
      select: selectUsers,
      skip: (data.page - 1) * data.limit,
      take: data.limit,
    }),
    total: await userListHandler[data.userListType].count({
      where: whereUsers,
    })
  }
  
  return { status: true, resDataType: "success", data: users };
  
}
