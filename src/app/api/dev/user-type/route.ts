import { NextRequest, NextResponse } from 'next/server';
import { UserPermission, UserType } from '@/lib/utils/types';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  
  const searchParams = req.nextUrl.searchParams;
  
  let userId: string | null = null;
  const userType = searchParams.get("userType") as UserType;
  const permissionLevel = Number.parseInt(searchParams.get("permissionLevel") + "") as UserPermission;

  // Fetch the first user depending on the type
  if (userType === "TEACHER") {
    const user = await prisma.teacher.findFirst({ include: { user: true } });
    userId = user?.user.userID || null;
  } else if (userType === "PARENT") {
    const user = await prisma.parent.findFirst({ include: { user: true } });
    userId = user?.user.userID || null;
  } else if (userType === "STUDENT") {
    const user = await prisma.student.findFirst({ include: { user: true } });
    userId = user?.user.userID || null;
  }

  if (!userId) {
    return NextResponse.json(
      { status: false, resType: "log", data: "No user found" },
      { status: 404 }
    );
  }

  // Create JWT payload
  const payload = {
    userId: userId,
    userType,
    permissionLevel
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
