import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { UserType } from "@/lib/utils/types";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { JwtPayload } from "jsonwebtoken";

export default function profileValidator(cookies: RequestCookies): { status: boolean, data: any } {
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenChecker(userToken, ["STUDENT"]);
  if (!valid.status) return valid;

  const userID = (valid.data as JwtPayload).userID as string;
  return { status: true, data: { userID: userID }};
}
