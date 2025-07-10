import { prisma } from '@/lib/prisma';
import { ResType, UserType } from '@/lib/utils/types';
import { generatePasswordHash } from '@/lib/utils/generatePasswordHash';

export default async function createUsersService(data: any): Promise<ResType> {
  
  // query
  const usersHandler: any = {
    TEACHER: prisma.teacher,
    PARENT: prisma.parent,
    STUDENT: prisma.student,
  } as const;
    
  let existing = await usersHandler[data.userType].findFirst({
    where: {
      OR: [
        { indexNumber: data.indexNumber },
        { email: data.email },
      ],
    },
  });
    
  if (existing) return { status: false, resDataType: "warning", data: "Admin already exists" };
    
  const newUser = await usersHandler[data.userType].create({
    data: {
      indexNumber: data.indexNumber,
      email: data.email,
      user: {
        create: {
          firstName: data.firstName,
          lastName: data.lastName,
          password: await generatePasswordHash(data.password),
        }
      }
    },
  });
  
  
  return { status: true, resDataType: "success", data: "Signup successfull" };
  
}
