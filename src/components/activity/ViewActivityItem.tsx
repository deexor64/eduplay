"use client";

import Link from "next/link";
import InfoBadge from "@/components/shared/badges/InfoBadge";
import ViewItemActionButton from "@/components/shared/buttons/ViewItemActionButton";
import { ActivityStatus } from "@prisma/client";
import { updateActivityStatus } from "@/actions/activity/updateActivityStatus";
import toast from "react-hot-toast";

interface ViewActivityItemProps {
  itemData: {
    activityID: string;
    title: string;
    status: string;
    subject: string;
    grade: number;
    isScored: boolean;
    difficulty: string;
    topic: string;
  };
  onUpdateActivityStatus: Function;
}

export default function ViewActivityItem(props: ViewActivityItemProps) {

  const itemData = props.itemData;

  function handleUpdateActivityStatus(status: ActivityStatus) {

    toast.promise(updateActivityStatus(itemData.activityID, status), {
      loading: "Updating activity status...",
      success: () => {
        props.onUpdateActivityStatus();
        return "Activity status updated successfully";
      },
      error: "Failed to update activity status",
    })

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
          {itemData.isScored && (
            <InfoBadge text="SCORED" colorTheme="purple" />
          )}
          {itemData.status === "UNPUBLISHED" && (
            <InfoBadge text={itemData.status} colorTheme="indigo" />
          )}
          <InfoBadge text={itemData.topic} colorTheme="yellow" />
        </div>

      </div>

      {/* Action buttons */}
      <div className="flex flex-row items-end gap-2 ml-4">
        {
          itemData.status === "UNPUBLISHED" && (
            <>
              <ViewItemActionButton text="Publish" colorTheme="blue"
                onAction={() => handleUpdateActivityStatus("PUBLISHED")} />
              <ViewItemActionButton text="Delete" colorTheme="red" 
                onAction={() => handleUpdateActivityStatus("DELETED")} />
            </>
          )
        }
        {
          itemData.status === "PUBLISHED" && (
            <>
              <ViewItemActionButton text="Unpublish" colorTheme="yellow"
                onAction={() => handleUpdateActivityStatus("UNPUBLISHED")} />
              <ViewItemActionButton text="Delete" colorTheme="red" 
                onAction={() => handleUpdateActivityStatus("DELETED")} />
            </>
          )
        }
        {
          itemData.status === "DELETED" && (
            <>
              <ViewItemActionButton text="Restore" colorTheme="green"
                onAction={() => handleUpdateActivityStatus("UNPUBLISHED")} />
            </>
          )
        }
      </div>

    </div>
  );
} 
