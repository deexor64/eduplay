// This component is used only for displaying user info

"use client";

import Link from "next/link";
import InfoBadge from "@/components/shared/badges/InfoBadge";
import ViewItemActionButton from "@/components/shared/buttons/ViewItemActionButton";

interface ViewUserItemProps {
  itemData: {
    indexNumber?: string; // teacher, student
    subject?: string, // teacher
    role?: string; // teacher
    grade?: number, // student
    class?: string, // student
    user: {
      firstName: string; // teacher, student, parent
      lastName: string; // teacher, student, parent
      status: "PENDING" | "ACTIVE" | "INACTIVE" | "SUSPENDED" | string; // teacher, student, parent
      displayPicUrl: string; // teacher, student, parent
    }
  };
}


export default function ViewUserItem(props: ViewUserItemProps) {

  const itemData = props.itemData;

  function handleAction() {
    alert("Action clicked");
  }

  return (
    <div className="border border-blue-200 bg-white rounded-xl p-4 flex items-center shadow hover:shadow-lg transition 
    hover:bg-blue-50 justify-between relative mb-0.5 mt-2 min-h-[96px]">

      {/* Item info */}
        <div className="min-w-0">

          {/* Clickable link */}
          <div className="flex items-center gap-2">
            <Link
              href={`/${itemData.user.firstName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-pink-700 truncate focus:outline-none focus:ring-2 
              focus:ring-blue-200 cursor-pointer no-underline hover:text-pink-900"
              style={{ textDecoration: 'none' }}
            >
              {`${itemData.user.firstName} ${itemData.user.lastName}`}
            </Link>
            {
              itemData.indexNumber && (
                <InfoBadge text={itemData.indexNumber} colorTheme="default" />
              )
            }
          </div>

          {/* Badge and description */}
          <div className="flex items-center gap-2 mt-1 text-xs">
            {
              itemData.role && (
                <InfoBadge text={itemData.role} colorTheme="purple" />
              )
            }
            {
              itemData.subject && (
                <InfoBadge text={itemData.subject} colorTheme="green" />
              )
            }
            {
              itemData.grade && itemData.class && (
                <InfoBadge text={`Grade ${itemData.grade} ${itemData.class}`} colorTheme="indigo" />
              )
            }
          </div>
        </div>
     
      {/* Action buttons */}
      <div className="flex flex-row items-end gap-2  ml-4">
        {
          itemData.user.status === "PENDING" && (
            <>
              <ViewItemActionButton text="Accept" colorTheme="green"
                onAction={() => handleAction()} />
              <ViewItemActionButton text="Reject" colorTheme="red"
                onAction={() => handleAction()} />
            </>
          )
        }
        {
          itemData.user.status === "ACTIVE" && (
            <>
              <ViewItemActionButton text="Suspend" colorTheme="yellow"
                onAction={() => handleAction()} />
              <ViewItemActionButton text="Delete" colorTheme="red"
                onAction={() => handleAction()} />
            </>
          )
        }
        {
          itemData.user.status === "INACTIVE" && (
            <>
              <ViewItemActionButton text="Suspend" colorTheme="yellow"
                onAction={() => handleAction()} />
              <ViewItemActionButton text="Delete" colorTheme="red"
                onAction={() => handleAction()} />
            </>
          )
        }
        {
          itemData.user.status === "SUSPENDED" && (
            <>
              <ViewItemActionButton text="Activate" colorTheme="green"
                onAction={() => handleAction()} />
              <ViewItemActionButton text="Delete" colorTheme="red"
                onAction={() => handleAction()} />
            </>
          )
        }
        {
          itemData.user.status === "DELETED" && (
            <>
              <ViewItemActionButton text="Activate" colorTheme="green"
                onAction={() => handleAction()} />
              <ViewItemActionButton text="Delete" colorTheme="red"
                onAction={() => handleAction()} />
            </>
          )
        }
      </div>

    </div>
  );
}
