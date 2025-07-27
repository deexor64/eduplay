import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { JwtPayload } from "jsonwebtoken";
import { z } from "zod";

export default function progressValidator(cookies: RequestCookies, searchParams: URLSearchParams):
{ status: boolean, data: any } {
  
  // User token validation
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenChecker(userToken, ["STUDENT", "TEACHER", "PARENT"],
     ["ADMIN", "MASTER", "TEACHER"]);
  if (!valid.status) return valid;

  const jwtPayload = valid.data as JwtPayload;

  // constraints
  const zsearchParams = z.object({
    studentID: z.string().optional(),
  })
  .strict();

  const parsed_s = zsearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  if (!parsed_s.success) return { status: false, data: parsed_s.error.message }

  return { status: true, data: {...parsed_s.data, ...jwtPayload} };

}
