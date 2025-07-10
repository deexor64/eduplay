import { TeacherRoleEnum } from "@/lib/utils/types";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export default function syncValidator(cookies: RequestCookies):
{ status: boolean, data: any } {
  
  // User token validation
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenChecker(userToken, ["TEACHER"],
    [TeacherRoleEnum.ADMIN, TeacherRoleEnum.MASTER]);
  
  if (!valid.status) return valid;

  return { status: true, data: null };
  
  // No search parameters or form data here
  
}
