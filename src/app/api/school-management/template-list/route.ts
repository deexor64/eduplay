import { NextRequest, NextResponse } from 'next/server';
import templateListService from '@/lib/services/school-management/templateListService';
import { UserType } from '@/lib/utils/types';

export async function GET(req: NextRequest) {
  
  try {
    
    const users: UserType[] = ["ADMIN", "TEACHER"];
    const searchParams = req.nextUrl.searchParams;
    
    // check user type
    const userType = searchParams.get("userType") as UserType;
    
    if (!users.includes(userType)) {
      return NextResponse.json(
        { status: false, responseType: "log", data: "Invalid usertype" },
        { status: 400 }
      );
    }
    
    // query database
    let query = await templateListService(searchParams);
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
