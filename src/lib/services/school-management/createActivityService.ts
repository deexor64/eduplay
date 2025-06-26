import { PrismaClient } from "@prisma/client";
import { ResType, UserType } from '@/lib/utils/types';
import type { IncomingMessage } from "http";
import createActivityValidator from '@/lib/validators/school-management/createActivityValidator';
import { generateUniqueID } from "@/lib/utils/generateRandomString";

const prisma = new PrismaClient();

export default async function createActivityService(searchParams: any, formData: any)
: Promise<ResType> {
  
  // schema valdiation
  const valid = await createActivityValidator(searchParams, formData);
  if (!valid.status) return valid;
  
  // query
  const data = valid.data;
  
  const existing = await prisma.activity.create({
    data: {
      title: data.title,
      coverImageUrl: data.coverImage,
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
