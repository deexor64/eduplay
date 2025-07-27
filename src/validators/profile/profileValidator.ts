import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { JwtPayload } from "jsonwebtoken";
import { z } from "zod";

export default function profileValidator(cookies: RequestCookies, searchParams: URLSearchParams):
 { status: boolean, data: any } {
  
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenChecker(userToken, ["STUDENT", "TEACHER", "PARENT"],
    ["ADMIN", "MASTER", "TEACHER"]);
  if (!valid.status) return valid;

  const jwtPayload = valid.data as JwtPayload;

  // constraints
  const zsearchParams = z.object({
    userID: z.string().optional(),
  })
  .strict();

  const parsed_s = zsearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  if (!parsed_s.success) return { status: false, data: parsed_s.error.message }
  
  // The search params userID has a conflict with the jwtPayload userID
  // So the search param userID is passed as userID_s
  return { status: true, data: {...parsed_s.data, ...jwtPayload, userID_s: parsed_s.data.userID} };

}
