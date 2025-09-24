import { NotificationType } from "@prisma/client";
import React from "react";

interface NotificationsProps {
  notifications: Array<{
    notificationID: string,
    title: string,
    message: string,
    type: NotificationType,
    createdAt: Date,
    isRead?: boolean,
  }>;
  handleMarkNotificationRead?: (id: string) => void;
}

export default function Notifications(props: NotificationsProps) {
  
  const { notifications, handleMarkNotificationRead } = props;

  return (
    <div >
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
        Notifications
      </h3>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {notifications.map((notification) => (
          <div 
            key={notification.notificationID}
            className={"p-3 rounded-lg border-l-4 transition-colors bg-blue-50 border-blue-500 relative"}          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{notification.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
              </div>
              <div className="text-xs text-gray-500 ml-2">
                {notification.createdAt.toLocaleString()} {/* ISSUE: localDateString*/}
              </div>
            </div>
            {handleMarkNotificationRead && !notification.isRead && (
              <button onClick={() => handleMarkNotificationRead(notification.notificationID)}
                className="absolute top-2 right-2 text-xs px-2 py-1 bg-white/80 border rounded-md hover:bg-white cursor-pointer">
                Mark as read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
