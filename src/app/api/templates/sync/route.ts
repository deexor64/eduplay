import { NextRequest, NextResponse } from 'next/server';
import syncService from '@/services/templates/sync/syncService';
import syncValidator from '@/validators/templates/sync/syncValidator';

export async function PUT(req: NextRequest) {
  
  try {
    
    const cookies = req.cookies;
    
    const parsed = syncValidator(cookies);
    if (!parsed.status) return NextResponse.json(
      {status: false, responseType: "log", data: parsed.data},
      { status: 401 }
    );
    
    const query = await syncService();
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
