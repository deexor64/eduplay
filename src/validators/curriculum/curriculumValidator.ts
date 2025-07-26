import { z } from "zod";
import { ActivityDifficultyEnum, ActivityGradeEnum, ActivityStatusEnum, SubjectEnum, TeacherRoleEnum } from "@/lib/utils/types";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { JwtPayload } from "jsonwebtoken";

export default function curriculumValidator(cookies: RequestCookies): 
{ status: boolean, data: any } {
  // User token validation
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenChecker(userToken, ["TEACHER", "STUDENT"], [TeacherRoleEnum.ADMIN, TeacherRoleEnum.TEACHER,
    TeacherRoleEnum.DEMONSTRATOR, TeacherRoleEnum.MASTER
  ]);
  if (!valid.status) return valid;

  const userID = (valid.data as JwtPayload).userID as string;
  const userType = (valid.data as JwtPayload).userType as string;

  return { status: true, data: {userID: userID, userType: userType} };
}
