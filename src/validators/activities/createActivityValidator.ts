import { z, ZodNumber } from "zod";
import { ResType, UserPermission } from "@/lib/utils/types";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import userTokenValidator from "../shared/userTokenValidator";

export default function createActivityValidator(cookies: RequestCookies, formData: any): 
{ status: boolean, data: any } {
    
  // User token validation
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenValidator(userToken, ["TEACHER"], UserPermission.MAX);
  
  if (!valid.status) return valid;
  
  // constraints
  const zFormData = z.object({
    templateCode: z.string(),
    title: z.string(),
    coverImageUrl: z.string(),
    description: z.string(),
    activityData: z.string(),
    options: z.string().transform((val) => JSON.parse(val))
      .pipe(z.object({
        timeLimit: z.number().min(0),
        isGraded: z.boolean(),
      }))
  }).strict()
  
  const parsed_f = zFormData.safeParse(formData);
  
  if (!parsed_f.success) {
    return { status: false, data: parsed_f.error.message }
  }

  return { status: true, data: parsed_f.data}
  
}
