import { PrismaClient } from "@prisma/client";
import { ResType, UserType } from '@/lib/utils/types';
import { generatePasswordHash } from '@/lib/utils/generatePasswordHash';
import signinValidator from '@/lib/validators/signinValidator';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// dynamic user handler
function getUserHandler(userType: UserType) { 
  const map: any = {
    ADMIN: prisma.admin,
    TEACHER: prisma.teacher,
    PARENT: prisma.parent,
    STUDENT: prisma.student,
  } as const;

  return map[userType];
}

export default async function signupService(searchParams: any, formData: any): Promise<ResType> {
  
  const userType = searchParams.userType;
  
  // schema valdiation
  const valid = await signinValidator(searchParams, formData);
  if (!valid.status) return valid;
  
  // query
  const data = valid.data;
  
  let existing = await getUserHandler(userType).findFirst({ 
    where: {
      email: data.email,
    },
    include: {
      user: true,
    },
  });
  
  const passMatch = await bcrypt.compare(data.password, existing.user.password);
  
  if (!existing || !passMatch)
  return { status: false, resDataType: "warning", data: "Email or Password number is wrong" };
  
  return { status: true, resDataType: "success", data: "Signin successfull" };
  
}
