import { ResType } from '@/lib/utils/types';
import { prisma } from '@/lib/prisma';

export default async function getActivityService(data: any): 
Promise<{ status: boolean, data: any }> {
  
  const activity = await prisma.activity.findUnique({
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
      isScored: true,
      templateCode: true,
      section: true,
    }
  })
  
  return { status: true, data: activity };
  
}
