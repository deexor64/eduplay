import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';

export default async function activitiesService(data: any): 
Promise<{ status: boolean, data: any }> {
  
  // Get grade if user is a student
  const student = (data.userPermissions.userType === "STUDENT" ? await prisma.student.findUnique({
    where: { userID: data.userPermissions.uid},
    select: { studentID: true, grade: true }
  }) : null);
  
  let whereActivities: any = {
    section: data.section ? { contains: data.section, mode: 'insensitive' } : undefined,
    title: data.title ? { contains: data.title, mode: 'insensitive' } : undefined,
    status: data.status,
    subject: data.subject,
    grade: data.grade,
    difficulty: data.difficulty,
  };
  
  if (data.userPermissions.userType === "STUDENT" && student) {
    // status: Only published actiivities are shown
    // grade: Only activities for the student's grade or below are shown
    whereActivities.status = "PUBLISHED";
    whereActivities.grade = data.grade ? (data.grade <= student.grade ? data.grade : student.grade) : { lte: student.grade};
  }
  
  let selectActivities: any = {
    activityID: true,
    section: true,
    title: true,
    status: true,
    subject: true,
    grade: true,
    difficulty: true,
    isScored: true,
    createdAt: true,
  }

  if (data.userPermissions.userType === "STUDENT") {
    // status: Status is not shown to students
    delete selectActivities.status;
  }

  let activities = await prisma.activity.findMany({
    where: whereActivities,
    select: selectActivities,
    skip: (data.page - 1) * data.limit,
    take: data.limit,
  });
  
  // Add "new" status atribute to activites if activity is a new one
  const d = new Date(); // 14 days
  const n = new Date();
  d.setDate(n.getDate() - 14);
  
  activities = activities.map((a: any) => {
    const newActivity = a.createdAt >= d;
    return { ...a, newActivity, createdAt: undefined }
  });

  // For students include a "Completed" field
  // ISSUE: Not correctly counting total values with completed attribute
  if (data.userPermissions.userType === "STUDENT") {

    // Find studentID from userID
    const student = await prisma.student.findUnique({
      where: { userID: data.userPermissions.uid },
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
        ? { ...a, newActivity: false, completed: true, progressID: progressMap[String(a.activityID)] }
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
  
  return { status: true, data: { activities, total } };
  
}
