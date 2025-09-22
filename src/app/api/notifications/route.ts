import { NextRequest, NextResponse } from 'next/server';
import notificationsValidator from '@/validators/notifications/notificationsValidator';
import notificationsService from '@/services/notifications/notificationsService';

export async function GET(req: NextRequest) {
  try {
    const headers = req.headers;

    const parsed = await notificationsValidator(headers);
    if (!parsed.status) return NextResponse.json(
      { status: false, responseType: "log", data: parsed.data },
      { status: 401 }
    );

    const query = await notificationsService(parsed.data);
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