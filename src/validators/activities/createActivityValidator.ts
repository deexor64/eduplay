import { z } from "zod";
import { TeacherRoleEnum } from "@/lib/utils/types";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { JwtPayload } from "jsonwebtoken";

export default function createActivityValidator(cookies: RequestCookies, formData: any): 
{ status: boolean, data: any } {
    
  // User token validation
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenChecker(userToken, ["TEACHER"], 
    [TeacherRoleEnum.ADMIN, TeacherRoleEnum.TEACHER]);
  
  if (!valid.status) return valid;

  // get userID from token
  const userID = (valid.data as JwtPayload).userID as string;
  
  // constraints
  const zFormData = z.object({
    templateCode: z.string(),
    title: z.string(),
    instructions: z.string(),
    activityData: z.string(),
    options: z.object({
        timeLimit: z.number().min(0),
        isGraded: z.boolean(),
        grade: z.number().min(1).max(5).optional(),
        difficulty: z.number().min(0).max(10).optional(),
      })
  }).strict()
  
  const parsed_f = zFormData.safeParse(formData);
  
  if (!parsed_f.success) {
    return { status: false, data: parsed_f.error.message }
  }

  return { status: true, data: { ...parsed_f.data, userID: userID }}
  
}
