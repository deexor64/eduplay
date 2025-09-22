import { z } from "zod";
import userPermissionCheck from "@/lib/utils/userPermissionCheck";

export default async function notificationsValidator(headers: Headers):
Promise<{ status: boolean; data: any; }> {
  
  // Verify session
  const token = headers.get("authorization")?.split("Bearer ")[1];
  const userPermissions = await userPermissionCheck(token, ["STUDENT", "TEACHER"], ["DEMONSTRATOR"], ["ACTIVE", "SUSPENDED"]);
  if (!userPermissions.status) return userPermissions;

  return { status: true, data: { userPermissions: userPermissions.data } };
  
} 
