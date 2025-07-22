import { prisma } from '@/lib/prisma';
import { ResType, UserType } from '@/lib/utils/types';

export default async function createProgressService(data: any): Promise<ResType> {

  const student = await prisma.student.findUnique({
    where: {
      userID: data.userID,
    },
    select: {
      studentID: true,
    }
  });
  
  const existing = await prisma.progress.create({
    data: {
      baseScore: data.score.baseScore,
      maxScore: data.score.maxScore,
      summery: data.score.summery,
      data: data.data,
      student: {
        connect: { studentID: student?.studentID},
      },
      activity: {
        connect: { activityID: data.activityID},
      },
    },
  })
  
  return { status: true, resDataType: "success", data: "Progress saved" };
  
}
