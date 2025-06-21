import { PrismaClient } from "@prisma/client";
import { ResType, UserType } from '@/lib/utils/types';
import { generatePasswordHash } from '@/lib/utils/generatePasswordHash';
import signupValidator from '@/lib/validators/signupValidator';

const prisma = new PrismaClient();

export default async function signupService(formData: any, userType: UserType): Promise<ResType> {
  
  // schema valdiation
  const valid = await signupValidator(formData, userType);
  
  if (!valid.status) return valid;
  
  // uniqueness check
  formData = valid.data;

  if (userType === "ADMIN") {
      
    let existing = await prisma.admin.findFirst({
      where: {
        OR: [
          { indexNumber: formData.indexNumber },
          { email: formData.email },
          { phoneNumber: formData.phoneNumber },
        ],
      },
    });
    
    if (existing) return { status: false, resDataType: "warning", 
      data: "Admin already exists" };
    
    // finalize and query
    const newUser = await prisma.user.create({
      data: {
        fullName: formData.fullName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        password: await generatePasswordHash(formData.password),
        admin: {
          create: {
            indexNumber: formData.indexNumber,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
          }
        }
      },
    });
  
  } else if (userType === "TEACHER") {
    
    let existing = await prisma.teacher.findFirst({
      where: {
        OR: [
          { indexNumber: formData.indexNumber },
          { email: formData.email },
          { phoneNumber: formData.phoneNumber },
        ],
      },
    });
    
    if (existing) return { status: false, resDataType: "warning",
      data: "Teacher already exists" };
    
    // finalize and query
    const newUser = await prisma.user.create({
      data: {
        fullName: formData.fullName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        password: await generatePasswordHash(formData.password),
        teacher: {
          create: {
            indexNumber: formData.indexNumber,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
          }
        }
      },
    });
    
  } else if (userType === "STUDENT") {
    
    let existing = await prisma.student.findUnique({
      where: { indexNumber: formData.indexNumber },
    });
    
    if (existing) return { status: false, resDataType: "warning", data: "Student already exists" };

    // finalize and query
    const newUser = await prisma.user.create({
      data: {
        fullName: formData.fullName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        password: await generatePasswordHash(formData.password),
        student: {
          create: {
            indexNumber: formData.indexNumber,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
          }
        }
      },
    });
    
  } else if (userType === "PARENT") {
    
    let existing = await prisma.parent.findFirst({
      where: {
        OR: [
          { email: formData.email },
          { phoneNumber: formData.phoneNumber },
        ],
      },
    });
    
    if (existing) return { status: false, resDataType: "warning", data: "User already exists" };
    
    // finalize and query
    const newUser = await prisma.user.create({
      data: {
        fullName: formData.fullName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: await generatePasswordHash(formData.password),
        parent: {
          create: {
            email: formData.email,
            phoneNumber: formData.phoneNumber,
          }
        }
      },
    });
    
  }
  
  return { status: true, resDataType: "success", data: "Signup successfull" };
  
}
