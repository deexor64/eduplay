import { PrismaClient } from "@prisma/client";
import { ResType } from '@/lib/utils/types';
import { generatePasswordHash } from '@/lib/utils/generatePasswordHash';
import teacherValidator from '@/lib/validators/signup/teacher';

const prisma = new PrismaClient();

export default async function teacherService(body: any): Promise<ResType> {
  
  // schema valdiation
  const valid = await teacherValidator(body);
  
  if (!valid.status) return valid;
  
  // uniqueness check
  const data = valid.data;
  
  let existing = await prisma.user.findUnique({ // email
    where: { email: data.email },
  });
  
  if (existing) return { status: false, resDataType: "warning", data: "Email already exists" };
  
  existing = await prisma.user.findUnique({ // phoneNumber
    where: { phoneNumber: data.phoneNumber },
  });
  
  if (existing) return { status: false, resDataType: "warning", data: "Phone Number already exists" };
  
  existing = await prisma.teacher.findUnique({ // index number
    where: { indexNumber: data.indexNumber },
  });
  
  if (existing) return { status: false, resDataType: "warning", data: "Index number already exists" };
  
  // finalize and query data
  const hashedPassword = await generatePasswordHash(data.password);
  
  const newUser = await prisma.user.create({
    data: {
      fullName: data.fullName,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: hashedPassword
    },
  });
  
  const newTeacher = await prisma.teacher.create({
    data: {
      indexNumber: data.indexNumber,
      userID: newUser.userID
    },
  });
  
  return { status: true, resDataType: "success", data: "Signup successfull" };
  
}
