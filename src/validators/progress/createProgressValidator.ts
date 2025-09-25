import { z } from "zod";
import { prisma } from "@/lib/prisma";
import userPermissionCheck from "@/lib/utils/userPermissionCheck";

export default async function createProgressValidator(headers: Headers, formData: any): 
Promise<{ status: boolean, data: any }> {

  // Verify session
  const token = headers.get("authorization")?.split("Bearer ")[1];
  const userPermissions = await userPermissionCheck(token, ["STUDENT"], [], ["ACTIVE"]);
  if (!userPermissions.status) return userPermissions;
  
  // Validate
  const zFormData = z.object({
    activityID: z.string().uuid(),
    score: z.object({
      baseScore: z.number().min(0),
      maxScore: z.number().min(0),
      summery: z.string(),
    }),
    data: z.any(),
  }).strict();

  // If activity is not graded progress is not saved
  const activity = await prisma.activity.findUnique({
    where: {
      activityID: formData.activityID,
    },
    select: {
      isScored: true,
    }
  });
  
  if (!activity?.isScored) {
    return { status: false, data: "Activity is not graded" };
  } 

  const parsed = zFormData.safeParse(formData);
  if (!parsed.success) {
    return { status: false, data: parsed.error.message };
  }

  return { status: true, data: {...parsed.data, userPermissions: userPermissions.data} };

}
