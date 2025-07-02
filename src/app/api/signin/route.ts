import { NextRequest, NextResponse } from 'next/server';
import signinService from '@/services/signinService';
import { UserType } from '@/lib/utils/types';

export async function POST(req: NextRequest) {
  
  try {
    
    const users: UserType[] = ["ADMIN", "TEACHER", "PARENT", "STUDENT"];
    
    const searchParams = req.nextUrl.searchParams;
    const userType = searchParams.get("userType") as UserType;
    
    // check user type
    if (!users.includes(userType)) {
      return NextResponse.json(
        { status: false, responseType: "log", data: "Invalid usertype" },
        { status: 400 }
      );
    }
    
    // query database
    const formData = await req.json();
    const query = await signinService(searchParams, formData);
    
    const res = query.res;
    if (!res.status) return NextResponse.json(
      res,
      { status: 500 }
    );
    
    // issue a Token cookie
    const token = query.token;
    
    const response = NextResponse.json(
      res, 
      { status: 200 }
    );
    
    response.cookies.set({
      name: 'userInfo',
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60,
    });
    
    return response;
  
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { status: false, responseType: "log", data: "Internal server error."},
      { status: 500 }
    );
  }
  
}
