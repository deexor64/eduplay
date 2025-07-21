import React from "react";

interface RecentActivityItemProps {
  itemData: {
    title: string;
    score: number;
    maxScore: number;
  }
}

export default function RecentActivityItem(props: RecentActivityItemProps) {

  const item = props.itemData;

  return (
    <li className="flex items-center justify-between bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100">
      <span className="text-lg">🎲</span>
      <span className="flex-1 ml-3 font-semibold text-gray-800">{item.title}</span>
      <span className="font-bold text-green-700">{item.score} / {item.maxScore}</span>
    </li>
  );
} 