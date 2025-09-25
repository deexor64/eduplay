import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';

export default async function createProgressService(data: any): 
Promise<{ status: boolean, data: any }> {

  const student = await prisma.student.findUnique({
    where: {
      userID: data.userPermissions.uid,
    },
    select: {
      studentID: true,
    }
  });

  // Check if student already has progress for this activity
  const existingProgress = await prisma.progress.findFirst({
    where: {
      progressFor: student?.studentID,
      progressOf: data.activityID,
    },
  });

  if (existingProgress) return { status: false, 
    data: "Sorry kid, You cannot save your work twice. but you're free to try without saving. Just head back to activites and find the same actiivity. You will find your progress there..." };
  
  const progress = await prisma.progress.create({
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
  
  return { status: true, data: "Great, your work is saved" };
  
}
