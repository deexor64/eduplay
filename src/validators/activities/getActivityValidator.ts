import { z } from "zod";
import { TeacherRoleEnum } from "@/lib/utils/types";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import userTokenChecker from "../../lib/utils/userTokenChecker";

export default function getActivityValidator(cookies: RequestCookies, slugParam: any):
{ status: boolean, data: any }  {

  // User token validation
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenChecker(userToken, ["TEACHER"],
    [TeacherRoleEnum.MASTER, TeacherRoleEnum.ADMIN, TeacherRoleEnum.TEACHER]);
  
  if (!valid.status) return valid;
  
  // constraints
  const zslugParams = z.object({
    activityID: z.string(),
   })
  .strict();

  const parsed_s = zslugParams.safeParse(slugParam);
  if (!parsed_s.success) return { status: false, data: parsed_s.error.message }

  return { status: true, data: parsed_s.data}
  
}
