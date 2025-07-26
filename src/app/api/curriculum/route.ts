import { NextRequest, NextResponse } from 'next/server';
import curriculumValidator from '@/validators/curriculum/curriculumValidator';
import curriculumService from '@/services/curriculum/curriculumService';

export async function GET(req: NextRequest) {
  try {
    const cookies = req.cookies;
    const searchParams = req.nextUrl.searchParams;

    const parsed = curriculumValidator(cookies, searchParams);
    if (!parsed.status) return NextResponse.json(
      {status: false, responseType: "log", data: parsed.data},
      { status: 401 }
    );

    const query = await curriculumService(parsed.data);
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

