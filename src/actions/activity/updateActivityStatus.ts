"use server";

import { prisma } from "@/lib/prisma";
import { ActivityStatus } from "@prisma/client";
import userPermissionCheck from "@/lib/utils/userPermissionCheck";

export async function updateActivityStatus(activityID: string, status: ActivityStatus, token: string) {

  const userPermissions = await userPermissionCheck(token, ["TEACHER"], ["ADMIN"], ["ACTIVE"]);
  if (!userPermissions.status) throw new Error("Unauthorized");

  try {
    const existing = await prisma.activity.update({
      where: {
        activityID: activityID,
      },
      data: {
        status: status
      }
    })
  } catch(e) {
    throw new Error("Activity not found");
  }
 
} 
