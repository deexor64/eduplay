import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';

export default async function curriculumService(data: any): Promise<ResType> {
  
  // Find student by userID if userType is student
  // Curriculum which is relevent to student will be generated
  const student = (data.userType === "STUDENT" ? await prisma.student.findUnique({
    where: { userID: data.userID },
    select: { studentID: true, grade: true }
  }) : null);
  
  let whereActivities: any = {
    // topic: Any activity containing topic, is a part of curriculum
    topic: { not: null },
  }
  
  if (data.userType === "STUDENT" && student) {
    // grade: Only activities for the student's grade
    // status: Only published activities
    whereActivities.grade = student.grade as number;
    whereActivities.status = "PUBLISHED";
  } else if (data.userType === "TEACHER") {
    // grade: Only one grade is fetched at a time
    whereActivities.grade = data.gradeListType;
  }

  let selectActivities: any = {
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
    // status: Not needed for student
    delete selectActivities.status;
  }

  let activities = await prisma.activity.findMany({
    where: whereActivities,
    select: selectActivities,
  });

  if (data.userType === "STUDENT" && student) {

    const studentID = student.studentID;

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

  }
  
  // Group activities by subject and topic
  const groupedActivities: any = {};

  activities.forEach((a: any) => {
    if (!groupedActivities[a.subject]) groupedActivities[a.subject] = {};
    if (!groupedActivities[a.subject][a.topic]) groupedActivities[a.subject][a.topic] = [];
    groupedActivities[a.subject][a.topic].push(a);
  });

  return { status: true, resDataType: "success", data: groupedActivities };
  
}
