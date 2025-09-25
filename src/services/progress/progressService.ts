import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';

export default async function progressService(data: any): 
Promise<{ status: boolean, data: any }> {

  // Find student by userID if userType is student
  // Progress which is relevent to student will be generated
  const student = (data.userPermissions.userType === "STUDENT" ? await prisma.student.findUnique({
    where: { userID: data.userPermissions.uid },
    select: { studentID: true, grade: true }
  }) : null);

  // Fetch all progress records for this student
  let progresses: any = {};

  if (data.userPermissions.userType === "STUDENT" && student) {
    progresses = await prisma.progress.findMany({
      where: { progressFor: student.studentID },
      include: { activity: true }
    });
  } else {
    progresses = await prisma.progress.findMany({
      where: { progressFor: data.studentID },
      include: { activity: true }
    });
  }

  // Aggregate data
  const totalCompleted = progresses.length;
  const totalScore = progresses.reduce((sum: any, p: any) => sum + (p.baseScore || 0), 0);
  const totalMaxScore = progresses.reduce((sum: any, p: any) => sum + (p.maxScore || 0), 0);
  const averageScore = totalCompleted > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;

  // Subject breakdown
  const subjectMap: { [subject: string]: { total: number, score: number } } = {};
  progresses.forEach((p: any) => {
    const subject = p.activity.subject;
    if (!subjectMap[subject]) subjectMap[subject] = { total: 0, score: 0 };
    subjectMap[subject].total += 1;
    subjectMap[subject].score += p.baseScore || 0;
  });
  const subjectStats = Object.entries(subjectMap).map(([subject, { total, score }]) => ({
    subject,
    score: total > 0 ? Math.round(score / total) : 0
  }));
  const bestSubject = subjectStats.reduce((best, curr) => curr.score > (best?.score || 0) ? curr : best, null as any)?.subject || "-";

  // Recent activities (last 5)
  const recent = progresses
    .sort((a: any, b: any) => (b.activity.updatedAt as any) - (a.activity.updatedAt as any))
    .slice(0, 5)
    .map((p: any) => ({
      title: p.activity.title,
      score: p.baseScore,
      maxScore: p.maxScore
    }));

  // Achievements
  type Achievements = "Student" | "First Activity" | "Consistent Learner" | "Math Whiz" | "Science Whiz" | "English Whiz";
  const achievements: Array<Achievements> = [];
  // Just being a student in the site
  achievements.push("Student");
  // Complete the first activity
  if (totalCompleted > 0) achievements.push("First Activity");
  // Recent activity within 2 weeks
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  const hasRecent = progresses.some((p: any) => p.createdAt && new Date(p.createdAt) >= twoWeeksAgo);
  if (hasRecent) achievements.push("Consistent Learner");
  // Get marks greater than 90 for any subject
  if (subjectStats.some(s => s.subject === "MATHEMATICS" && s.score >= 90)) achievements.push("Math Whiz");
  if (subjectStats.some(s => s.subject === "SCIENCE" && s.score >= 90)) achievements.push("Science Whiz");
  if (subjectStats.some(s => s.subject === "ENGLISH" && s.score >= 90)) achievements.push("English Whiz");

  return {
    status: true,
    data: {
      totalCompleted,
      averageScore,
      bestSubject,
      subjectStats,
      recent,
      achievements
    }
  };
}
