import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // // Delete users marked as DELETED
    // await prisma.user.deleteMany({
    //   where: { status: "DELETED" }
    // });

    // // Delete activities marked as DELETED
    // await prisma.activity.deleteMany({
    //   where: { status: "DELETED" }
    // });
    
    console.log("Cascade this");

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Cleanup error:", err);
    return NextResponse.json({ ok: false, error: "cleanup failed" }, { status: 500 });
  }
}
