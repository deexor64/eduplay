import { PrismaClient } from "@prisma/client";
import { ResType, UserType } from '@/lib/utils/types';
import { generatePasswordHash } from '@/lib/utils/generatePasswordHash';
import signinValidator from '@/validators/signinValidator';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

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

export default async function signinService(searchParams: any, formData: any):
Promise<{res: ResType, token:string}> {
  
  const userType = searchParams.userType;
  
  // schema valdiation
  const valid = await signinValidator(searchParams, formData);
  if (!valid.status) return {res: valid, token: ""};
  
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
  return {res: { status: false, resDataType: "warning", data: "Email or Password is wrong" },
    token: ""};
  
  // issue a token
  const JWT_SECRET = process.env.JWT_SECRET!;
  
  const token = jwt.sign(
    {
      userId: existing.id,
      userType: userType,
      permissionLevel: 100,
    },
    JWT_SECRET,
    { expiresIn: '3h' }
  );
  
  return {res: { status: true, resDataType: "success", data: "Signin successfull" }, token: token};
  
}
