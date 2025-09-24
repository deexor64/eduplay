"use server"

import { prisma } from "@/lib/prisma";
import userPermissionCheck from "@/lib/utils/userPermissionCheck";

export async function getNavigatorInfo(token: string) {
  
  const userPermissions = await userPermissionCheck(token, ["TEACHER", "STUDENT"], [], ["ACTIVE", "SUSPENDED"]);
  if (!userPermissions.status) throw new Error("Unauthorized");

  const userID = userPermissions.data.uid;

  // Get display picture URL, Notifiction count
  // TODO: add notifications
  const navigatorInfo = await prisma.user.findUnique({
    where: { userID: userID },
    select: {
      displayPicUrl: true,
      firstName: true,
      lastName: true,
    }
  });
  if (!navigatorInfo) throw new Error("User not found");

  return {...navigatorInfo};
  
}
