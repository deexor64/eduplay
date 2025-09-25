import { NextRequest, NextResponse } from 'next/server';
import sampleActivityValidator from '@/validators/templates/sample/sampleActivityValidator';
import sampleActivityService from '@/services/templates/sample/sampleActivityService';

export async function GET(req: NextRequest) {
  
  try {
    
    const headers = req.headers;
    const searchParams = req.nextUrl.searchParams;
    
    const parsed = await sampleActivityValidator(headers, searchParams);
    if (!parsed.status) return NextResponse.json(
      {status: false, data: parsed.data},
      { status: 401 }
    );
    
    const query = await sampleActivityService(parsed.data);
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
      { status: false, data: "Internal server error"},
      { status: 500 }
    );
  }
  
}
