import { z } from "zod";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import userTokenChecker from "../../lib/utils/userTokenChecker";
import { JwtPayload } from "jsonwebtoken";

export default function getProgressValidator(cookies: RequestCookies, slugParam: any):
{ status: boolean, data: any }  {

  // User token validation
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenChecker(userToken, ["STUDENT"]);
  
  const jwtPayload = valid.data as JwtPayload;
  
  // constraints
  const zslugParams = z.object({
    progressID: z.string(),
   })
  .strict();

  const parsed_s = zslugParams.safeParse(slugParam);
  if (!parsed_s.success) return { status: false, data: parsed_s.error.message }

  return { status: true, data: parsed_s.data}
  
}
