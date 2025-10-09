"use client";

import SubjectBreakdownItem from "@/components/student/progress/SubjectBreakdownItem";
import RecentActivityItem from "@/components/student/progress/RecentActivityItem";
import Achievements from "@/components/student/progress/Achievements";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import { UserStatus, UserType } from "@prisma/client";
import Unauthorized from "@/components/shared/loading/Unauthorized";

export default function Progress() {
  
  const { userID, email, userType, role, status, user } = useContext(AuthContext);
  if (userType != UserType.STUDENT || status != UserStatus.ACTIVE) {
    return <Unauthorized />;
  }
  
  // Analysed summery form the server
  const [dbData, setDbData] = useState<{
    totalCompleted: number,
    averageScore: number,
    bestSubject: string,
    subjectStats: [
      { subject: string, score: number },
      { subject: string, score: number },
      { subject: string, score: number },
    ],
    recent: [
      { title: string, score: number, maxScore: number },
    ],
    achievements: string[]
  } | null>(null);

  async function fetchProgress() {

    const url = `/api/progress`;
    const token = await user?.getIdToken();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    const resData = await res.json();
    if (!resData.status) {
      console.log(resData.data);
      return;
    }
    setDbData(resData.data);

  }

  useEffect(() => { 
    fetchProgress();
  }, []);

  return (
    <div className="p-4 space-y-6">

      {/* Progress summery */}
      <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between shadow-lg border border-blue-200">
        <div className="flex-1 flex flex-col items-center md:items-start mb-4 md:mb-0">
          <div className="text-4xl mb-2">🏆</div>
          <div className="text-lg font-bold text-blue-800">Activities Completed</div>
          <div className="text-2xl text-green-700 font-extrabold">{dbData ? dbData.totalCompleted : "Loading..."}</div>
        </div>
        <div className="flex-1 flex flex-col items-center md:items-start mb-4 md:mb-0">
          <div className="text-4xl mb-2">📈</div>
          <div className="text-lg font-bold text-blue-800">Average Score</div>
          <div className="text-2xl text-purple-700 font-extrabold">{dbData ? dbData.averageScore : "Loading..."}%</div>
        </div>
        <div className="flex-1 flex flex-col items-center md:items-start">
          <div className="text-4xl mb-2">⭐</div>
          <div className="text-lg font-bold text-blue-800">Best Subject</div>
          <div className="text-2xl text-yellow-600 font-extrabold">{dbData ? dbData.bestSubject : "Loading..."}</div>
        </div>
      </div>

      {/* Subject break down */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Subject Breakdown</h2>
        <div className="space-y-4">
          {
            dbData ? dbData.subjectStats.map((item) => (
              <SubjectBreakdownItem itemData={item} key={item.subject}/>
            )) : "Loading..."
          }
        </div>
      </div>

      {/* Recent activities */}
      <div className="bg-yellow-50 rounded-2xl p-6 shadow-md border border-yellow-200">
        <h2 className="text-xl font-bold text-yellow-700 mb-4">Recent Activities</h2>
        <ul className="space-y-3">
        {
          dbData ? dbData.recent.map((item, idx) => (
            <RecentActivityItem itemData={item} key={idx}/>
          )) : "Loading..."
        }
        </ul>
      </div>

      {/* Achievements */}
      <Achievements data={dbData ? dbData.achievements : ["Loading..."]} />

    </div>
  );
}
