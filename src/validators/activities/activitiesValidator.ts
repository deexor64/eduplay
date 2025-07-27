import { z } from "zod";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { JwtPayload } from "jsonwebtoken";
import { ActivityDifficulty, ActivityStatus, Subject } from "@prisma/client";

export default function activitiesValidator(cookies: RequestCookies, searchParams: URLSearchParams): 
{ status: boolean, data: any } {

  // User token validation
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenChecker(userToken, ["TEACHER", "STUDENT"],
    ["MASTER", "ADMIN", "TEACHER", "DEMONSTRATOR"]);
  if (!valid.status) return valid;

  const jwtPayload = valid.data as JwtPayload;

  // Input constraints
  const zSearchParams = z.object({
    topic: z.string().optional(),
    title: z.string().optional(),
    status: z.enum(Object.values(ActivityStatus) as [string, ...string[]]).optional(),
    subject: z.enum(Object.values(Subject) as [string, ...string[]]).optional(),
    grade: z.enum(["1", "2", "3", "4", "5"]).transform((grade) => parseInt(grade)).optional(),
    difficulty: z.enum(Object.values(ActivityDifficulty) as [string, ...string[]]).optional(),
    completed: z.enum(["Completed", "Not Completed"]).optional(),
    page: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1)),
    limit: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1))
  })
  .strict();

  const parsed_s = zSearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  if (!parsed_s.success) return { status: false, data: parsed_s.error.message };

  return { status: true, data: {...parsed_s.data, ...jwtPayload} };

}
