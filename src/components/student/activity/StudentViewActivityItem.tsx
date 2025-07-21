// This list item is specially made for viewing lessons
// Attributes are predefined and cannot be changed

"use client";

import { useState } from "react";
import Link from "next/link";

interface StudentViewActivityItemProps {
  itemData: {
    activityID: string;
    title: string;
    status: string;
    subject: string;
    grade: number;
    timeLimit: number;
    isGraded: boolean;
    difficulty: string;
  }
}

export default function StudentViewActivityItem(props: StudentViewActivityItemProps) {
  
  const [showPreview, setShowPreview] = useState(false);
  
  // Generate a fun emoji based on subject
  function getSubjectEmoji(subject: string): string {
    switch(subject.toLowerCase()) {
      case 'math': return '🔢';
      case 'science': return '🔬';
      case 'english': return '📚';
      default: return '📝';
    }
  }

  // Generate difficulty emoji
  function getDifficultyEmoji(difficulty: string): string {
    switch(difficulty.toLowerCase()) {
      case 'easy': return '😊';
      case 'medium': return '🤔';
      case 'hard': return '😰';
      default: return '📝';
    }
  }
  
  return (
    <Link
      href={`/student/activities/${props.itemData.activityID}`}
      target="_blank"
      className="group relative bg-white border-2 border-blue-200 rounded-xl p-4 
        shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer 
        hover:border-purple-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50
        transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header with emoji and title */}
        <div className="flex items-center mb-3">
          <div className="text-4xl mr-3 group-hover:scale-110 transition-transform duration-300">
            {getSubjectEmoji(props.itemData.subject)}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-purple-800 text-base leading-tight group-hover:text-purple-900 transition-colors">
              {props.itemData.title}
            </h3>
          </div>
          {/* Completion status badge - moved to right side */}
          <div className="ml-2">
            {/* TODO: Replace with real completion status from API */}
            <span className="inline-block bg-green-100 text-green-700 text-base font-semibold px-2 py-1 rounded-full">
              Completed
            </span>
          </div>
        </div>

        {/* Attribute badges - arranged horizontally below title */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-base font-medium text-blue-600 flex items-center">
            {getDifficultyEmoji(props.itemData.difficulty)} {props.itemData.difficulty}
          </span>
          <span className="text-base font-medium text-green-600">
            Grade {props.itemData.grade === 0 ? 'All' : props.itemData.grade}
          </span>
          <span className="text-base text-gray-600 font-medium">
            📚 {props.itemData.subject}
          </span>
          {props.itemData.timeLimit > 0 && (
            <span className="text-base bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
              ⏱️ {props.itemData.timeLimit}m
            </span>
          )}
          {props.itemData.isGraded && (
            <span className="text-base bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
              🏆 Scored
            </span>
          )}
        </div>

        {/* Start button */}
        <div className="flex items-center justify-between">
          <div className="text-base text-gray-500 font-medium group-hover:text-gray-700 transition-colors">
            Click to start
          </div>
          <div className="text-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
            🚀
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
    </Link> 
  )
}
