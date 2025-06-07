import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import CommonLayout from "../ui/CommonLayout";

type SubjectProgress = {
  subject: string;
  score: number; // percentage
};

type Activity = {
  title: string;
  score: number;
  date: string;
};

type Child = {
  id: string;
  name: string;
  grade: string;
  avatar: string;
  overall: number;
  subjects: SubjectProgress[];
  recentActivities: Activity[];
};

function MyChild() {

  if (useParams().userType != "parent") return;

  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string>("");

  useEffect(function () {
    const dummyData: Child[] = [
      {
        id: "1",
        name: "Aaliyah",
        grade: "Grade 3 - A",
        avatar: "/avatars/avatar6.png",
        overall: 88,
        subjects: [
          { subject: "Math", score: 92 },
          { subject: "English", score: 84 },
          { subject: "Science", score: 78 },
        ],
        recentActivities: [
          { title: "Math Quiz 3", score: 90, date: "2025-04-28" },
          { title: "Reading Comprehension", score: 85, date: "2025-04-24" },
          { title: "Science Lab", score: 70, date: "2025-04-21" },
        ],
      },
      {
        id: "2",
        name: "Musa",
        grade: "Grade 1 - C",
        avatar: "/avatars/avatar7.png",
        overall: 72,
        subjects: [
          { subject: "Math", score: 60 },
          { subject: "English", score: 75 },
          { subject: "Art", score: 80 },
        ],
        recentActivities: [
          { title: "Math Basics", score: 58, date: "2025-04-25" },
          { title: "Coloring Task", score: 90, date: "2025-04-20" },
        ],
      },
    ];

    setChildren(dummyData);
    setSelectedChildId(dummyData[0].id);
  }, []);

  const selectedChild = children.find(function (c) {
    return c.id === selectedChildId;
  });

  return (
    <CommonLayout>

      <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-purple-100 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">

          <div className="text-2xl font-bold text-blue-900 mb-4">My Children</div>

          {/* Child Selection */}
          <div className="flex space-x-4 mb-6">
            {children.map(function (child) {
              return (
                <button
                  key={child.id}
                  onClick={function () { setSelectedChildId(child.id); }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${selectedChildId === child.id ? "border-blue-500 bg-blue-100" : "border-gray-300"
                    }`}
                >
                  <img src={child.avatar} className="w-10 h-10 rounded-full" />
                  <span className="text-blue-900 font-medium">{child.name}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Child Report */}
          {selectedChild && (
            <div>
              <div className="mb-4">
                <div className="text-xl text-blue-800 font-semibold mb-1">{selectedChild.name}</div>
                <div className="text-sm text-blue-600">{selectedChild.grade}</div>
              </div>

              {/* Overall Progress */}
              <div className="mb-6">
                <label className="text-sm text-blue-700">Overall Progress</label>
                <div className="h-4 bg-blue-100 rounded-full">
                  <div
                    className="h-4 rounded-full bg-green-500"
                    style={{ width: selectedChild.overall + "%" }}
                  ></div>
                </div>
                <div className="text-sm text-right text-blue-700 mt-1">{selectedChild.overall}%</div>
              </div>

              {/* Subject Breakdown */}
              <div className="mb-6">
                <div className="text-lg font-semibold text-blue-800 mb-2">Subject Progress</div>
                <div className="space-y-2">
                  {selectedChild.subjects.map(function (s, index) {
                    return (
                      <div key={index}>
                        <div className="text-sm text-blue-700 mb-1">{s.subject}</div>
                        <div className="h-3 bg-blue-100 rounded-full">
                          <div
                            className={`h-3 rounded-full ${s.score >= 80 ? "bg-green-500" : s.score >= 50 ? "bg-yellow-400" : "bg-red-400"
                              }`}
                            style={{ width: s.score + "%" }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activities */}
              <div>
                <div className="text-lg font-semibold text-blue-800 mb-2">Recent Activities</div>
                <div className="space-y-2">
                  {selectedChild.recentActivities.map(function (a, index) {
                    return (
                      <div
                        key={index}
                        className="p-3 border rounded-lg bg-blue-50 text-sm flex justify-between items-center"
                      >
                        <div>
                          <div className="font-medium text-blue-900">{a.title}</div>
                          <div className="text-blue-700 text-xs">{a.date}</div>
                        </div>
                        <div className="font-bold text-blue-800">{a.score}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </CommonLayout>

  );
}

export default MyChild;
