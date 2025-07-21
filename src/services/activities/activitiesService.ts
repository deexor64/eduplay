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

  let activities: any = await prisma.activity.findMany({
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
        progressOf: true,
        progressID: true
      }
    });

    // Create a map from activityID to progressID
    const progressMap: { [key: string]: string } = {};
    progresses.forEach(p => {
      progressMap[String(p.progressOf)] = p.progressID;
    });

    // Add completed attribute and progressID if completed
    activities = activities.map((a: any) => {
      const completed = progressMap[String(a.activityID)] !== undefined;
      return completed
        ? { ...a, completed: true, progressID: progressMap[String(a.activityID)] }
        : { ...a, completed: false };
    });
    
    // filter if filter is set
    if (data.completed === "Completed") {
      activities = activities.filter((a: any) => a.completed);
    } else if (data.completed === "Not Completed") {
      activities = activities.filter((a: any) => !a.completed);
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
