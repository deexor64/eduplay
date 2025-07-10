import { PrismaClient } from "@prisma/client";
import { ResType, UserPermission, UserType } from '@/lib/utils/types';
import { generatePasswordHash } from '@/lib/utils/generatePasswordHash';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// dynamic user handler
function getUserHandler(userType: UserType) { 
  const map: any = {
    TEACHER: prisma.teacher,
    PARENT: prisma.parent,
    STUDENT: prisma.student,
  } as const;

  return map[userType];
}

export default async function signinService(data: any): Promise<{res: ResType, token:string}> {
  
  let existing = await getUserHandler(data.userType).findFirst({ 
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
      userType: data.userType,
      permissionLevel: UserPermission.MAX,
    },
    JWT_SECRET,
    { expiresIn: "30d" }
  );
  
  return {res: { status: true, resDataType: "success", data: "Signin successfull" }, token: token};
  
}
