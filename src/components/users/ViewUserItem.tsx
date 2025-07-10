"use client";

// This component should be used solely for displaying user info
// Displayed info is predefined inside the component and cannot be modified

import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,      // Accept / Activate
  faTimes,      // Reject / Delete
  faPause,      // Suspend
} from "@fortawesome/free-solid-svg-icons";


interface ViewUserItemProps {
  itemData: {
    indexNumber?: string;
    grade?: number,
    class?: string,
    user: {
      firstName: string;
      lastName: string;
      status: "PENDING" | "ACTIVE" | "INACTIVE" | "SUSPENDED" | string;
      displayPicUrl: string;
    }
  };
}

export default function ViewUserItem(props: ViewUserItemProps) {
  const { itemData } = props;

  const handleAction = useCallback(
    (action: string) => {
      alert(`Action "${action}" clicked for user ${itemData.user.firstName}`);
    },
    [itemData.user.firstName]
  );

  return (
    <Link
      href={""}
      target="_blank"
      rel="noopener noreferrer"
      className="border border-blue-200 bg-white rounded-lg p-4 
        flex items-start gap-4 shadow hover:shadow-lg transition
        cursor-pointer hover:bg-blue-50 justify-between relative mb-0.5 mt-2"
      onClick={(e) => { e.preventDefault(); alert("opened"); }} // prevent default to allow buttons to work
      key={itemData.indexNumber}
    >
      <div className="flex items-center gap-4">
        <Image
          src={itemData.user.displayPicUrl}
          alt="Profile Picture"
          width={64}
          height={64}
          className="rounded border border-gray-300 bg-white"
        />
        <div>
          <div className="text-lg font-semibold text-purple-800">
            {`${itemData.user.firstName} ${itemData.user.lastName}`}
          </div>
          {
            props.itemData.grade && <div className="text-sm text-yellow-600">
            {`${"Index No " + itemData.indexNumber + "    "}Grade ${props.itemData.grade} - ${props.itemData.class}`}
          </div>
          }
        </div>
      </div>

      <div className="flex items-start gap-4">
        <StatusBadge status={itemData.user.status} />
        <ActionButtons status={itemData.user.status as any} onAction={handleAction} />
      </div>
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-400",
    ACTIVE: "bg-green-500",
    INACTIVE: "bg-gray-400",
    DELETED: "bg-red-100",
    SUSPENDED: "bg-red-500",
  };
  return (
    <div className="flex items-center gap-2 mt-1">
      <span className="text-xs font-semibold uppercase text-gray-700">{status}</span>
      <span
        className={`inline-block w-3 h-3 rounded-full ${statusColors[status] || "bg-gray-300"}`}
        aria-label={`Status: ${status}`}
        title={`Status: ${status}`}
      />
    </div>
  );
}


function ActionButtons({ status, onAction }: {
  status: "PENDING" | "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DELETED";
  onAction: (action: string) => void;
}) {
  const actionsMap: Record<string, { label: string; icon: any }[]> = {
    PENDING: [
      { label: "Accept", icon: faCheck },
      { label: "Reject", icon: faTimes },
    ],
    ACTIVE: [
      { label: "Suspend", icon: faPause },
      { label: "Delete", icon: faTimes },
    ],
    INACTIVE: [
      { label: "Suspend", icon: faPause },
      { label: "Delete", icon: faTimes },
    ],
    SUSPENDED: [
      { label: "Activate", icon: faCheck },
      { label: "Delete", icon: faTimes },
    ],
    DELETED: [
      { label: "Activate", icon: faCheck }
    ],
  };

  const actions = actionsMap[status] || [];

  return (
    <div className="flex gap-2">
      {actions.map(({ label, icon }) => (
        <button
          key={label}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center gap-2"
          onClick={(e) => { 
            e.preventDefault(); 
            e.stopPropagation(); 
            return onAction(label) 
          }}
          type="button"
          title={label}
          aria-label={label}
        >
          <FontAwesomeIcon icon={icon} />
        </button>
      ))}
    </div>
  );
}

