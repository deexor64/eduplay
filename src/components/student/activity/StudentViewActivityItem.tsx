// This list item is specially made for viewing lessons
// Attributes are predefined and cannot be changed
import { ActivityDifficultyEnum, SubjectEnum } from "@/lib/utils/types";
import Link from "next/link";

interface StudentViewActivityItemProps {
  itemData: {
    activityID: string;
    title: string;
    subject: string;
    grade: number;
    timeLimit: number;
    isGraded: boolean;
    difficulty: string;
    completed: boolean;
    progressID?: string;
  }
}

export default function StudentViewActivityItem(props: StudentViewActivityItemProps) {
  
  const itemData = props.itemData;

  // Generate a fun emoji based on subject
  function getSubjectEmoji(subject: SubjectEnum): string {
    switch(subject) {
      case 'MATHEMATICS': return '🔢';
      case 'SCIENCE': return '🔬';
      case 'ENGLISH': return '📚';
      default: return '📝';
    }
  }

  // Get color theme classes based on subject
  function getSubjectTheme(subject: SubjectEnum): { border: string; bg: string; text: string; badge: string; cardBg: string; subjectTag: string } {
    switch(subject) {
      case 'SCIENCE':
        return {
          border: 'border-green-500',
          bg: 'green-400',
          text: 'text-green-800',
          badge: 'bg-green-100 text-green-700',
          cardBg: 'bg-green-50',
          subjectTag: 'bg-green-200 text-green-800'
        };
      case 'ENGLISH':
        return {
          border: 'border-red-500',
          bg: 'red-400',
          text: 'text-red-800',
          badge: 'bg-red-100 text-red-700',
          cardBg: 'bg-red-50',
          subjectTag: 'bg-red-200 text-red-800'
        };
      case 'MATHEMATICS':
        return {
          border: 'border-blue-500',
          bg: 'blue-400',
          text: 'text-blue-800',
          badge: 'bg-blue-100 text-blue-700',
          cardBg: 'bg-blue-50',
          subjectTag: 'bg-blue-200 text-blue-800'
        };
      default:
        return {
          border: 'border-gray-500',
          bg: 'gray-400',
          text: 'text-gray-800',
          badge: 'bg-gray-100 text-gray-700',
          cardBg: 'bg-gray-50',
          subjectTag: 'bg-gray-200 text-gray-800'
        };
    }
  }

  const theme = getSubjectTheme(itemData.subject as SubjectEnum);

  // Generate difficulty emoji
  function getDifficultyEmoji(difficulty: ActivityDifficultyEnum): string {
    switch(difficulty) {
      case 'EASY': return '😊';
      case 'MEDIUM': return '🤔';
      case 'HARD': return '😰';
      default: return '📝';
    }
  }
  
  return (
    <Link
      href={itemData.completed ?
        `/student/progress/${itemData.progressID}` :
        `/student/activities/${itemData.activityID}`}
      target="_blank"
      className={`group relative border-2 rounded-xl p-4 
        shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer 
        ${theme.cardBg} ${theme.border} hover:border-purple-300 hover:bg-gradient-to-br ${theme.bg}
        transform hover:scale-105 hover:-translate-y-1 overflow-hidden`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Content */}
      <div className="relative z-10">

        {/* Header with emoji and title */}
        <div className="flex items-center mb-3">
          <div className="text-4xl mr-3 group-hover:scale-110 transition-transform duration-300">
            {getSubjectEmoji(itemData.subject as SubjectEnum)}
          </div>
          <div className="flex-1">
            <h3 className={`font-bold text-base leading-tight group-hover:text-purple-900 transition-colors ${theme.text}`}>
              {itemData.title}
            </h3>
          </div>

          {/* Completion status badge */}
          <div className="ml-2">
          {
            itemData.completed && 
            <span className={`inline-block text-base font-semibold px-2 py-1 rounded-full ${theme.badge} bg-green-300`}>
              Completed
            </span>
          } 
          </div>
        </div>

        {/* Attribute badges  */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-base font-medium text-blue-600 flex items-center">
            {getDifficultyEmoji(itemData.difficulty as ActivityDifficultyEnum)} {itemData.difficulty}
          </span>
          <span className="text-base font-medium text-green-600">
            Grade {itemData.grade === 0 ? 'All' : itemData.grade}
          </span>
          <span className={`text-base font-medium px-2 py-1 rounded-full ${theme.subjectTag}`}>
           📚 {itemData.subject}
         </span>
          {itemData.timeLimit > 0 && (
            <span className="text-base bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
              ⏱️ {itemData.timeLimit}m
            </span>
          )}
          {itemData.isGraded && (
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
