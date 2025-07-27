import { ResType } from '@/lib/utils/types';
import { prisma } from '@/lib/prisma';

export default async function getProgressService(data: any): Promise<ResType> {
  
  const progress = await prisma.progress.findUnique({
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
          topic: true,
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

  if (!progress) return { status: false, resDataType: "error", data: "Progress not found" };
  
  return { status: true, resDataType: "success", 
    data: {
      score: {
        baseScore: progress.baseScore,
        maxScore: progress.maxScore,
        summery: progress.summery,
      },
      data: progress.data,
      activity: {
        ...progress.activity,
        activityData: progress?.data
      },
    } 
  };
  
}
