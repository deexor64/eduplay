import { z } from "zod";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { JwtPayload } from "jsonwebtoken";
import { ActivityDifficulty, Subject } from "@prisma/client";

export default function createActivityValidator(cookies: RequestCookies, formData: any): 
{ status: boolean, data: any } {
    
  // User token validation
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenChecker(userToken, ["TEACHER"], 
    ["ADMIN", "MASTER", "TEACHER"]);
  if (!valid.status) return valid;

  const jwtPayload = valid.data as JwtPayload;
  
  // constraints
  const zFormData = z.object({
    templateCode: z.string(),
    section: z.string(),
    title: z.string(),
    instructions: z.string(),
    activityData: z.any(),
    options: z.object({
      isScored: z.boolean(),
      grade: z.enum(["1", "2", "3", "4", "5"]).transform(value => parseInt(value)),
      subject: z.enum(Object.values(Subject) as [string, ...string[]]),
      difficulty: z.enum(Object.values(ActivityDifficulty) as [string, ...string[]]),
    })
  }).strict();
  
  const parsed_f = zFormData.safeParse(formData);
  
  if (!parsed_f.success) {
    return { status: false, data: parsed_f.error.message }
  }

  return { status: true, data: { ...parsed_f.data, ...jwtPayload}}
  
}
