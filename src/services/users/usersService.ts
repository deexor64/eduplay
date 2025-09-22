import { adminAuth } from '@/lib/firebaseAdmin';
import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';

const userListHandler: any = {
  TEACHER: prisma.teacher,
  STUDENT: prisma.student,
} as const;

export default async function usersService(data: any): Promise<ResType> {
  
  let whereUsers: any = {
    indexNumber: data.indexNumber,
    grade: data.grade,
    role: data.role,
    user: {
      firstName: (data.fullName ? { contains: data.fullName.split(" ")[0], mode: 'insensitive' } : undefined),
      lastName: (data.fullName ? { contains: data.fullName.split(" ")[1], mode: 'insensitive' } : undefined),
      email: data.email ? { contains: data.email, mode: 'insensitive' } : undefined,
      status: data.status,
    }
  };

  if (data.userListType === "TEACHER") {
    // grade, class: Teacher don't have grade, class
    delete whereUsers.grade;
  } else if (data.userListType === "STUDENT") {
    // role: Student don't have role
    delete whereUsers.role;
  }
  
  let selectUsers: any = {
    indexNumber: true,
    grade: true,
    role: true,
    user: {
      select: {
        userID: true,
        firstName: true,
        lastName: true,
        email: true,
        displayPicUrl: true,
        status: true
      },
    },
  }
  
  if (data.userListType === "TEACHER") {
    // grade, class: Teacher don't have grade, class and role
    delete selectUsers.grade;
  } else {
    // role, subject: Student don't have role and subject
    delete selectUsers.role;
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
  
  // Add Verified attribute to users
  let dbUsers = users;
  
  const usersVerified = await Promise.all(users.users.map(async (user: any) => {
    
    const fbUser = await adminAuth.getUserByEmail(user.user.email);
    
    return {
      ...user,
      user: {
        ...user.user,
        verified: fbUser.emailVerified,
      }
    };
    
  }));
  
  // Filter verified users if filter is set
  if (data.verified && data.verified === "VERIFIED") {
    dbUsers.users = usersVerified.filter(user => user.user.verified);
  } else if (data.verified && data.verified === "UNVERIFIED") {
    dbUsers.users = usersVerified.filter(user => !user.user.verified);
  } else {
    dbUsers.users = usersVerified;
  }
    
  return { status: true, resDataType: "success", data: users };
  
}
