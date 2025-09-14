import { z } from "zod";
import { TeacherRole, UserStatus } from "@prisma/client";
import userPermissionCheck from "@/lib/utils/userPermissionCheck";

export default async function usersValidator(headers: Headers, searchParams: URLSearchParams): 
Promise<{ status: boolean; data: any; }> {

  // Verify session
  const token = headers.get("authorization")?.split("Bearer ")[1];
  const userPermission = await userPermissionCheck(token, ["TEACHER"], ["TEACHER", "ADMIN"], ["ACTIVE"]);
  if (!userPermission.status) return userPermission;

  // Input validation
  const zSearchParams = z.object({
    userListType: z.enum(["teacher", "student"]),
    indexNumber: z.string().optional(),
    fullName: z.string().optional(),
    grade: z.enum(["1", "2", "3", "4", "5"]).transform((grade) => parseInt(grade)).optional(),
    role: z.nativeEnum(TeacherRole).optional(),
    email: z.string().optional(),
    verified: z.enum(["Verified", "Unverified"]).optional(),
    status: z.nativeEnum(UserStatus).optional(),
    page: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1)),
    limit: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1))
  })
  .strict();
  
  const parsed_s = zSearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  if (!parsed_s.success) return { status: false, data: parsed_s.error.message }

  return { status: true, data: {...parsed_s.data, userPermission} }
  
}
