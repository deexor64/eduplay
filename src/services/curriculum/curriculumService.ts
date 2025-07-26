import { prisma } from '@/lib/prisma';
import { Grade, ResType, Subject, SubjectEnum } from '@/lib/utils/types';
import { ActivityDifficulty, ActivityStatus } from '@prisma/client';

export default async function curriculumService(data: any): Promise<ResType> {
  
  // Find student by userID if userType is student
  // Curriculum which is relevent to student will be generated
  const student = (data.userType === "STUDENT" ? await prisma.student.findUnique({
    where: { userID: data.userID },
    select: { studentID: true, grade: true }
  }) : null);
  
  let whereClause: any = {
    // topic: Any activity containing topic, is a part of curriculum
    topic: { not: null },
  }
  
  if (data.userType === "STUDENT" && student) {
    // grade: Only activities for the student's grade
    // status: Only published activities
    whereClause.grade = student.grade as number;
    whereClause.status = "PUBLISHED";
  } else if (data.userType === "TEACHER") {
    // grade: Only one grade is fetched at a time
    whereClause.grade = data.gradeListType;
  }

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
    // status: Not needed for student
    delete selectClause.status;
  }

  // Get all activities for this grade with a topic
  let activities = await prisma.activity.findMany({
    where: whereClause,
    select: selectClause,
  });

  // Get all progress records for this student
  if (data.userType === "STUDENT" && student) {

    const progresses = await prisma.progress.findMany({
      where: { progressFor: student.studentID },
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

  }
  
  // Group activities by subject and topic
  const grouped: {
    [key: string]: {
      [key: string]: Array<{  
        activityID: string,
        title: string,
        status?: ActivityStatus, // only for teacher
        subject: Subject,
        grade: Grade,
        difficulty: ActivityDifficulty,
        isScored: boolean,
        topic: string,
        completed?: boolean, // only for student
        progressID?: string, // only for student
      }> 
    }
  } = {};

  activities.forEach((a: any) => {
    if (!grouped[a.subject]) grouped[a.subject] = {};
    if (!grouped[a.subject][a.topic]) grouped[a.subject][a.topic] = [];
    grouped[a.subject][a.topic].push(a);
  });

  return { status: true, resDataType: "success", data: grouped };
  
}
