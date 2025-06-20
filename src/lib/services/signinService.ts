import { PrismaClient } from "@prisma/client";
import { ResType, UserType } from '@/lib/utils/types';
import { generatePasswordHash } from '@/lib/utils/generatePasswordHash';
import signinValidator from '@/lib/validators/signinValidator';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function signupService(body: any): Promise<ResType> {
  
  // schema valdiation
  const valid = await signinValidator(body);
  
  if (!valid.status) return valid;
  
  // uniqueness check
  const userType: UserType = body.userType;
  const formData = valid.data;
  
  // check user exists
  function getUserHandler(userType: UserType) { // dynamic user handler
    const map: any = {
      ADMIN: prisma.admin,
      TEACHER: prisma.teacher,
      PARENT: prisma.parent,
      STUDENT: prisma.student,
    } as const;
  
    return map[userType];
  }
  
  let existing = await getUserHandler(userType).findFirst({ 
    where: {
      email: formData.email,
    },
    include: {
      user: true,
    },
  });
  
  // check password
  const passMatch = await bcrypt.compare(formData.password, existing.user.password);
  
  if (!existing || !passMatch)
  return { status: false, resDataType: "warning", data: "Email or Password number is wrong" };
  

  
  return { status: true, resDataType: "success", data: "Signin successfull" };
  
}
