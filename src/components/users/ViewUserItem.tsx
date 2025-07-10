"use client";

// This component should be used solely for displaying user info
// Displayed info is predefined inside the component and cannot be modified

import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faPause,
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
  
  const itemData  = props.itemData;

  const handleAction = useCallback(
    (action: string) => {
      alert(`Action "${action}" clicked for user ${itemData.user.firstName}`);
    },
    [itemData.user.firstName]
  );

  return (
    <div
      className="border border-blue-200 bg-white rounded-xl p-4 flex items-center shadow hover:shadow-lg transition hover:bg-blue-50 justify-between relative mb-0.5 mt-2 min-h-[96px]"
      key={itemData.indexNumber}
    >
      {/* Avatar and user info */}
      <div className="flex items-center gap-4 min-w-0">
        <Image
          src={itemData.user.displayPicUrl}
          alt="Profile Picture"
          width={64}
          height={64}
          className="rounded-full border border-gray-200 bg-white shadow-sm object-cover w-16 h-16"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Link
              href={""}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-purple-800 truncate focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer no-underline hover:text-purple-900"
              style={{ textDecoration: 'none' }}
              onClick={(e) => { e.preventDefault(); alert("opened"); }}
            >
              {`${itemData.user.firstName} ${itemData.user.lastName}`}
            </Link>
            {itemData.indexNumber && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-mono font-semibold bg-gray-100 text-gray-700 border-gray-300 shadow-sm" title="Index Number">{itemData.indexNumber}</span>
            )}
          </div>
          {props.itemData.grade && (
            <div className="text-xs text-yellow-600 mt-1 truncate">
              {`Grade ${props.itemData.grade} - ${props.itemData.class}`}
            </div>
          )}
        </div>
      </div>
      {/* Status and actions */}
      <div className="flex flex-col items-end gap-2 min-w-[120px] ml-4">
        <StatusBadge status={itemData.user.status} />
        <ActionButtons status={itemData.user.status as any} onAction={handleAction} />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusStyles: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
    ACTIVE: "bg-green-100 text-green-800 border-green-300",
    INACTIVE: "bg-gray-100 text-gray-600 border-gray-300",
    DELETED: "bg-red-100 text-red-700 border-red-300",
    SUSPENDED: "bg-red-200 text-red-800 border-red-400",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold uppercase shadow-sm ${statusStyles[status] || "bg-gray-100 text-gray-500 border-gray-200"}`}
      aria-label={`Status: ${status}`}
      title={`Status: ${status}`}
    >
      {status}
    </span>
  );
}

function ActionButtons({ status, onAction }: {
  status: "PENDING" | "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DELETED";
  onAction: (action: string) => void;
}) {
  const actionsMap: Record<string, { label: string; icon: any; color: string }[]> = {
    PENDING: [
      { label: "Accept", icon: faCheck, color: "bg-green-500 hover:bg-green-600" },
      { label: "Reject", icon: faTimes, color: "bg-red-500 hover:bg-red-600" },
    ],
    ACTIVE: [
      { label: "Suspend", icon: faPause, color: "bg-yellow-500 hover:bg-yellow-600" },
      { label: "Delete", icon: faTimes, color: "bg-red-500 hover:bg-red-600" },
    ],
    INACTIVE: [
      { label: "Suspend", icon: faPause, color: "bg-yellow-500 hover:bg-yellow-600" },
      { label: "Delete", icon: faTimes, color: "bg-red-500 hover:bg-red-600" },
    ],
    SUSPENDED: [
      { label: "Activate", icon: faCheck, color: "bg-green-500 hover:bg-green-600" },
      { label: "Delete", icon: faTimes, color: "bg-red-500 hover:bg-red-600" },
    ],
    DELETED: [
      { label: "Activate", icon: faCheck, color: "bg-green-500 hover:bg-green-600" }
    ],
  };

  const actions = actionsMap[status] || [];

  return (
    <div className="flex gap-2">
      {actions.map(({ label, icon, color }) => (
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
          <FontAwesomeIcon icon={icon} />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}

