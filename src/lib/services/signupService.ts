import { PrismaClient } from "@prisma/client";
import { ResType, UserType } from '@/lib/utils/types';
import { generatePasswordHash } from '@/lib/utils/generatePasswordHash';
import signupValidator from '@/lib/validators/signupValidator';

const prisma = new PrismaClient();

export default async function signupService(body: any): Promise<ResType> {
  
  // schema valdiation
  const valid = await signupValidator(body);
  
  if (!valid.status) return valid;
  
  // uniqueness check
  const userType = body.userType;
  const formData = valid.data;

  if (userType === "admin" || userType === "teacher" || userType === "parent") {
      
    let existing = await prisma.user.findUnique({ // email
      where: { email: formData.email },
    });

    if (existing) return { status: false, resDataType: "warning", data: "Email already exists" };
    
    existing = await prisma.user.findUnique({ // email
      where: { phoneNumber: formData.phoneNumber },
    });
    
    if (existing) return { status: false, resDataType: "warning", data: "Phone Number already exists" };
    
    existing = await prisma.user.findFirst({ // index number
      where: { indexNumber: formData.indexNumber },
    });
    
    if (existing) return { status: false, resDataType: "warning", data: "Index number already exists" };
    
    // finalize and query
    const newUser = await prisma.user.create({
      data: {
        ...formData,
        password: await generatePasswordHash(formData.password),
      },
    });
    
  } else if (userType === "student" ) {
    
    let existing = await prisma.student.findUnique({ // index number
      where: { indexNumber: formData.indexNumber },
    });
    
    if (existing) return { status: false, resDataType: "warning", data: "Index number already exists" };
    
    // finalize and query
    const newUser = await prisma.student.create({
      data: {
        ...formData,
        password: await generatePasswordHash(formData.password),
      },
    });
    
  }
  
  return { status: true, resDataType: "success", data: "Signup successfull" };
  
}
