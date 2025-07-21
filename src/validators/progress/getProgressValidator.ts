import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { JwtPayload } from "jsonwebtoken";

export default function getProgressValidator(cookies: RequestCookies): { status: boolean, data: any } {
  // User token validation
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenChecker(userToken, ["STUDENT", "TEACHER", "PARENT"], ["ADMIN", "MASTER", "TEACHER"]);
  if (!valid.status) return valid;

  const userID = (valid.data as JwtPayload).userID as string;
  return { status: true, data: { userID: userID } };
}
