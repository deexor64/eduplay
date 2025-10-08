"use client";

import Link from "next/link";
import InfoBadge from "@/components/shared/badges/InfoBadge";
import ViewItemActionButton from "@/components/shared/buttons/ViewItemActionButton";
import { ActivityDifficulty, Subject, ActivityStatus } from "@prisma/client";

interface ViewActivityItemProps {
  itemData: {
    activityID: string;
    title: string;
    status: ActivityStatus;
    subject: Subject;
    grade?: 1 | 2 | 3 | 4 | 5;
    isScored: boolean;
    difficulty?: ActivityDifficulty;
    section: string;
  };
  handleUpdateActivityStatus: (activityID: string, status: ActivityStatus) => void;
}

export default function ViewActivityItem(props: ViewActivityItemProps) {

  const itemData = props.itemData;

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
            className="text-lg font-semibold text-gray-600 truncate focus:outline-none focus:ring-2 focus:ring-blue-200 
            cursor-pointer no-underline hover:text-gray-800"
            style={{ textDecoration: 'none' }}
          >
            {itemData.section ? itemData.section + " | " + itemData.title 
            : itemData.title}
          </Link>
        </div>

        {/* Badges and description */}
        <div className="flex items-center gap-2 mt-1 text-xs flex-wrap">
          {itemData.grade ? (
            <InfoBadge text={"GRADE " + String(itemData.grade)} colorTheme="blue" />
          ) : (
            <InfoBadge text="ALL GRADES" colorTheme="blue" />
          )}
          <InfoBadge text={itemData.subject} colorTheme="green" />
          {itemData.difficulty && (
            <InfoBadge text={itemData.difficulty} colorTheme="yellow" />
          )}
          {itemData.isScored && (
            <InfoBadge text="SCORED" colorTheme="purple" />
          )}
          <InfoBadge text={itemData.status} colorTheme="indigo" />
        </div>

      </div>

      {/* Action buttons */}
      <div className="flex flex-row items-end gap-2 ml-4">
        {itemData.status === "UNPUBLISHED" && (
          <>
            <ViewItemActionButton text="Publish" colorTheme="blue"
              onAction={() => props.handleUpdateActivityStatus(itemData.activityID, "PUBLISHED")} />
            <ViewItemActionButton text="Delete" colorTheme="red" 
              onAction={() => props.handleUpdateActivityStatus(itemData.activityID, "DELETED")} />
          </>
        )}
        {itemData.status === "PUBLISHED" && (
          <>
            <ViewItemActionButton text="Unpublish" colorTheme="yellow"
              onAction={() => props.handleUpdateActivityStatus(itemData.activityID, "UNPUBLISHED")} />
            <ViewItemActionButton text="Delete" colorTheme="red" 
              onAction={() => props.handleUpdateActivityStatus(itemData.activityID, "DELETED")} />
          </>
        )}
        {itemData.status === "DELETED" && (
          <ViewItemActionButton text="Restore" colorTheme="green"
            onAction={() => props.handleUpdateActivityStatus(itemData.activityID, "UNPUBLISHED")} />
        )}
      </div>

    </div>
  );
} 
