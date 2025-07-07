import { z, ZodNumber } from "zod";
import { ResType, UserPermission } from "@/lib/utils/types";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import userTokenValidator from "../shared/userTokenValidator";

export default function classesValidator(cookies: RequestCookies, searchParams: URLSearchParams): 
{ status: boolean, data: any } {
  
  // User token validation
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenValidator(userToken, ["TEACHER", "STUDENT"], UserPermission.MAX);
  
  if (!valid.status) return valid;
  
  // constraints
  const zsearchParams = z.object({
    grade: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1)).optional(),
    classLetter: z.string().optional(),
    teacherName: z.string().optional(),
    page: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1)),
    limit: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1))
  })
  .strict();
  
  const parsed_s = zsearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  if (!parsed_s.success) return { status: false, data: parsed_s.error.message };
  
  return { status: true, data: parsed_s.data };
  
}
