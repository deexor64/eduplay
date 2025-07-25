"use client";

import StudentNavigatorLayout from "@/components/student/StudentNavigatorLayout";
import SubjectBreakdownItem from "@/components/student/progress/SubjectBreakdownItem";
import RecentActivityItem from "@/components/student/progress/RecentActivityItem";
import Achievements from "@/components/student/progress/Achievements";
import { useEffect, useState } from "react";

export default function Progress() {
  
  // Analysed summery form the server
  const [dbData, setDbData] = useState({
    totalCompleted: 0,
    averageScore: 0,
    bestSubject: "-",
    subjectStats: [
      { subject: "-", score: 0 },
      { subject: "-", score: 0 },
      { subject: "-", score: 0 },
    ],
    recent: [
      { title: "-", score:0, maxScore: 0 },
    ],
    achievements: ["-"]
  });

  async function fetchProgress() {

    const url = `/api/progress`;
    const res = await fetch(url);

    const resData = await res.json();
    setDbData(resData.data);

  }

  useEffect(() => { 
    fetchProgress();
  }, []);

  return (
    <StudentNavigatorLayout>
    <div className="p-4 space-y-6">

      {/* Progress summery */}
      <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between shadow-lg border border-blue-200">
        <div className="flex-1 flex flex-col items-center md:items-start mb-4 md:mb-0">
          <div className="text-4xl mb-2">🏆</div>
          <div className="text-lg font-bold text-blue-800">Activities Completed</div>
          <div className="text-2xl text-green-700 font-extrabold">{dbData.totalCompleted}</div>
        </div>
        <div className="flex-1 flex flex-col items-center md:items-start mb-4 md:mb-0">
          <div className="text-4xl mb-2">📈</div>
          <div className="text-lg font-bold text-blue-800">Average Score</div>
          <div className="text-2xl text-purple-700 font-extrabold">{dbData.averageScore}%</div>
        </div>
        <div className="flex-1 flex flex-col items-center md:items-start">
          <div className="text-4xl mb-2">⭐</div>
          <div className="text-lg font-bold text-blue-800">Best Subject</div>
          <div className="text-2xl text-yellow-600 font-extrabold">{dbData.bestSubject}</div>
        </div>
      </div>


      {/* Subject break down */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Subject Breakdown</h2>
        <div className="space-y-4">
          {dbData.subjectStats.map((item) => (
            <SubjectBreakdownItem itemData={item} key={item.subject}/>
          ))}
        </div>
      </div>

      {/* Recent activities */}
      <div className="bg-yellow-50 rounded-2xl p-6 shadow-md border border-yellow-200">
        <h2 className="text-xl font-bold text-yellow-700 mb-4">Recent Activities</h2>
        <ul className="space-y-3">
          {dbData.recent.map((item, idx) => (
            <RecentActivityItem itemData={item} key={idx}/>
          ))}
        </ul>
      </div>

      {/* Achievements */}
      <Achievements data={dbData.achievements} />

    </div>
    </StudentNavigatorLayout>
  );
}
