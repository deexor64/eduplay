import { NextRequest, NextResponse } from 'next/server';
import { UserType } from '@/lib/utils/types';
import usersService from '@/services/users/usersService';
import usersValidator from '@/validators/users/usersValidator';
import createUsersService from '@/services/users/createUsersService';
import createUsersValidator from '@/validators/users/createUsersValidator';

export async function GET(req: NextRequest) {
  
  try {
    
    const cookies = req.cookies;
    const searchParams = req.nextUrl.searchParams;
    
    const parsed = await usersValidator(cookies, searchParams);
    if (!parsed.status) return NextResponse.json(
      {status: false, responseType: "log", data: parsed.data},
      { status: 401 }
    );
    
    const query = await usersService(parsed.data);
    if (!query.status) return NextResponse.json(
      query,
      { status: 500 }
    );
    
    return NextResponse.json(
      query, 
      { status: 200 }
    );
  
  } catch (err: any) {
    
    console.log(err);
    return NextResponse.json(
      { status: false, responseType: "log", data: "Internal server error."},
      { status: 500 }
    );
    
  }
  
}

export async function POST(req: NextRequest) {
  
  try {
    
    const searchParams = req.nextUrl.searchParams;
    const formData = await req.json();
    
    let parsed = await createUsersValidator(searchParams, formData);
    if (!parsed.status) return NextResponse.json(
      {status: false, responseType: "log", data: parsed.data},
      { status: 401 }
    );
    
    const query = await createUsersService(parsed.data);
    if (!query.status) return NextResponse.json(
      query,
      { status: 500 }
    );
    
    return NextResponse.json(
      query, 
      { status: 200 }
    );
  
  } catch (err: any) {
    
    console.log(err);
    return NextResponse.json(
      { status: false, responseType: "log", data: "Internal server error."},
      { status: 500 }
    );
    
  }
  
}
