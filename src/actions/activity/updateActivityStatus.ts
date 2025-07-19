"use server";

import { cookies } from "next/headers";
import { TeacherRoleEnum } from "@/lib/utils/types";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { prisma } from "@/lib/prisma";
import { ActivityStatus } from "@prisma/client";

export async function updateActivityStatus(activityID: string, status: ActivityStatus) {

  const cookieStore = await cookies();
  
  const userToken = cookieStore.get("userInfo")?.value;
  const valid = userTokenChecker(userToken, ["TEACHER"], 
    [TeacherRoleEnum.MASTER, TeacherRoleEnum.ADMIN]);

  if (!valid) throw new Error("Unauthorized");

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