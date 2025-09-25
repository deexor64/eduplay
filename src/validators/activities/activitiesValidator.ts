import { z } from "zod";
import { ActivityDifficulty, ActivityStatus, Subject } from "@prisma/client";
import userPermissionCheck from "@/lib/utils/userPermissionCheck";

export default async function activitiesValidator(headers: Headers, searchParams: URLSearchParams): 
Promise<{ status: boolean; data: any; }> {
  
  // Verify session
  const token = headers.get("authorization")?.split("Bearer ")[1];
  const userPermissions = await userPermissionCheck(token, ["STUDENT", "TEACHER"], ["ADMIN", "TEACHER", "DEMONSTRATOR"], ["ACTIVE"]);
  if (!userPermissions.status) return userPermissions;

  // Validate
  const zSearchParams = z.object({
    section: z.string().optional(),
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

  return { status: true, data: { ...parsed_s.data, userPermissions: userPermissions.data } };

}
