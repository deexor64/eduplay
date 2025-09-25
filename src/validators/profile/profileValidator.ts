import { z } from "zod";
import userPermissionCheck from "@/lib/utils/userPermissionCheck";

export default async function profileValidator(headers: Headers, searchParams: URLSearchParams):
 Promise<{ status: boolean; data: any; }> {
  
  // Verify session
  const token = headers.get("authorization")?.split("Bearer ")[1];
  const userPermissions = await userPermissionCheck(token, ["STUDENT", "TEACHER"], [], ["ACTIVE", "SUSPENDED"]);
  if (!userPermissions.status) return userPermissions;

  // Validate
  const zSearchParams = z.object({
    userID: z.string().uuid().optional(),
  })
  .strict();

  const parsed_s = zSearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  if (!parsed_s.success) return { status: false, data: parsed_s.error.message }
  
  return { status: true, data: {...parsed_s.data, userPermissions: userPermissions.data } };

}
