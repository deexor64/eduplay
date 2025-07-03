import { NextRequest, NextResponse } from 'next/server';
import { UserType } from '@/lib/utils/types';
import createActivityValidator from '@/validators/activities/createActivityValidator';
import createActivityService from '@/services/activities/createActivityService';

export async function POST(req: NextRequest) {
  
  try {
    
    const cookies = req.cookies;
    const formData = await req.json();
    
    const parsed = await createActivityValidator(cookies, formData);
    if (!parsed.status) return NextResponse.json(
      {status: false, responseType: "log", data: parsed.data},
      { status: 401 }
    );
    
    const query = await createActivityService(parsed.data);
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

