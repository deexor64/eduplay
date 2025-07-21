import React from "react";

interface AchievementsProps {
  data: string[];
}

// List of achievement badges
export default function Achievements({ data }: AchievementsProps) {
  return (
    <div className="bg-purple-50 rounded-2xl p-6 shadow-md border border-purple-200">
      <h2 className="text-xl font-bold text-purple-700 mb-4">Achievements</h2>
      <div className="flex flex-wrap gap-3">
        {data.map((ach, idx) => (
          <div key={idx} className="flex items-center bg-white rounded-full px-4 py-2 shadow border border-gray-100">
            <span className="text-lg mr-2">🏅</span>
            <span className="font-semibold text-purple-800">{ach}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 