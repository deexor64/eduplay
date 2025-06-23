import { PrismaClient } from "@prisma/client";
import { ResType, UserType } from '@/lib/utils/types';
import userListValidator from '@/lib/validators/user-management/userListValidator';

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

  const users = await getUserHandler(data.userListType).findMany({
    where: {
      indexNumber: data.indexNumber,
      grade: data.grade,
      email: data.email,
      profileUrl: data.profileUrl,
      displayPic: data.displayPic,
      user: {
        fullName: data.fullName,
        status: data.status,
      }
    },
    select: {
      indexNumber: true,
      email: true,
      profileUrl: true,
      displayPic: true,
      user: {
        select: {
          fullName: true,
          status: true
        },
      },
    },
    skip: (data.page - 1) * data.limit,
    take: data.limit,
  });
  
  const total = await getUserHandler(data.userListType).count({
    where: {
      indexNumber: data.indexNumber,
      grade: data.grade,
      email: data.email,
      profileUrl: data.profileUrl,
      displayPic: data.displayPic,
      user: {
        fullName: data.fullName,
        status: data.status,  
      }
    },
  })

  const output = {
    users: users,
    total: total
  }
  
  return { status: true, resDataType: "success", data: JSON.stringify(output) };
  
}
