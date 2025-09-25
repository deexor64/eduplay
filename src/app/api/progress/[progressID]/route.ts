export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import getProgressValidator from '@/validators/progress/getProgressValidator';
import getProgressService from '@/services/progress/getProgressService';

export async function GET(req: NextRequest, context: { params: Promise<any> }) {
  
  try {
    
    const headers = req.headers;
    const slugParam = {progressID: (await context.params).progressID}
    
    const parsed = await getProgressValidator(headers, slugParam);
    if (!parsed.status) return NextResponse.json(
      {status: false, data: parsed.data},
      { status: 401 }
    );
    
    const query = await getProgressService(parsed.data);
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
