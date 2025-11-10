"use client";

import Title from "@/components/student/Title";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import { NotificationType } from "@prisma/client";
import ViewNotificationItem from "@/components/student/notification/ViewNotificationItem";
import { markNotificationAsRead } from "@/actions/notification/markNotificationAsRead";
import ListLoading from "@/components/student/loading/ListLoading";
import ListEmpty from "@/components/student/loading/ListEmpty";

export default function NotificationsPage() {
  
  const { userID, email, userType, role, status, user } = useContext(AuthContext);

  const [dbData, setDbData] = useState<{
    notifications: Array<{
      notificationID: string;
      title: string;
      message: string;
      type: NotificationType;
      createdAt: string;
      isRead?: boolean;
    }>;
  } | null>(null);

  async function fetchNotifications() {
    const token = await user?.getIdToken();
    const res = await fetch("/api/notifications", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    
    const resData = await res.json();
    if (!resData.status) {
      console.log(resData.data);
      return;
    }
    setDbData(resData.data);
    
  }

  async function handleMarkNotificationRead(id: string) {
    const token = await user?.getIdToken();
    await markNotificationAsRead(id, token!);
    await fetchNotifications();
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <>
      
      <Title  title="Your Notifications" imageUrl="/images/student/title-profile.png" />

      <div className="w-full min-h-[calc(100vh-390px)] grid grid-cols-1 gap-2">
        
        {!dbData ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <ListLoading />
            <div className="text-gray-500 mt-4">Getting you notifications...</div>
          </div>
        ) : dbData.notifications.length === 0 ? (
          <div className="col-span-full flex flex-col items-center text-center py-12">
            <ListEmpty />
            <div className="text-gray-600 text-lg mb-2">
              No notifications available
            </div>
          </div>
        ) : (
          dbData.notifications.map((notification) => (
            <div key={notification.notificationID} className="relative">
              <ViewNotificationItem key={notification.notificationID} {...notification} />
              {!notification.isRead && (
                <button onClick={() => handleMarkNotificationRead(notification.notificationID)}
                  className="cursor-pointer absolute bottom-3 right-2 px-4 py-2 text-sm font-semibold text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-out animate-bounce-slow hover:scale-105 hover:shadow-lg bg-gradient-to-r from-fuchsia-400 via-purple-400 to-pink-400"
                >
                  Got it!
                </button>
              )}
            </div>
          ))
        )}
        
      </div>
    </>
  );
}
