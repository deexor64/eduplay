import { z } from "zod";
import userPermissionCheck from "@/lib/utils/userPermissionCheck";

export default async function getProgressValidator(headers: Headers, slugParam: any):
Promise<{ status: boolean; data: any; }> {

  // Verify session
  const token = headers.get("authorization")?.split("Bearer ")[1];
  const userPermissions = await userPermissionCheck(token, ["STUDENT"], [], ["ACTIVE"]);
  if (!userPermissions.status) return userPermissions;
  
  // Validate
  const zSlugParams = z.object({
    progressID: z.string().uuid(),
   })
  .strict();

  const parsed_s = zSlugParams.safeParse(slugParam);
  if (!parsed_s.success) return { status: false, data: parsed_s.error.message }

  return { status: true, data: parsed_s.data}
  
}
