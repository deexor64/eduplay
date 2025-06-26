import { NextRequest, NextResponse } from 'next/server';
import { UserType } from '@/lib/utils/types';
import createActivityService from '@/lib/services/school-management/createActivityService';

export async function POST(req: NextRequest) {
  
  try {
    
    const users: UserType[] = ["TEACHER"];
    
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
    let query = await createActivityService(searchParams, formData);
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

