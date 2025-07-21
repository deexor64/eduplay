import { NextRequest, NextResponse } from "next/server";
import createProgressService from "@/services/progress/createProgressService";
import createProgressValidator from "@/validators/progress/createProgressValidator";
import getProgressService from "@/services/progress/getProgressService";
import getProgressValidator from "@/validators/progress/getProgressValidator";

export async function POST(req: NextRequest) {
  try {
    const cookies = req.cookies;
    const formData = await req.json();
    let parsed = await createProgressValidator(cookies, formData);
    if (!parsed.status) return NextResponse.json(
      {status: false, responseType: "log", data: parsed.data},
      { status: 401 }
    );
    const query = await createProgressService(parsed.data);
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
    const cookies = req.cookies;
    let parsed = getProgressValidator(cookies);
    if (!parsed.status) return NextResponse.json(
      {status: false, responseType: "log", data: parsed.data},
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
      { status: false, responseType: "log", data: "Internal server error."},
      { status: 500 }
    );
  }
}
