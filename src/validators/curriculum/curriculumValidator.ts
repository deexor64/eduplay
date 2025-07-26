import { z } from "zod";
import { GradeEnum, TeacherRoleEnum } from "@/lib/utils/types";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { JwtPayload } from "jsonwebtoken";

export default function curriculumValidator(cookies: RequestCookies, searchParams: URLSearchParams): 
{ status: boolean, data: any } {
  // User token validation
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenChecker(userToken, ["TEACHER", "STUDENT", "PARENT"], [TeacherRoleEnum.ADMIN, TeacherRoleEnum.TEACHER,
    TeacherRoleEnum.DEMONSTRATOR, TeacherRoleEnum.MASTER]);
  if (!valid.status) return valid;

  const userID = (valid.data as JwtPayload).userID as string;
  const userType = (valid.data as JwtPayload).userType as string;

  // constraints
  const zsearchParams = z.object({
    gradeListType: z.number().min(1).max(5).optional(),
  })
  .strict();

  const parsed_s = zsearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  if (!parsed_s.success) return { status: false, data: parsed_s.error.message }

  return { status: true, data: {...parsed_s.data, userID: userID, userType: userType} };

}
