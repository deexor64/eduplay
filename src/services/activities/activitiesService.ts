import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';

export default async function activitiesService(data: any): Promise<ResType> {
  
  let whereActivities: any = {
    topic: data.topic ? { contains: data.topic, mode: 'insensitive' } : undefined,
    title: data.title ? { contains: data.title, mode: 'insensitive' } : undefined,
    status: data.status,
    subject: data.subject,
    grade: data.grade,
    difficulty: data.difficulty,
  };

  if (data.userType === "STUDENT") {
    // status: Only published actiivities are shown
    whereActivities.status = "PUBLISHED";
  }
  
  let selectActivities: any = {
    activityID: true,
    topic: true,
    title: true,
    status: true,
    subject: true,
    grade: true,
    difficulty: true,
    isScored: true,
  }

  if (data.userType === "STUDENT") {
    // status: Status is not shown to students
    delete selectActivities.status;
  }

  let activities = await prisma.activity.findMany({
    where: whereActivities,
    select: selectActivities,
    skip: (data.page - 1) * data.limit,
    take: data.limit,
  });

  // For students include a "Completed" filed
  if (data.userType === "STUDENT") {

    // Find studentID from userID
    const student = await prisma.student.findUnique({
      where: { userID: data.userID },
      select: { studentID: true }
    });

    const studentID = student?.studentID;

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
    
    // Filter if filter is set
    if (data.completed === "Completed") {
      activities = activities.filter((a: any) => a.completed);
    } else if (data.completed === "Not Completed") {
      activities = activities.filter((a: any) => !a.completed);
    }

  }
  
  // Total records
  const total = await prisma.activity.count({
    where: whereActivities,
  })
  
  return { status: true, resDataType: "success", data: { activities, total } };
  
}
