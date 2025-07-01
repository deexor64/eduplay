import { NextRequest, NextResponse } from 'next/server';
import { UserType } from '@/lib/utils/types';
import createService from '@/services/activities/createService';

export async function POST(req: NextRequest) {
  
  try {
    
    const searchParams = req.nextUrl.searchParams;
    
    // query database
    const formData = await req.json();
    let query = await createService(searchParams, formData);
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

