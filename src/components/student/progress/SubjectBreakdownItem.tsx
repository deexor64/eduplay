import React from "react";

interface SubjectBreakdownItemProps {
  itemData: {
    subject: string;
    score: number;
  };
}

export default function SubjectBreakdownItem(props: SubjectBreakdownItemProps) {
  
  const item = props.itemData;

  return (
    <div key={item.subject} className="flex items-center">
      <div className="w-32 font-semibold text-gray-700">{item.subject}</div>
      <div className="flex-1 mx-2 bg-gray-100 rounded-full h-5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-green-400 rounded-full transition-all duration-500"
          style={{ width: `${item.score}%` }}
        />
      </div>
      <div className="w-12 text-right font-bold text-blue-800">{item.score}%</div>
    </div>
  );
}
