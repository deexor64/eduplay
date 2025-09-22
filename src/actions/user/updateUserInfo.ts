"use server";

import { prisma } from "@/lib/prisma";
import { TeacherRole, UserType } from "@prisma/client";
import userPermissionCheck from "@/lib/utils/userPermissionCheck";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function updateUserInfo(
  userID: string,
  userType: UserType,
  updateData: {
    email?: string;
    indexNumber?: string;
    role?: TeacherRole;
    grade?: 1 | 2 | 3 | 4 | 5;
  },
  token: string
) {
  const userPermissions = await userPermissionCheck(token, ["TEACHER"], ["ADMIN"], ["ACTIVE"]);
  if (!userPermissions.status) throw new Error("Unauthorized");

  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { userID },
      include: { student: true, teacher: true },
    });
    if (!user) throw new Error("User not found");

    // Prepare updates
    const userUpdate: any = {};
    const studentUpdate: any = {};
    const teacherUpdate: any = {};

    if (userType === "STUDENT") {
      if (updateData.email !== undefined) userUpdate.email = updateData.email;
      if (updateData.grade !== undefined) studentUpdate.grade = updateData.grade;
      if (updateData.indexNumber !== undefined) studentUpdate.indexNumber = updateData.indexNumber;
    } else if (userType === "TEACHER") {
      if (updateData.email !== undefined) userUpdate.email = updateData.email;
      if (updateData.role !== undefined) teacherUpdate.role = updateData.role;
      if (updateData.indexNumber !== undefined) teacherUpdate.indexNumber = updateData.indexNumber;
    }

    // Run DB updates
    if (Object.keys(userUpdate).length > 0) {
      await prisma.user.update({
        where: { userID },
        data: userUpdate,
      });
    }

    if (userType === "STUDENT" && Object.keys(studentUpdate).length > 0) {
      await prisma.student.update({
        where: { userID },
        data: studentUpdate,
      });
    }

    if (userType === "TEACHER" && Object.keys(teacherUpdate).length > 0) {
      await prisma.teacher.update({
        where: { userID },
        data: teacherUpdate,
      });
    }

    // Firebase user update
    const fbUpdate: any = {};
    if (updateData.email) fbUpdate.email = updateData.email;
    if (Object.keys(fbUpdate).length > 0) {
      await adminAuth.updateUser(userID, fbUpdate);
    }

    // Custom claims update
    const fbUser = await adminAuth.getUser(userID);
    const existingClaims = fbUser.customClaims || {};
    const newClaims = { ...existingClaims };
    
    if (userType === "TEACHER") {
      if (updateData.role !== undefined) newClaims.role = updateData.role;
    }
    if (updateData.email !== undefined) {
      newClaims.email = updateData.email;
    }

    await adminAuth.setCustomUserClaims(userID, newClaims);

    return { status: true, message: "User info updated" };
    
  } catch (e: any) {
    throw new Error("Failed to update user");
  }
}
