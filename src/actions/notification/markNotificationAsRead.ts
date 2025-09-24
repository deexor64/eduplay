"use server";

import { prisma } from "@/lib/prisma";
import userPermissionCheck from "@/lib/utils/userPermissionCheck";
import { UserType } from "@prisma/client";

export async function markNotificationAsRead(notificationID: string, token: string) {
  
  const userPermissions = await userPermissionCheck(token, ["STUDENT", "TEACHER"], [], ["ACTIVE", "SUSPENDED"]);
  if (!userPermissions.status) throw new Error("Unauthorized");

  const { uid, userType } = userPermissions.data as { uid: string; userType: UserType };

  const user = await prisma.user.findUnique({
    where: { userID: uid },
    select: {
      userID: true,
      teacher: { select: { teacherID: true } },
      student: { select: { studentID: true } },
    },
  });
  if (!user) throw new Error("User not found");

  const notification = await prisma.notification.findUnique({
    where: { notificationID },
    select: {
      notificationID: true,
      forTeacher: true,
      forStudent: true,
      group: true,
    },
  });

  if (!notification) throw new Error("Notification not found");

  // Ownership / visibility check (minimal but safe)
  let canSee = false;
  if (userType === "TEACHER") {
    const teacherID = user.teacher?.teacherID;
    canSee = Boolean(
      (teacherID && notification.forTeacher === teacherID) || notification.group === UserType.TEACHER
    );
  } else if (userType === "STUDENT") {
    const studentID = user.student?.studentID;
    canSee = Boolean(
      (studentID && notification.forStudent === studentID) || notification.group === UserType.STUDENT
    );
  }

  if (!canSee) throw new Error("Forbidden");

  // Idempotent create
  await prisma.notificationRead.upsert({
    where: {
      notificationID_userID: {
        notificationID,
        userID: uid,
      },
    },
    update: {},
    create: {
      notificationID,
      userID: uid,
    },
  });

  return { status: true, message: "Notification marked as read" };
} 