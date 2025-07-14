import { z } from "zod";
import { ActivityDifficultyEnum, ActivityGradeEnum, ActivityStatusEnum, SubjectEnum, TeacherRoleEnum } from "@/lib/utils/types";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { JwtPayload } from "jsonwebtoken";

export default function activitiesValidator(cookies: RequestCookies, searchParams: URLSearchParams): 
{ status: boolean, data: any } {
  // User token validation
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenChecker(userToken, ["TEACHER", "STUDENT"], [TeacherRoleEnum.ADMIN, TeacherRoleEnum.TEACHER,
    TeacherRoleEnum.DEMONSTRATOR, TeacherRoleEnum.MASTER
  ]);
  if (!valid.status) return valid;

  const userID = (valid.data as JwtPayload).userID as string;

  // constraints
  const zSearchParams = z.object({
    title: z.string().optional(),
    status: z.enum(Object.values(ActivityStatusEnum) as [string, ...string[]]).optional(),
    subject: z.enum(Object.values(SubjectEnum) as [string, ...string[]]).optional(),
    grade: z.enum(Object.values(ActivityGradeEnum) as [string, ...string[]])
      .transform(function(val) {
        return val === "ALL" ? 0 : parseInt(val);
      })
      .optional(),
    difficulty: z.enum(Object.values(ActivityDifficultyEnum) as [string, ...string[]]).optional(),
    page: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1)),
    limit: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1))
  }).strict();

  const parsed = zSearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  if (!parsed.success) {
    return { status: false, data: parsed.error.message };
  }

  return { status: true, data: parsed.data };
}
