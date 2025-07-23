"use server";

import { cookies } from "next/headers";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { prisma } from "@/lib/prisma";
import { TeacherRoleEnum, UserTypeEnum } from "@/lib/utils/types";

// Not completed ......

export async function updateStudentInfo(studentID: string, updateData: {
  firstName?: string,
  lastName?: string,
  phoneNumber?: string,
  dateOfBirth?: string,
  email?: string,
  grade?: number,
  class?: string,
}) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userInfo")?.value;
  // Allow student to update own info, or teacher/admin
  const valid = userTokenChecker(userToken, ["STUDENT", "TEACHER"], [TeacherRoleEnum.MASTER, TeacherRoleEnum.ADMIN]);
  if (!valid) throw new Error("Unauthorized");

  // Find student and user
  const student = await prisma.student.findUnique({
    where: { studentID },
    include: { user: true }
  });
  if (!student) throw new Error("Student not found");

  // Prepare update objects
  const userUpdate: any = {};
  if (updateData.firstName !== undefined) userUpdate.firstName = updateData.firstName;
  if (updateData.lastName !== undefined) userUpdate.lastName = updateData.lastName;
  if (updateData.phoneNumber !== undefined) userUpdate.phoneNumber = updateData.phoneNumber;
  if (updateData.dateOfBirth !== undefined) userUpdate.dateOfBirth = updateData.dateOfBirth;

  const studentUpdate: any = {};
  if (updateData.email !== undefined) studentUpdate.email = updateData.email;
  if (updateData.grade !== undefined) studentUpdate.grade = updateData.grade;
  if (updateData.class !== undefined) studentUpdate.class = updateData.class;

  // Update user
  if (Object.keys(userUpdate).length > 0) {
    await prisma.user.update({
      where: { userID: student.userID },
      data: userUpdate
    });
  }
  // Update student
  if (Object.keys(studentUpdate).length > 0) {
    await prisma.student.update({
      where: { studentID },
      data: studentUpdate
    });
  }

  return { status: true, message: "Student info updated" };
} 