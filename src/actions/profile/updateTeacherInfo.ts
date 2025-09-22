"use server";

import { adminAuth } from "@/lib/firebaseAdmin";
import { prisma } from "@/lib/prisma";
import userPermissionCheck from "@/lib/utils/userPermissionCheck";

export async function updateTeacherInfo(updateData: {
  firstName?: string,
  lastName?: string,
  email?: string,
  displayPicUrl?: string,
}, token: string) {
  
  const userPermissions = await userPermissionCheck(token, ["TEACHER"], [], ["ACTIVE"]);
  if (!userPermissions.status) throw new Error("Unauthorized");

  const userID = userPermissions.data.uid;

  // Find teacher and user
  const user = await prisma.user.findUnique({
    where: { userID: userID },
    include: { teacher: true }
  });
  if (!user) return { status: false, message: "User not found" };
  
  // Email update (handles separately and only for admins)
  if (updateData.email && userPermissions.data.role === "ADMIN") {
    await prisma.user.update({
      where: { userID: userID },
      data: { email: updateData.email }
    });
    return { status: true, message: "Teacher info updated" };
  }
  
  // Firebase update
  const fbUser = await adminAuth.getUser(userID);
  const fbUserUpdate: any = {};
  
  if (updateData.firstName !== undefined || updateData.lastName !== undefined)
    fbUserUpdate.displayName = `${updateData.firstName || user.firstName || fbUser.displayName!.split(" ")[0]} ${updateData.lastName || user.lastName || fbUser.displayName!.split(" ")[1]}`;
  
  await adminAuth.updateUser(userID, fbUserUpdate);

  // DB update
  const userUpdate: any = {};

  if (updateData.firstName !== undefined) userUpdate.firstName = updateData.firstName;
  if (updateData.lastName !== undefined) userUpdate.lastName = updateData.lastName;
  if (updateData.displayPicUrl !== undefined) userUpdate.displayPicUrl = updateData.displayPicUrl;

  await prisma.user.update({
    where: { userID: userID },
    data: userUpdate
  });

  return { status: true, message: "Teacher info updated" };
  
}
