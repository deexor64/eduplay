import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';

export default async function activitiesService(data: any): Promise<ResType> {
  
  let whereClause: any = { // undefined values are ignored in where clause
    title: data.title,
    status: data.status,
    subject: data.subject,
    grade: data.grade,
    difficulty: data.difficulty,
  };
  
  let selectClause: any = {
    activityID: true,
    title: true,
    status: true,
    subject: true,
    grade: true,
    difficulty: true,
    timeLimit: true,
    isGraded: true,
  }

  const existing = {
    activities: await prisma.activity.findMany({
      where: whereClause,
      select: selectClause,
      skip: (data.page - 1) * data.limit,
      take: data.limit,
    }),
    total: await prisma.activity.count({
      where: whereClause,
    })
  }
  
  return { status: true, resDataType: "success", data: existing };
  
}
