import { z } from "zod";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { JwtPayload } from "jsonwebtoken";

export default function curriculumValidator(cookies: RequestCookies, searchParams: URLSearchParams): 
{ status: boolean, data: any } {
  
  // User token validation
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenChecker(userToken, ["TEACHER", "STUDENT"], 
    ["ADMIN", "MASTER", "TEACHER", "DEMONSTRATOR"]);
  if (!valid.status) return valid;

  const jwtPayload = valid.data as JwtPayload;

  // constraints
  const zsearchParams = z.object({
    gradeListType: z.enum(["1", "2", "3", "4", "5"]).transform((grade) => parseInt(grade)).optional(),
  })
  .strict();

  const parsed_s = zsearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  if (!parsed_s.success) return { status: false, data: parsed_s.error.message }

  return { status: true, data: {...parsed_s.data, ...jwtPayload} };

}
