import { z } from "zod";
import userPermissionCheck from "@/lib/utils/userPermissionCheck";

export default async function getActivityValidator(headers: Headers, slugParam: any):
Promise<{ status: boolean; data: any; }> {

  // Verify session
  const token = headers.get("authorization")?.split("Bearer ")[1];
  const userPermissions = await userPermissionCheck(token, ["TEACHER", "STUDENT"], ["ADMIN", "TEACHER"], ["ACTIVE"]);
  if (!userPermissions.status) return userPermissions;

  // constraints
  const zSlugParams = z.object({
    activityID: z.string(),
   })
  .strict();

  const parsed_s = zSlugParams.safeParse(slugParam);
  if (!parsed_s.success) return { status: false, data: parsed_s.error.message }

  return { status: true, data: { ...parsed_s.data, userPermissions: userPermissions.data}}
  
}
