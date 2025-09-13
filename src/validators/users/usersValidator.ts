import { z } from "zod";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { JwtPayload } from "jsonwebtoken";
import { TeacherRole, UserStatus } from "@prisma/client";

export default function usersValidator(cookies: RequestCookies, searchParams: URLSearchParams): 
{ status: boolean, data: any } {
  
  // User token validation
  // const userToken = cookies.get("userInfo")?.value;
  // const valid = userTokenChecker(userToken, ["TEACHER"], 
  //   ["MASTER", "ADMIN", "TEACHER"]);
  // if (!valid.status) return valid;

  // const jwtPayload = valid.data as JwtPayload;

  // Input constraints
  const zsearchParams = z.object({
    userListType: z.enum(["teacher", "student"]),
    indexNumber: z.string().optional(),
    fullName: z.string().optional(),
    grade: z.enum(["1", "2", "3", "4", "5"]).transform((grade) => parseInt(grade)).optional(),
    role: z.enum(Object.values(TeacherRole) as [string, ...string[]]).optional(),
    email: z.string().optional(),
    verified: z.enum(["Verified", "Unverified"]).optional(),
    status: z.enum(Object.values(UserStatus) as [string, ...string[]]).optional(),
    page: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1)),
    limit: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1))
  })
  .strict();
  
  const parsed_s = zsearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  if (!parsed_s.success) return { status: false, data: parsed_s.error.message }

  // return { status: true, data: {...parsed_s.data, ...jwtPayload} }
  return { status: true, data: {...parsed_s.data} }

  
}
