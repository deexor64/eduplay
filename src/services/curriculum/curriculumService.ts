import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';

export default async function curriculumService(data: any): Promise<ResType> {
  
  if (data.userType === "STUDENT") {
    // Find student by userID
    const student = await prisma.student.findUnique({
      where: { userID: data.userID },
      select: { studentID: true, grade: true }
    });
    if (!student) {
      return { status: false, resDataType: "error", data: "Student not found" };
    }
    const studentID = student.studentID;
    const grade = student.grade;

    // Get all activities for this grade with a topic
    let activities = await prisma.activity.findMany({
      where: {
        grade: grade,
        status: "PUBLISHED",
        topic: { not: null },
      },
      select: {
        activityID: true,
        title: true,
        subject: true,
        grade: true,
        difficulty: true,
        isScored: true,
        topic: true,
      },
    });

    // Get all progress records for this student
    const progresses = await prisma.progress.findMany({
      where: { progressFor: studentID },
      select: { progressOf: true, progressID: true }
    });
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

    // Group activities by subject and topic
    const grouped: any = {};
    activities.forEach((a: any) => {
      if (!grouped[a.subject]) grouped[a.subject] = {};
      if (!grouped[a.subject][a.topic]) grouped[a.subject][a.topic] = [];
      grouped[a.subject][a.topic].push(a);
    });

    return { status: true, resDataType: "success", data: grouped };
  }

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
    isScored: true,
    topic: true,
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
