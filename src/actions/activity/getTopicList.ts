"use server";

import { cookies } from "next/headers";
import { Grade, ResType, Subject, TeacherRoleEnum } from "@/lib/utils/types";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { prisma } from "@/lib/prisma";

export async function getTopicList(): Promise<ResType> {

  try {

    const cookieStore = await cookies();
    
    const userToken = cookieStore.get("userInfo")?.value;
    const valid = userTokenChecker(userToken, ["TEACHER"], 
      [TeacherRoleEnum.MASTER, TeacherRoleEnum.ADMIN]);

    if (!valid) return {status: false, resDataType: "error", data: "Unauthorized"};

    const topics = await prisma.activity.findMany({
      select: {
        subject: true,
        grade: true,
        topic: true,
      },
      distinct: ["topic"],
    });

    // Flatten to array of objects
    const topicList = topics.map(item => {
      return {
        subject: item.subject,
        grade: item.grade,
        topic: item.topic,
      }
    });

    return {status: true, resDataType: "data", data: topicList};

  } catch(e) {

    return {status: false, resDataType: "error", data: "Internal server error"};
  
  }
 
} 