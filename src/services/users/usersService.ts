import { adminAuth } from '@/lib/firebaseAdmin';
import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';

const userListHandler: any = {
  teacher: prisma.teacher,
  student: prisma.student,
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

  if (data.userListType === "teacher") {
    // grade, class: Teacher don't have grade, class
    delete whereUsers.grade;
  } else if (data.userListType === "student") {
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
  
  if (data.userListType === "teacher") {
    // grade, class: Teacher don't have grade, class and role
    delete selectUsers.grade;
  } else {
    // role, subject: Student don't have role and subject
    delete selectUsers.role;
  }

  const dbUsers = {
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
  
  let users = dbUsers;
  
  // Add Verified attribute to users
  // And filter them if filter is set
  // ISSUE: verified status not correctly detecting
  if (data.verified) {

    const usersVerified = await Promise.all(dbUsers.users.map(async (user: any) => {
      
      const fbUser = await adminAuth.getUserByEmail(user.user.email);
      
      return {
        ...user,
        user: {
          ...user.user,
          verified: fbUser.emailVerified,
        }
      };
      
    }));
    
    if (data.verified === "Verified") {
      users.users = usersVerified.filter(user => user.user.verified);
    } else if (data.verified === "Unverified") {
      users.users = usersVerified.filter(user => !user.user.verified);
    } else if (data.verified === undefined) {
      users.users = usersVerified;
    }
    
  }
 
  return { status: true, resDataType: "success", data: users };
  
}
