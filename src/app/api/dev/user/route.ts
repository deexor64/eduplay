import { NextRequest, NextResponse } from 'next/server';
import { TeacherRole, UserType } from '@/lib/utils/types';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';


export async function GET(req: NextRequest) {
  
  const searchParams = req.nextUrl.searchParams;
  
  const userId = (await prisma.user.findFirst())?.userID;
  const userType = searchParams.get("userType") as UserType;
  const teacherRole = searchParams.get("teacherRole")  as TeacherRole;
  

  if (!userId) {
    return NextResponse.json(
      { status: false, resType: "log", data: "No user found" },
      { status: 404 }
    );
  }

  // Create JWT payload
  const payload = {
    userId: userId,
    userType: userType,
    teacherRole: teacherRole
  };
  
  console.log(payload);

  // Sign token
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "30d" // 1 month
  });

  // Create response and set cookie
  const res = NextResponse.json(
    { status: true, resType: "log", data: "Token changed" },
    { status: 200 }
  );

  res.cookies.set({
    name: "userInfo",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 1 month
    sameSite: "lax",
  });

  return res;
  
}
