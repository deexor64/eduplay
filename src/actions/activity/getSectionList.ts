"use server";

import { prisma } from "@/lib/prisma";
import { Subject } from "@prisma/client";
import userPermissionCheck from "@/lib/utils/userPermissionCheck";

export async function getSectionList(token: string): 
Promise<Array<{grade: number, subject: Subject, section: string}>> {

  const userPermissions = await userPermissionCheck(token, ["TEACHER"], ["ADMIN", "TEACHER"], ["ACTIVE"]);
  if (!userPermissions.status) throw new Error("Unauthorized");

  const sectionList = await prisma.activity.findMany({
    select: {
      subject: true,
      grade: true,
      section: true,
    },
    distinct: ["subject", "grade", "section"],
  });

  return sectionList;
 
} 
