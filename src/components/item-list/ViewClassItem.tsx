"use client";

import React from "react";

interface ViewClassItemProps {
  itemData: {
    name?: string,
    grade: number,
    classLetter: string,
    teacher: {
      user: {
        fullName: string
      }
    }
  };
}

export default function ViewClassItem(props: ViewClassItemProps) {
  const { itemData } = props;

  return (
    <div
      className="border border-blue-200 bg-white rounded-lg p-4 
        flex items-start gap-4 shadow hover:shadow-lg transition
        cursor-pointer hover:bg-blue-50 justify-between relative mb-0.5 mt-2"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-16 h-16 rounded flex items-center justify-center text-white font-bold text-lg border`}
          style={{ backgroundColor: gradeColor(itemData.grade) }}
        >
        </div>

        <div>
          {/* class name */}
          <div className="text-lg font-semibold text-purple-800"> 
            {`Grade ${itemData.grade} - ${itemData.classLetter} (${itemData.name})`}
          </div>
          <div className="text-sm text-gray-600">
            Teacher: {itemData.teacher.user.fullName}
          </div>
        </div>
      </div>
    </div>
  );
}

function gradeColor(grade: number): string {
  const colors: Record<number, string> = {
    1: "#E57373", // Red
    2: "#64B5F6", // Blue
    3: "#81C784", // Green
    4: "#FFD54F", // Yellow
    5: "#BA68C8", // Purple
  };
  return colors[grade] || "#BDBDBD"; // fallback gray
}
