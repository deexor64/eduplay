import { z } from "zod";
import { TeacherRoleEnum } from "@/lib/utils/types";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import userTokenChecker from "@/lib/utils/userTokenChecker";

export default function sampleActivityValidator(cookies: RequestCookies, searchParams: URLSearchParams): 
{ status: boolean, data: any } {
  
  // User token validation
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenChecker(userToken, ["TEACHER"],
     [TeacherRoleEnum.ADMIN, TeacherRoleEnum.TEACHER]);
  
  if (!valid.status) return valid;
  
  // constraints
  const zSearchParams = z.object({
    templateCode: z.string(),
  })
  .strict();
  
  // parse 
  const parsed_s = zSearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  
  if (!parsed_s.success) {
    return { status: false, data: parsed_s.error.message }
  }

  return { status: true, data: parsed_s.data}
  
}
