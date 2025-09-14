import { z } from "zod";
import userPermissionCheck from "@/lib/utils/userPermissionCheck";

export default async function getProgressValidator(headers: Headers, slugParam: any):
Promise<{ status: boolean; data: any; }> {

  // Verify session
  const token = headers.get("authorization")?.split("Bearer ")[1];
  const userPermissions = await userPermissionCheck(token, ["STUDENT"], [], ["ACTIVE"]);
  if (!userPermissions.status) return userPermissions;
  
  // constraints
  const zslugParams = z.object({
    progressID: z.string(),
   })
  .strict();

  const parsed_s = zslugParams.safeParse(slugParam);
  if (!parsed_s.success) return { status: false, data: parsed_s.error.message }

  return { status: true, data: parsed_s.data}
  
}
