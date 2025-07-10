import { z } from "zod";
import { TeacherRoleEnum } from "@/lib/utils/types";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import userTokenChecker from "../../lib/utils/userTokenChecker";

export default function templatesValidator(cookies: RequestCookies, searchParams: URLSearchParams):
{ status: boolean, data: any }  {
  
  // User token validation
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenChecker(userToken, ["TEACHER"],
    [TeacherRoleEnum.MASTER, TeacherRoleEnum.ADMIN, TeacherRoleEnum.TEACHER]);
  
  if (!valid.status) return valid;
  
  // constraints
  const zsearchParams = z.object({
    templateType: z.string().optional(),
    title: z.string().optional(),
    page: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1)),
    limit: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1))
  })
  .strict();

  const parsed_s = zsearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  if (!parsed_s.success) return { status: false, data: parsed_s.error.message }

  return { status: true, data: parsed_s.data}
  
}
