import { NextRequest, NextResponse } from 'next/server';
import signinService from '@/services/signinService';
import signinValidator from '@/validators/signinValidator';
import { UserType } from '@/lib/utils/types';

export async function POST(req: NextRequest) {
  
  try {
    
    const searchParams = req.nextUrl.searchParams;
    const formData = await req.json();
    
    let parsed = await signinValidator(searchParams, formData);
    if (!parsed.status) return NextResponse.json(
      {status: false, responseType: "log", data: parsed.data},
      { status: 401 }
    );
    
    const query = await signinService(parsed.data);
    if (!query.res.status) return NextResponse.json(
      query.res,
      { status: 500 }
    );
    
    // issue a Token cookie
    const token = query.token;
    
    const response = NextResponse.json(
      query.res, 
      { status: 200 }
    );
    
    response.cookies.set({
      name: 'userInfo',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
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
