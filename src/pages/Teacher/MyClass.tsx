import React, { useState, useEffect } from "react";

type Student = {
  id: string;
  name: string;
  avatar: string;
  progress: number; // percentage from 0 to 100
};

function MyClassPage() {

  const [students, setStudents] = useState<Student[]>([]);

  useEffect(function () {
    var dummyStudents: Student[] = [
      { id: "1", name: "Amina J.", avatar: "/avatars/avatar1.png", progress: 90 },
      { id: "2", name: "Kweku B.", avatar: "/avatars/avatar2.png", progress: 70 },
      { id: "3", name: "Noah C.", avatar: "/avatars/avatar3.png", progress: 55 },
      { id: "4", name: "Fatima D.", avatar: "/avatars/avatar4.png", progress: 30 },
      { id: "5", name: "James E.", avatar: "/avatars/avatar5.png", progress: 10 },
    ];
    setStudents(dummyStudents);
  }, []);

  function getProgressColor(progress: number) {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-400";
    return "bg-red-400";
  }

  return (

    <div className="max-w-6xl mx-auto p-4 pb-14 min-h-full bg-gradient-to-br bg-yellow-100 to-purple-100
      flex flex-col items-center">

      {/* Class Info */}
      <div className="w-4xl bg-white rounded-xl shadow p-6 mb-6">
        <div className="text-2xl font-bold text-blue-800 mb-2">Grade 5 - B</div>
        <div className="text-blue-700 text-sm">
          <span className="mr-4">Total Students: {students.length}</span>
          <span className="mr-4">Completed Activities: 42</span>
          <span className="mr-4">Ongoing Activities: 5</span>
        </div>
      </div>

      {/* Student List - Vertical with Progress */}
      <div className="w-4xl bg-white rounded-xl shadow p-6">
        <div className="text-xl font-semibold text-blue-800 mb-4">Students</div>
        <div className="divide-y divide-blue-100">
          {students.map(function (student) {
            return (
              <div
                key={student.id}
                className="flex items-center justify-between py-3 hover:bg-blue-50 transition"
              >
                <div className="flex items-center">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-12 h-12 rounded-full border border-gray-300 mr-4"
                  />
                  <div className="text-blue-900 font-medium">{student.name}</div>
                </div>
                <div className="w-40">
                  <div className="h-3 rounded-full bg-blue-100">
                    <div
                      className={`h-3 rounded-full ${getProgressColor(student.progress)}`}
                      style={{ width: student.progress + "%" }}
                    ></div>
                  </div>
                  <div className="text-xs text-right text-blue-600 mt-1">
                    {student.progress}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MyClassPage;
