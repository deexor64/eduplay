"use server";

import { cookies } from "next/headers";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { prisma } from "@/lib/prisma";
import { TeacherRoleEnum, UserTypeEnum } from "@/lib/utils/types";
import { JwtPayload } from "jsonwebtoken";

// Not completed ......

export async function updateStudentInfo(updateData: {
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

  const userID = (valid.data as JwtPayload).userID as string;

  // Find student and user
  const student = await prisma.user.findUnique({
    where: { userID: userID },
  });

  // Prepare update objects
  const studentUpdate: any = {};

  if (updateData.email !== undefined) studentUpdate.email = updateData.email;
  if (updateData.grade !== undefined) studentUpdate.grade = updateData.grade;
  if (updateData.class !== undefined) studentUpdate.class = updateData.class;

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
  if (updateData.phoneNumber !== undefined) userUpdate.phoneNumber = updateData.phoneNumber;
  if (updateData.dateOfBirth !== undefined) userUpdate.dateOfBirth = updateData.dateOfBirth;

  // Update user
  await prisma.user.update({
    where: { userID: userID },
    data: userUpdate
  });

  return { status: true, message: "Student info updated" };
  
} 