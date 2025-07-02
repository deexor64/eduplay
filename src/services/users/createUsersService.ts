import { PrismaClient } from "@prisma/client";
import { ResType, UserType } from '@/lib/utils/types';
import { generatePasswordHash } from '@/lib/utils/generatePasswordHash';
import createUsersValidator from '@/validators/users/createUsersValidator';

const prisma = new PrismaClient();

// dynamic user handler
function getUserHandler(userType: any) { 
  const map: any = {
    ADMIN: prisma.admin,
    TEACHER: prisma.teacher,
    PARENT: prisma.parent,
    STUDENT: prisma.student,
  } as const;

  return map[userType];
}

export default async function createUsersService(searchParams: any, formData: any): Promise<ResType> {
  
  const userType = searchParams.get("userType");
  
  // schema valdiation
  const valid = await createUsersValidator(searchParams, formData);
  if (!valid.status) return valid;
  
  // query
  const data = valid.data;

  if (userType === "ADMIN") {
      
    let existing = await prisma.admin.findFirst({
      where: {
        OR: [
          { indexNumber: data.indexNumber },
          { email: data.email },
          { phoneNumber: data.phoneNumber },
        ],
      },
    });
    
    if (existing) return { status: false, resDataType: "warning", 
      data: "Admin already exists" };
    
    const newUser = await prisma.user.create({
      data: {
        fullName: data.fullName,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        password: await generatePasswordHash(data.password),
        admin: {
          create: {
            indexNumber: data.indexNumber,
            email: data.email,
            phoneNumber: data.phoneNumber,
          }
        }
      },
    });
  
  } else if (userType === "TEACHER") {
    
    let existing = await prisma.teacher.findFirst({
      where: {
        OR: [
          { indexNumber: data.indexNumber },
          { email: data.email },
          { phoneNumber: data.phoneNumber },
        ],
      },
    });
    
    if (existing) return { status: false, resDataType: "warning",
      data: "Teacher already exists" };
    
    // finalize and query
    const newUser = await prisma.user.create({
      data: {
        fullName: data.fullName,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        password: await generatePasswordHash(data.password),
        teacher: {
          create: {
            indexNumber: data.indexNumber,
            email: data.email,
            phoneNumber: data.phoneNumber,
          }
        }
      },
    });
    
  } else if (userType === "STUDENT") {
    
    let existing = await prisma.student.findUnique({
      where: { indexNumber: data.indexNumber },
    });
    
    if (existing) return { status: false, resDataType: "warning", data: "Student already exists" };

    // finalize and query
    const newUser = await prisma.user.create({
      data: {
        fullName: data.fullName,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        password: await generatePasswordHash(data.password),
        student: {
          create: {
            indexNumber: data.indexNumber,
            email: data.email,
            phoneNumber: data.phoneNumber,
          }
        }
      },
    });
    
  } else if (userType === "PARENT") {
    
    let existing = await prisma.parent.findFirst({
      where: {
        OR: [
          { email: data.email },
          { phoneNumber: data.phoneNumber },
        ],
      },
    });
    
    if (existing) return { status: false, resDataType: "warning", data: "User already exists" };
    
    // finalize and query
    const newUser = await prisma.user.create({
      data: {
        fullName: data.fullName,
        firstName: data.firstName,
        lastName: data.lastName,
        password: await generatePasswordHash(data.password),
        parent: {
          create: {
            email: data.email,
            phoneNumber: data.phoneNumber,
          }
        }
      },
    });
    
  }
  
  return { status: true, resDataType: "success", data: "Signup successfull" };
  
}
