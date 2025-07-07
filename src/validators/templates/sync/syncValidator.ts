import { ResType, UserPermission } from "@/lib/utils/types";
import userTokenValidator from "@/validators/shared/userTokenValidator";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export default function syncValidator(cookies: RequestCookies):
{ status: boolean, data: any } {
  
  // User token validation
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenValidator(userToken, ["TEACHER"], UserPermission.MAX);
  
  if (!valid.status) return valid;

  return { status: true, data: null };
  
  // No search parameters or form data here
  
}
