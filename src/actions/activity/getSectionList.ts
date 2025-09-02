"use server";

import { cookies } from "next/headers";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { prisma } from "@/lib/prisma";
import { Subject } from "@prisma/client";

export async function getSectionList(): 
Promise<Array<{subject: Subject, grade: number | null, section: string | null}> | Error> {

  try {

    const cookieStore = await cookies();
    
    const userToken = cookieStore.get("userInfo")?.value;
    const valid = userTokenChecker(userToken, ["TEACHER"], 
      ["MASTER", "ADMIN", "TEACHER"]);

    if (!valid) throw new Error("Unauthorized");

    const sections = await prisma.activity.findMany({
      where: {
        grade: { not: null },
        section: {
          notIn: [""],
        },
      },
      select: {
        subject: true,
        grade: true,
        section: true,
      },
      distinct: ["subject", "grade", "section"],
    });
    
    // Flatten to array of objects
    const sectionList = sections.map(item => {
      return {
        subject: item.subject,
        grade: item.grade,
        section: item.section,
      }
    });

    // return sectionList;
    return {
      subject: "ENGLISH",
      grade: 4,
      section: "3. Essay writing",
    }

  } catch(e) {

    throw new Error("Server error");  
    
  }
 
} 