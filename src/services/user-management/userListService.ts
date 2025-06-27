import { PrismaClient } from "@prisma/client";
import { ResType, UserType } from '@/lib/utils/types';
import userListValidator from '@/validators/user-management/userListValidator';

const prisma = new PrismaClient();

// dynamic user handler
function getUserHandler(userListType: any) { 
  const map: any = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    parent: prisma.parent,
    student: prisma.student,
  } as const;

  return map[userListType];
}

export default async function userListService(searchParams: any): Promise<ResType> {
  
  // schema valdiation
  const valid = await userListValidator(searchParams);
  if (!valid.status) return valid;
  
  // query
  const data = valid.data;
  
  let whereClause: any = { // undefined values are ignored in where clause
    indexNumber: data.indexNumber,
    email: data.email,
    user: {
      fullName: data.fullName,
      status: data.status,
    }
  };
  
  let selectClause: any = {
    indexNumber: true,
    email: true,
    user: {
      select: {
        fullName: true,
        displayPicUrl: true,
        status: true
      },
    },
  }
  
  if (data.userListType === "parent") {
    delete selectClause.indexNumber;
  }

  const existing = {
    users: await getUserHandler(data.userListType).findMany({
      where: whereClause,
      select: selectClause,
      skip: (data.page - 1) * data.limit,
      take: data.limit,
    }),
    total: await getUserHandler(data.userListType).count({
      where: whereClause,
    })
  }
  
  return { status: true, resDataType: "success", data: JSON.stringify(existing) };
  
}
