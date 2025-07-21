import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';

export default async function activitiesService(data: any): Promise<ResType> {
  
  let whereClause: any = { // undefined values are ignored in where clause
    title: data.title,
    status: (data.userType === "STUDENT" ? "PUBLISHED" : data.status),
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

  if (data.userType === "STUDENT") {
    delete selectClause.status;
  }

  let activities = await prisma.activity.findMany({
    where: whereClause,
    select: selectClause,
    skip: (data.page - 1) * data.limit,
    take: data.limit,
  });

  // For students, always include 'completed' field 
  // if the student has done the activity before
  if (data.userType === "STUDENT") {

    // Find studentID from userID
    const student = await prisma.student.findUnique({
      where: { userID: data.userID },
      select: { studentID: true }
    });
    let studentID = student?.studentID;

    // Get all progress records for this student
    const progresses = await prisma.progress.findMany({
      where: { progressFor: studentID },
      select: { 
        progressOf: true 
      }
    });

    // Add completed attribute
    const completedSet = new Set(progresses.map(p => p.progressOf));
    activities = activities.map(a => ({ ...a, completed: completedSet.has(String(a.activityID)) } as any));
    
    // filter if filter is set
    if (data.completed === "Completed") {
      activities = activities.filter(a => a.completed);
    } else if (data.completed === "Not Completed") {
      activities = activities.filter(a => !a.completed);
    }

  }

  const existing = {
    activities,
    total: await prisma.activity.count({
      where: whereClause,
    })
  }
  
  return { status: true, resDataType: "success", data: existing };
  
}
