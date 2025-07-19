"use server";

import { cookies } from "next/headers";
import { TeacherRoleEnum } from "@/lib/utils/types";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { prisma } from "@/lib/prisma";

const userListHandler: any = {
  teacher: prisma.teacher,
  parent: prisma.parent,
  student: prisma.student,
} as const;

export async function deleteUser(userID: string) {

  const cookieStore = await cookies();
  
  const userToken = cookieStore.get("userInfo")?.value;
  const valid = userTokenChecker(userToken, ["TEACHER"], 
    [TeacherRoleEnum.MASTER, TeacherRoleEnum.ADMIN]);

  if (!valid) throw new Error("Unauthorized");

  try {
    const existing = await userListHandler.teacher.delete({
      where: {
        user: { userID: userID },
      }
    })
  } catch(e) {
    throw new Error("User not found");
  }
 
}
