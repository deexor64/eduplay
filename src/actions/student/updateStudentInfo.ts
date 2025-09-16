"use server";

import { adminAuth } from "@/lib/firebaseAdmin";
import { prisma } from "@/lib/prisma";
import userPermissionCheck from "@/lib/utils/userPermissionCheck";

export async function updateStudentInfo(updateData: {
  firstName?: string,
  lastName?: string,
  email?: string,
  displayPicUrl?: string,
}, token: string) {
  
  const userPermissions = await userPermissionCheck(token, ["STUDENT"], [], ["ACTIVE"]);
  if (!userPermissions.status) throw new Error("Unauthorized");

  const userID = userPermissions.data.uid;

  // Find student and user
  const user = await prisma.user.findUnique({
    where: { userID: userID },
  });
  if (!user) return { status: false, message: "User not found" };
  
  // Firebase update
  const fbUser = await adminAuth.getUser(userID);
  const fbUserUpdate: any = {};
  
  if (updateData.firstName !== undefined || updateData.lastName !== undefined)
    fbUserUpdate.displayName = `${updateData.firstName || user.firstName || fbUser.displayName!.split(" ")[0]} ${updateData.lastName || user.lastName || fbUser.displayName!.split(" ")[1]}`;
  
  await adminAuth.updateUser(userID, fbUserUpdate);

  // DB update
  const userUpdate: any = {};

  if (updateData.email !== undefined) userUpdate.email = updateData.email;
  if (updateData.firstName !== undefined) userUpdate.firstName = updateData.firstName;
  if (updateData.lastName !== undefined) userUpdate.lastName = updateData.lastName;
  if (updateData.displayPicUrl !== undefined) userUpdate.displayPicUrl = updateData.displayPicUrl;

  await prisma.user.update({
    where: { userID: userID },
    data: userUpdate
  });

  return { status: true, message: "Student info updated" };
  
} 
