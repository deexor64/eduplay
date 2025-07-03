import { z, ZodNumber } from "zod";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server";
import { ResType, UserPermission } from "@/lib/utils/types";
import jwt from 'jsonwebtoken';
import userTokenValidator from "@/validators/shared/userTokenValidator";

export default function usersValidator(cookies: RequestCookies, searchParams: URLSearchParams): 
{ status: boolean, data: any } {
  
  // User token validation
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenValidator(userToken, ["ADMIN", "TEACHER"], UserPermission.MAX);
  
  if (!valid.status) return valid;

  // constraints
  const zsearchParams = z.object({
    userListType: z.enum(["admin", "teacher", "student", "parent"]),
    indexNumber: z.string().optional(),
    fullName: z.string().optional(),
    email: z.string().optional(),
    status: z.string().optional(),
    page: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1)),
    limit: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1))
  })
  .strict()
  .transform((data) => {
    
    let tempData = data;
    
    if (data.userListType === "parent") delete tempData.indexNumber;
    return tempData;
    
  })
  
  const parsed_s = zsearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  if (!parsed_s.success) return { status: false, data: parsed_s.error.message }

  return { status: true, data: parsed_s.data }
  
}
