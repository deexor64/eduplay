"use client"

import React from "react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
  read: boolean;
}

interface NotificationsProps {
  notifications: Notification[];
  markNotificationAsRead: (notificationId: string) => void;
}

export default function Notifications(props: NotificationsProps) {
  const { notifications, markNotificationAsRead } = props;

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
            key={notification.id}
            className={`p-3 rounded-lg border-l-4 cursor-pointer transition-colors ${
              notification.read 
                ? 'bg-gray-50 border-gray-300' 
                : 'bg-blue-50 border-blue-500'
            }`}
            onClick={() => markNotificationAsRead(notification.id)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{notification.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
              </div>
              <div className="text-xs text-gray-500 ml-2">
                {notification.timestamp.toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
