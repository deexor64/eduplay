// This list item is specially made for viewing lessons
// Attributes are predefined and cannot be changed
import Link from "next/link";
import InfoBadge from "./InfoBadge";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ActivityDifficulty, Subject } from "@prisma/client";
import randomNumber from "@/lib/utils/randomNumber";

type ViewActivityItemProps = {
  itemData: {
    activityID: string,
    title: string,
    section: string,
    subject: Subject,
    grade?: 1 | 2 | 3 | 4 | 5,
    isScored: boolean,
    difficulty: ActivityDifficulty,
    completed: boolean,
    progressID?: string,
  }
}

export default function StudentViewActivityItem(props: ViewActivityItemProps) {

  const itemData = props.itemData;

  // Get color theme classes based on subject
  function getSubjectTheme(subject: Subject): { border: string; bg: string; text: string; badge: string; cardBg: string; subjectTag: string } {
    switch (subject) {
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

  const theme = getSubjectTheme(itemData.subject as Subject);

  return (
    <Link
      href={itemData.completed ?
        `/student/progress/${itemData.progressID}` :
        `/student/activities/${itemData.activityID}`}
      target="_blank"
      className={`group relative border-2 ${theme.border} rounded-xl p-4
        shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer
        ${theme.cardBg} hover:border-purple-300 hover:bg-gradient-to-br ${theme.bg}
        transform hover:scale-101 hover:-translate-y-1 overflow-hidden h-fit`}
    >


      {/* Content */}
      <div className="relative z-10 flex items-start gap-4">

        {/* Main content area */}
        <div className="flex-1">
          {/* title and completed badge */}
          <div className="flex items-center mb-3">
   
            <div className="flex-1">
              <h3 className={`font-bold text-lg leading-tight group-hover:text-purple-900 transition-colors ${theme.text}`}>
                {itemData.section + " | " + itemData.title}
                {itemData.completed && (
                  <FontAwesomeIcon icon={faCheckCircle} className="ml-1 text-green-600" title="Completed" />
                )}
              </h3>
            </div>

          </div>

          {/* Attribute badges  */}
          <div className="flex flex-wrap gap-2 mb-3">
            {itemData.grade && (
              <InfoBadge type="grade" text={"GRADE " + String(itemData.grade)} />
            )}
            <InfoBadge type="difficulty" text={itemData.difficulty} />
            <InfoBadge type="subject" text={itemData.subject} />
            {itemData.isScored && (
              <InfoBadge type="scored" text="SCORED" emoji="🏆" />
            )}
          </div>
        </div>

        {/* person image */}
        <div className="flex-shrink-0">
          {<img
            src={`/images/student/activity-item/${itemData.subject.toLocaleLowerCase()}-${randomNumber(1, 1)}.png`}
            alt={`${itemData.title} thumbnail`}
            className="w-32 h-32 object-cover rounded-lg border-2 border-white shadow-md"
          />}
        </div>

      </div>

    </Link>
  )
}
