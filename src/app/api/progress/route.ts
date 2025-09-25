import { NextRequest, NextResponse } from "next/server";
import createProgressService from "@/services/progress/createProgressService";
import createProgressValidator from "@/validators/progress/createProgressValidator";
import progressService from "@/services/progress/progressService";
import progressValidator from "@/validators/progress/progressValidator";

export async function POST(req: NextRequest) {

  try {

    const headers = req.headers;
    const formData = await req.json();

    let parsed = await createProgressValidator(headers, formData);
    if (!parsed.status) return NextResponse.json(
      {status: false, data: parsed.data},
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
      { status: false, data: "Internal server error."},
      { status: 500 }
    );

  }
}

export async function GET(req: NextRequest) {

  try {

    const headers = req.headers;
    const searchParams = req.nextUrl.searchParams;

    let parsed = await progressValidator(headers, searchParams);
    if (!parsed.status) return NextResponse.json(
      {status: false, data: parsed.data},
      { status: 401 }
    );

    const query = await progressService(parsed.data);
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
