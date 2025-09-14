import { NextRequest, NextResponse } from 'next/server';
import { UserType } from '@/lib/utils/types';
import createActivityValidator from '@/validators/activities/createActivityValidator';
import createActivityService from '@/services/activities/createActivityService';
import activitiesValidator from '@/validators/activities/activitiesValidator';
import activitiesService from '@/services/activities/activitiesService';

export async function POST(req: NextRequest) {
  
  try {
    
    const headers = req.headers;
    const formData = await req.json();
    
    const parsed = await createActivityValidator(headers, formData);
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

export async function GET(req: NextRequest) {
  try {
    
    const headers = req.headers;
    const searchParams = req.nextUrl.searchParams;

    const parsed = await activitiesValidator(headers, searchParams);
    if (!parsed.status) return NextResponse.json(
      {status: false, responseType: "log", data: parsed.data},
      { status: 401 }
    );

    const query = await activitiesService(parsed.data);
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

