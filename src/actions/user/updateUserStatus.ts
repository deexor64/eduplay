"use server";

import { prisma } from "@/lib/prisma";
import { UserStatus } from "@prisma/client";
import userPermissionCheck from "@/lib/utils/userPermissionCheck";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function updateUserStatus(userID: string, status: UserStatus, token: string) {

  const userPermissions = await userPermissionCheck(token, ["TEACHER"], ["ADMIN"], ["ACTIVE"]);
  if (!userPermissions.status) throw new Error("Unauthorized");

  try {
    
    const user = await adminAuth.getUser(userID);
    const existingClaims = user.customClaims;
    
    await adminAuth.setCustomUserClaims(userID, {
      ...existingClaims,
      status: status
    });
    
    const existing = await prisma.user.update({
      where: {
        userID: userID ,
      },
      data: {
        status: status
      }
    })
    
  } catch(e) {
    throw new Error("User not found");
  }
 
}
