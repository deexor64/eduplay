"use client";

// This component should be used solely for displaying activity info
// Displayed info is predefined inside the component and cannot be modified

import Link from "next/link";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { ActivityDifficultyEnum, ActivityStatusEnum, SubjectEnum, ActivityGradeEnum } from "@/lib/utils/types";

interface ViewActivityItemProps {
  itemData: {
    activityID: string;
    title: string;
    status?: string;
    subject: string;
    grade: number;
    timeLimit: number;
    isGraded: boolean;
    difficulty: string;
    templateCode: string;
  };
}

export default function ViewActivityItem(props: ViewActivityItemProps) {
  const itemData = props.itemData;

  // Helper functions for label conversion
  function getDifficultyLabel(difficulty: string) {
    switch (difficulty) {
      case ActivityDifficultyEnum.EASY: return "Easy";
      case ActivityDifficultyEnum.MEDIUM: return "Medium";
      case ActivityDifficultyEnum.HARD: return "Hard";
      default: return difficulty;
    }
  }
  function getStatusLabel(status?: string) {
    switch (status) {
      case ActivityStatusEnum.PUBLISHED: return "Published";
      case ActivityStatusEnum.UNPUBLISHED: return "Unpublished";
      case ActivityStatusEnum.DELETED: return "Deleted";
      default: return status || "Unknown";
    }
  }
  function getSubjectLabel(subject: string) {
    switch (subject) {
      case SubjectEnum.MATHEMATICS: return "Mathematics";
      case SubjectEnum.SCIENCE: return "Science";
      case SubjectEnum.ENGLISH: return "English";
      case SubjectEnum.COMMON: return "Common";
      default: return subject;
    }
  }
  function getGradeLabel(grade: number) {
    switch (grade) {
      case 1: return "Grade 1";
      case 2: return "Grade 2";
      case 3: return "Grade 3";
      case 4: return "Grade 4";
      case 5: return "Grade 5";
      default: return `Grade ${grade}`;
    }
  }

  return (
    <div className="border border-blue-200 bg-white rounded-xl p-4 flex items-center shadow hover:shadow-lg transition hover:bg-blue-50 justify-between relative mb-0.5 mt-2 min-h-[96px]" key={itemData.activityID}>
      {/* Activity info */}
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Link
              href={`/template?viewMode=VIEW&templateCode=${itemData.templateCode}&activityID=${itemData.activityID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-purple-800 truncate focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer no-underline hover:text-purple-900"
              style={{ textDecoration: 'none' }}
            >
              {itemData.title}
            </Link>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-mono font-semibold bg-gray-100 text-gray-700 border-gray-300 shadow-sm" title="Activity ID">{itemData.activityID.slice(0, 8)}...</span>
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-xs text-blue-600 font-medium">{getGradeLabel(itemData.grade)}</span>
            <span className="text-xs text-green-700 font-medium">{getSubjectLabel(itemData.subject)}</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-semibold shadow-sm bg-gray-100 text-gray-700 border-gray-300">{getDifficultyLabel(itemData.difficulty)}</span>
            {itemData.isGraded && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-semibold bg-purple-100 text-purple-800 border-purple-300 shadow-sm">Graded</span>
            )}
            {itemData.timeLimit > 0 && (
              <span className="text-xs text-gray-600">{itemData.timeLimit} min</span>
            )}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-semibold shadow-sm bg-blue-100 text-blue-800 border-blue-300">{getStatusLabel(itemData.status)}</span>
          </div>
        </div>
      </div>
      {/* Actions */}
      <div className="flex flex-col items-end gap-2 min-w-[120px] ml-4">
        <ActionButtons onAction={(action) => alert(`Action "${action}" clicked for activity ${itemData.title}`)} />
      </div>
    </div>
  );
}

function ActionButtons({ onAction }: {
  onAction: (action: string) => void;
}) {
  const actions = [
    { label: "View", icon: "faEye", color: "bg-blue-500 hover:bg-blue-600" },
    { label: "Edit", icon: "faEdit", color: "bg-green-500 hover:bg-green-600" },
    { label: "Delete", icon: "faTrash", color: "bg-red-500 hover:bg-red-600" },
  ];

  return (
    <div className="flex gap-2">
      {actions.map(({ label, color }) => (
        <button
          key={label}
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs font-medium shadow-sm transition ${color}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            return onAction(label);
          }}
          type="button"
          title={label}
          aria-label={label}
        >
          {label}
        </button>
      ))}
    </div>
  );
} 