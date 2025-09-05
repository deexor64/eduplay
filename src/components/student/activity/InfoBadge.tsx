import React from "react";

interface InfoBadgeProps {
  type: "difficulty" | "grade" | "subject" | "scored" | "completed";
  text: string;
  emoji?: string;
}

// Color mapping for each badge type
const badgeColors: Record<string, string> = {
  grade: "bg-blue-100 text-blue-800 border-blue-300",
  subject: "bg-green-100 text-green-800 border-green-300",
  scored: "bg-yellow-100 text-yellow-800 border-yellow-300",
  difficulty: "bg-purple-100 text-purple-800 border-purple-300",
  completed: "bg-gray-200 text-gray-800 border-gray-300",
};

export default function InfoBadge(props: InfoBadgeProps) {
  const { type, text, emoji } = props;
  const colorClass = badgeColors[type] || "bg-gray-100 text-gray-800 border-gray-500";
  return (
    <span className={`flex items-center px-2 py-1 rounded-full font-normal text-sm border-2 ${colorClass}`}>
      {emoji && <span className="mr-1">{emoji}</span>}
      {text}
    </span>
  );
}
