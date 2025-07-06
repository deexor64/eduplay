import { NextResponse } from "next/server";
import { ResType, UserPermission, UserType } from "@/lib/utils/types";
import jwt, { JwtPayload } from "jsonwebtoken";

export default function userTokenValidator(userToken: string | undefined,
  userType: Array<UserType>, permission: UserPermission):
{ status: boolean, data: string | JwtPayload } {
  
  // Token doesn't exists
  if (!userToken) return { status: false, data: "Unauthorized" };
  
  try { 
    
    const JWT_SECRET = process.env.JWT_SECRET!;
    
    // token validation
    // this will throw an error
    const payload = jwt.verify(userToken, JWT_SECRET) as JwtPayload; 
    
    // Check userInfo
    if (!userType.includes(payload.userType) || payload.permission < permission) {
      return { status: false, data: payload };
    }
    
    return { status: true, data: "Unauthorized" };
    
  } catch (err) {
    
    // Invalid token
    // Either tampered or expired
    return { status: false, data: "Unauthorized" };
    
  }
  
}
