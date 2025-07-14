import { ResType } from '@/lib/utils/types';
import { prisma } from '@/lib/prisma';

export default async function getActivityService(data: any): Promise<ResType> {
  
  const existing = await prisma.activity.findUnique({
    where: {
      activityID: data.activityID,
    },
    select: {
      title: true,
      instructions: true,
      activityData: true,
      status: true,
      subject: true,
      grade: true,
      difficulty: true,
      timeLimit: true,
      isGraded: true,
    }
  })
  
  return { status: true, resDataType: "success", data: existing };
  
}
