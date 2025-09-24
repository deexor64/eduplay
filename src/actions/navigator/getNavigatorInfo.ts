"use server"

import { prisma } from "@/lib/prisma";
import userPermissionCheck from "@/lib/utils/userPermissionCheck";
import { UserType } from "@prisma/client";

export async function getNavigatorInfo(token: string) {
  
  const userPermissions = await userPermissionCheck(token, ["TEACHER", "STUDENT"], [], ["ACTIVE", "SUSPENDED"]);
  if (!userPermissions.status) throw new Error("Unauthorized");

  const userID = userPermissions.data.uid;
  const userType: UserType = userPermissions.data.userType;

  // Get display picture URL and basic info
  const navigatorInfo = await prisma.user.findUnique({
    where: { userID: userID },
    select: {
      displayPicUrl: true,
      firstName: true,
      lastName: true,
    }
  });
  if (!navigatorInfo) throw new Error("User not found");

  // Compute unread notifications count for this user
  let unreadCount = 0;
  if (userType === "STUDENT") {
    const student = await prisma.student.findUnique({
      where: { userID },
      select: { studentID: true }
    });

    if (student) {
      unreadCount = await prisma.notification.count({
        where: {
          OR: [
            { forStudent: student.studentID },
            { group: "STUDENT" }
          ],
          reads: { none: { userID } }
        }
      });
    }
  } else if (userType === "TEACHER") {
    const teacher = await prisma.teacher.findUnique({
      where: { userID },
      select: { teacherID: true }
    });

    if (teacher) {
      unreadCount = await prisma.notification.count({
        where: {
          OR: [
            { forTeacher: teacher.teacherID },
            { group: "TEACHER" }
          ],
          reads: { none: { userID } }
        }
      });
    }
  }

  return { ...navigatorInfo, unreadCount };
  
}
