"use server";

import { cookies } from "next/headers";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { prisma } from "@/lib/prisma";
import { Subject } from "@prisma/client";

export async function getTopicList(): 
Promise<Array<{subject: Subject, grade: number | null, topic: string | null}> | Error> {

  try {

    const cookieStore = await cookies();
    
    const userToken = cookieStore.get("userInfo")?.value;
    const valid = userTokenChecker(userToken, ["TEACHER"], 
      ["MASTER", "ADMIN", "TEACHER"]);

    if (!valid) throw new Error("Unauthorized");

    const topics = await prisma.activity.findMany({
      where: {
        grade: { not: null },
        topic: {
          not: null,
          notIn: [""],
        },
      },
      select: {
        subject: true,
        grade: true,
        topic: true,
      },
      distinct: ["subject", "grade", "topic"],
    });
    
    // Flatten to array of objects
    const topicList = topics.map(item => {
      return {
        subject: item.subject,
        grade: item.grade,
        topic: item.topic,
      }
    });

    return topicList;

  } catch(e) {

    throw new Error("Server error");  
    
  }
 
} 