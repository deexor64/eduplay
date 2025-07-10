import { prisma } from '@/lib/prisma';
import { ResType, UserType } from '@/lib/utils/types';

export default async function usersService(data: any):
Promise<ResType> {
  
  // query
  const userListHandler: any = {
    teacher: prisma.teacher,
    parent: prisma.parent,
    student: prisma.student,
  } as const;
  
  let whereClause: any = { // undefined values are ignored in where clause
    indexNumber: data.indexNumber,
    grade: data.grade,
    class: data.class,
    user: {
      firstName: (data.fullName ? data.fullName.split(" ")[0] : undefined),
      lastName: (data.fullName ? data.fullName.split(" ")[1] : undefined),
      status: data.status,
    }
  };
  
  let selectClause: any = {
    indexNumber: true,
    grade: true,
    class: true,
    user: {
      select: {
        firstName: true,
        lastName: true,
        displayPicUrl: true,
        status: true
      },
    },
  }
  
  if (data.userListType === "parent") {
    delete selectClause.indexNumber;
    delete selectClause.grade;
    delete selectClause.class;
  } else if (data.userListType === "teacher") {
    delete selectClause.grade;
    delete selectClause.class;
  }

  const existing = {
    users: await userListHandler[data.userListType].findMany({
      where: whereClause,
      select: selectClause,
      skip: (data.page - 1) * data.limit,
      take: data.limit,
    }),
    total: await userListHandler[data.userListType].count({
      where: whereClause,
    })
  }
  
  return { status: true, resDataType: "success", data: existing };
  
}
