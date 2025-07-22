import { ResType } from '@/lib/utils/types';
import { prisma } from '@/lib/prisma';

export default async function getProgressService(data: any): Promise<ResType> {
  
  const existing = await prisma.progress.findUnique({
    where: {
      progressID: data.progressID,
    },
    select: {
      baseScore: true,
      maxScore: true,
      summery: true,
      data: true,
      activity: {
        select: {
          title: true,
          instructions: true,
          difficulty: true,
          subject: true,
          grade: true,
          isScored: true,
          status: true,
          templateCode: true,
        }
      }
    }
  })
  
  return { status: true, resDataType: "success", 
    data: {
      score: {
        baseScore: existing?.baseScore,
        maxScore: existing?.maxScore,
        summery: existing?.summery,
      },
      data: existing?.data,
      activity: {
        ...existing?.activity,
        activityData: existing?.data
      },
    } 
  };
  
}
