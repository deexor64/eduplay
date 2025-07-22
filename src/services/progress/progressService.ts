import { prisma } from '@/lib/prisma';
import { Achievements, AchievementsEnum, ResType } from '@/lib/utils/types';

export default async function progressService(data: any): Promise<ResType> {

  // In here the student data is analysed and a comprehensive 
  // progress analysis is generated

  // Find the studentID for the user
  const student = await prisma.student.findUnique({
    where: { userID: data.userID },
    select: { studentID: true, grade: true }
  });
  if (!student) {
    return { status: false, resDataType: "error", data: "Student not found" };
  }

  // Fetch all progress records for this student
  const progresses = await prisma.progress.findMany({
    where: { progressFor: student.studentID },
    include: { activity: true }
  });

  // Aggregate data
  const totalCompleted = progresses.length;
  const totalScore = progresses.reduce((sum, p) => sum + (p.baseScore || 0), 0);
  const totalMaxScore = progresses.reduce((sum, p) => sum + (p.maxScore || 0), 0);
  const averageScore = totalCompleted > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;

  // Subject breakdown
  const subjectMap: { [subject: string]: { total: number, score: number } } = {};
  progresses.forEach((p) => {
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
    .sort((a, b) => (b.activity.updatedAt as any) - (a.activity.updatedAt as any))
    .slice(0, 5)
    .map((p) => ({
      title: p.activity.title,
      score: p.baseScore,
      maxScore: p.maxScore
    }));

  // Achievements
  const achievements: Array<Achievements> = [];
  // Just being a student in the site
  achievements.push(AchievementsEnum.STUDENT);
  // Complete the first activity
  if (totalCompleted > 0) achievements.push(AchievementsEnum.FIRST_ACTIVITY);
  // Recent activity within 2 weeks
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  const hasRecent = progresses.some(p => p.createdAt && new Date(p.createdAt) >= twoWeeksAgo);
  if (hasRecent) achievements.push(AchievementsEnum.CONSISTENT_LEARNER);
  // Get marks greater than 90 for any subject
  if (subjectStats.some(s => s.subject === "MATHEMATICS" && s.score >= 90)) achievements.push(AchievementsEnum.MATH_WHIZ);
  if (subjectStats.some(s => s.subject === "SCIENCE" && s.score >= 90)) achievements.push(AchievementsEnum.SCIENCE_WHIZ);
  if (subjectStats.some(s => s.subject === "ENGLISH" && s.score >= 90)) achievements.push(AchievementsEnum.ENGLISH_WHIZ);

  return {
    status: true,
    resDataType: "success",
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
