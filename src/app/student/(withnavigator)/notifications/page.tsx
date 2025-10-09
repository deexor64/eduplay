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
                  className="absolute top-2 right-2 text-xs px-2 py-1 bg-white/80 border rounded-md hover:bg-white cursor:pointer"
                >
                  Mark as read
                </button>
              )}
            </div>
          ))
        )}
        
      </div>
    </>
  );
}
