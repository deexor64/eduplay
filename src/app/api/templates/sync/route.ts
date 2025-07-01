import { NextRequest, NextResponse } from 'next/server';
import syncService from '@/services/templates/sync/syncService';
import { UserType } from '@/lib/utils/types';

export async function POST(req: NextRequest) {
  
  try {
    
    const searchParams = req.nextUrl.searchParams;
    const query = await syncService(searchParams);
    
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
