import { z } from "zod";
import { ActivityDifficultyEnum, ActivityGradeEnum, ActivityStatusEnum, SubjectEnum, TeacherRoleEnum } from "@/lib/utils/types";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export default async function createProgressValidator(cookies: RequestCookies, formData: any): 
Promise<{ status: boolean, data: any }> {
  // User token validation
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenChecker(userToken, ["STUDENT"]);
  if (!valid.status) return valid;

  const userID = (valid.data as JwtPayload).userID as string;
  
  // constraints
  const zFormData = z.object({
    activityID: z.string().uuid(),
    score: z.object({
      baseScore: z.number().min(0),
      maxScore: z.number().min(0),
      summery: z.string(),
    }),
    data: z.any(),
  }).strict();

  // if activity is not graded progress is not saved
  // if acitivty is graded, the time taken must be greater than 0
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

  return { status: true, data: {...parsed.data, userID: userID} };
}
