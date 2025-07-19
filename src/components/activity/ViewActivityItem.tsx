"use client";

import Link from "next/link";
import InfoBadge from "@/components/shared/badges/InfoBadge";
import ViewItemActionButton from "@/components/shared/buttons/ViewItemActionButton";

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
  };
}

export default function ViewActivityItem(props: ViewActivityItemProps) {

  const itemData = props.itemData;

  function handleAction(action: string) {
    alert(`Action "${action}" clicked for activity ${itemData.title}`);
  }

  return (
    <div className="border border-blue-200 bg-white rounded-xl p-4 flex items-center shadow hover:shadow-lg transition 
    hover:bg-blue-50 justify-between relative mb-0.5 mt-2 min-h-[96px]">

      {/* Item info */}
      <div className="min-w-0">

        {/* Clickable link and activityID badge */}
        <div className="flex items-center gap-2">
          <Link
            href={`/teacher/activities/${itemData.activityID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-purple-800 truncate focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer no-underline hover:text-purple-900"
            style={{ textDecoration: 'none' }}
          >
            {itemData.title}
          </Link>
          <InfoBadge text={itemData.activityID.slice(0, 8) + "..."} colorTheme="default" />
        </div>

        {/* Badges and description */}
        <div className="flex items-center gap-2 mt-1 text-xs flex-wrap">
          {itemData.grade === 0 ? (
            <InfoBadge text="ALL GRADES" colorTheme="blue" />
          ) : (
            <InfoBadge text={"GRADE " + String(itemData.grade)} colorTheme="blue" />
          )}
          <InfoBadge text={itemData.subject} colorTheme="green" />
          <InfoBadge text={itemData.difficulty} colorTheme="yellow" />
          {itemData.isGraded && (
            <InfoBadge text="SCORED" colorTheme="purple" />
          )}
          {itemData.timeLimit > 0 && (
            <InfoBadge text={`${itemData.timeLimit} min`} colorTheme="gray" />
          )}
          {itemData.status && (
            <InfoBadge text={itemData.status} colorTheme="indigo" />
          )}
        </div>

      </div>

      {/* Action buttons */}
      <div className="flex flex-row items-end gap-2 ml-4">
        <ViewItemActionButton text="Publish" colorTheme="blue"
        onAction={() => handleAction("Publish")} />
        <ViewItemActionButton text="Edit" colorTheme="green" 
        onAction={() => handleAction("Edit")} />
        <ViewItemActionButton text="Delete" colorTheme="red" 
        onAction={() => handleAction("Delete")} />
      </div>

    </div>
  );
} 
