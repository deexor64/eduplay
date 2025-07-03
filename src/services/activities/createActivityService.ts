import { PrismaClient } from "@prisma/client";
import { ResType, UserType } from '@/lib/utils/types';
import type { IncomingMessage } from "http";
import { generateUniqueID } from "@/lib/utils/generateRandomString";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

const prisma = new PrismaClient();

export default async function createActivityService(data: any): Promise<ResType> {
  
  const existing = await prisma.activity.create({
    data: {
      title: data.title,
      coverImageUrl: data.coverImageUrl,
      description: data.description,
      activityData: data.activityData,
      isGraded: data.options.isGraded,
      timeLimit: data.options.timeLimit,
      template: {
        connect: { templateCode: data.templateCode },
      },
      // teacher: {
      //   connect: { indexNumber: data.indexNumber + "1" }, // temporary
      // }
    },
  })
  
  return { status: true, resDataType: "success", data: "Activity created" };
  
}
