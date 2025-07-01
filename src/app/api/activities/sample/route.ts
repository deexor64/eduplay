import { NextRequest, NextResponse } from 'next/server';
import sampleService from '@/services/activities/sample/sampleService';
import { UserType } from '@/lib/utils/types';

export async function GET(req: NextRequest) {
  
  try {
    
    const searchParams = req.nextUrl.searchParams;
    
    // query database
    let query = await sampleService(searchParams);
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
