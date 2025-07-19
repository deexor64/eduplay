// This list item is specially made for viewing lessons
// Attributes are predefined and cannot be changed

"use client";

import Image from "next/image";
import ImagePreview from "@/components/shared/popups/ImagePreview";
import { useState } from "react";
import Link from "next/link";
import InfoBadge from "@/components/shared/badges/InfoBadge";

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
      case 'history': return '🏛️';
      case 'art': return '🎨';
      case 'music': return '🎵';
      case 'physical education': return '⚽';
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
          <div className="text-3xl mr-3 group-hover:scale-110 transition-transform duration-300">
            {getSubjectEmoji(props.itemData.subject)}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-purple-800 text-sm leading-tight group-hover:text-purple-900 transition-colors">
              {props.itemData.title}
            </h3>
          </div>
        </div>

        {/* Difficulty and subject info */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-blue-600 flex items-center">
              {getDifficultyEmoji(props.itemData.difficulty)} {props.itemData.difficulty}
            </span>
            <span className="text-xs font-medium text-green-600">
              Grade {props.itemData.grade === 0 ? 'All' : props.itemData.grade}
            </span>
          </div>
          <div className="text-xs text-gray-600 font-medium">
            📚 {props.itemData.subject}
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1 mb-3">
          {props.itemData.timeLimit > 0 && (
            <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
              ⏱️ {props.itemData.timeLimit}m
            </div>
          )}
          {props.itemData.isGraded && (
            <div className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
              🏆 Scored
            </div>
          )}
        </div>

        {/* Start button */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500 font-medium group-hover:text-gray-700 transition-colors">
            Click to start
          </div>
          <div className="text-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
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
