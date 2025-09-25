import { z } from "zod";
import { ActivityDifficulty, Subject } from "@prisma/client";
import userPermissionCheck from "@/lib/utils/userPermissionCheck";

export default async function createActivityValidator(headers: Headers, formData: any): 
Promise<{ status: boolean; data: any; }> {
    
  // Verify session
  const token = headers.get("authorization")?.split("Bearer ")[1];
  const userPermissions = await userPermissionCheck(token, ["TEACHER"], ["ADMIN", "TEACHER"], ["ACTIVE"]);
  if (!userPermissions.status) return userPermissions;
  
  // Validate
  const zFormData = z.object({
    templateCode: z.string(),
    section: z.string(),
    title: z.string(),
    instructions: z.string(),
    activityData: z.any(),
    options: z.object({
      isScored: z.boolean(),
      grade: z.enum(["1", "2", "3", "4", "5"]).transform(value => parseInt(value)),
      subject: z.nativeEnum(Subject),
      difficulty: z.nativeEnum(ActivityDifficulty),
    })
  }).strict();
  
  const parsed_f = zFormData.safeParse(formData);
  
  if (!parsed_f.success) {
    return { status: false, data: parsed_f.error.message }
  }

  return { status: true, data: { ...parsed_f.data, userPermissions: userPermissions.data }}
  
}
