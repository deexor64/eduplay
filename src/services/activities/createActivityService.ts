import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';

export default async function createActivityService(data: any): Promise<ResType> {

  const teacher = await prisma.teacher.findUnique({
    where: {
      userID: data.userID,
    },
    select: {
      teacherID: true,
    }
  });
  
  const existing = await prisma.activity.create({
    data: {
      title: data.title,
      topic: data.topic,
      instructions: data.instructions,
      activityData: data.activityData,
      isScored: data.options.isScored,
      grade: data.options.grade,
      difficulty: data.options.difficulty,
      subject: data.options.subject,
      template: {
        connect: { templateCode: data.templateCode },
      },
      teacher: {
        connect: { teacherID: teacher?.teacherID},
      },      
    },
    select: {
      activityID: true,
    }
  })
  
  return { status: true, resDataType: "success", data: existing.activityID };
  
}
