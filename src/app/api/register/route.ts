import { NextRequest, NextResponse } from 'next/server';
import registerValidator from '@/validators/register/registerValidator';
import registerService from '@/services/register/registerService';

export async function POST(req: NextRequest) {
  
  try {
    
    const headers = req.headers;
    const formData = await req.json();
    const searchParams = req.nextUrl.searchParams;
    
    const parsed = registerValidator(headers, formData, searchParams);
    if (!parsed.status) return NextResponse.json(
      {status: false, responseType: "log", data: parsed.data},
      { status: 401 }
    );
    
    const query = await registerService(parsed.data);
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
