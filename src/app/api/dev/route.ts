import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { UserPermission } from '@/lib/utils/types'

export async function POST(req: Request) {
  
  const body = await req.json()

  const payload = {
    userId: 434,
    userType: body.userType,
    permissionLevel: body.permission as UserPermission,
  }

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET!,
    { expiresIn: "3m" }
  );

  const res = NextResponse.json({ success: true })

  res.cookies.set({
    name: 'userInfo',
    value: token,
    httpOnly: true,
    secure: false, // set to true in prod
    path: '/',
    maxAge: 60 * 60,
    sameSite: 'lax',
  })

  return res
}
