import { NextRequest, NextResponse } from 'next/server';
import usersService from '@/services/users/usersService';
import createUsersService from '@/services/users/createUsersService';
import { UserType } from '@/lib/utils/types';

export async function GET(req: NextRequest) {
  
  try {
    
    const searchParams = req.nextUrl.searchParams;
    const query = await usersService(searchParams);
    
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
    
    let query = await createUsersService(searchParams, formData);
    
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
