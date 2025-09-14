"use server";

import { prisma } from "@/lib/prisma";
import userPermissionCheck from "@/lib/utils/userPermissionCheck";

export async function updateStudentInfo(updateData: {
  firstName?: string,
  lastName?: string,
  email?: string,
  grade?: number,
  displayPicUrl?: string,
}, token: string) {
  
  const userPermissions = await userPermissionCheck(token, ["TEACHER"], ["ADMIN"], ["ACTIVE"]);
  if (!userPermissions.status) throw new Error("Unauthorized");

  const userID = userPermissions.data.uid;

  // Find student and user
  const student = await prisma.user.findUnique({
    where: { userID: userID },
  });

  // Prepare update objects
  const studentUpdate: any = {};

  if (updateData.email !== undefined) studentUpdate.email = updateData.email;
  if (updateData.grade !== undefined) studentUpdate.grade = updateData.grade;

  const userUpdate: any = {
    student: {
      update: {
        ...studentUpdate,
      }
    }
  };

  if (Object.keys(studentUpdate).length === 0) delete userUpdate.student;
  if (updateData.firstName !== undefined) userUpdate.firstName = updateData.firstName;
  if (updateData.lastName !== undefined) userUpdate.lastName = updateData.lastName;
  if (updateData.displayPicUrl !== undefined) userUpdate.displayPicUrl = updateData.displayPicUrl;

  // Update user
  await prisma.user.update({
    where: { userID: userID },
    data: userUpdate
  });

  return { status: true, message: "Student info updated" };
  
} 