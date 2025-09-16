import { NextRequest, NextResponse } from 'next/server';
import profileValidator from '@/validators/profile/profileValidator';
import profileService from '@/services/profile/profileService';

export async function GET(req: NextRequest) {

  try {

    const headers = req.headers;
    const searchParams = req.nextUrl.searchParams;

    const parsed = await profileValidator(headers, searchParams);
    if (!parsed.status) return NextResponse.json(
      { status: false, responseType: "log", data: parsed.data },
      { status: 401 }
    );
    
    const query = await profileService(parsed.data);
    if (!query.status) return NextResponse.json(
      query,
      { status: 404 }
    );

    return NextResponse.json(
      query,
      { status: 200 }
    );

  } catch (err: any) {

    console.log(err);
    return NextResponse.json(
      { status: false, responseType: "log", data: "Internal server error." },
      { status: 500 }
    );

  }

}
