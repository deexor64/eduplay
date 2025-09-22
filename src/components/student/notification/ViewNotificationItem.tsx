"use client";

import { NotificationType } from "@prisma/client";

interface ViewNotificationItemProps {
  notificationID: string;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: string;
}

const typeThemes: Record<NotificationType, string> = {
  INFO:    "bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 border-blue-300",
  WARNING: "bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 border-yellow-300",
  ERROR:   "bg-gradient-to-br from-red-50 via-red-100 to-red-200 border-red-300",
  SUCCESS: "bg-gradient-to-br from-green-50 via-green-100 to-green-200 border-green-300",
};

export default function ViewNotificationItem(props: ViewNotificationItemProps) {
  
  const { notificationID, title, message, type, createdAt } = props;
  
  return (
    <div key={notificationID} className={`p-4 rounded-2xl shadow-md border-2 ${typeThemes[type] ?? typeThemes.INFO}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="text-lg font-bold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-700 mt-1">{message}</p>
        </div>
        <div className="text-xs text-gray-600 ml-4 whitespace-nowrap">
          {new Date(createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
