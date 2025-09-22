"use client";

import Title from "@/components/student/Title";
import StudentNavigatorLayout from "@/components/student/StudentNavigatorLayout";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import { NotificationType } from "@prisma/client";
import ViewNotificationItem from "@/components/student/notification/ViewNotificationItem";

export default function NotificationsPage() {
  
  const { userID, email, userType, role, status, user } = useContext(AuthContext);

  const [dbData, setDbData] = useState<{
    notifications: Array<{
      notificationID: string;
      title: string;
      message: string;
      type: NotificationType;
      createdAt: string;
    }>;
  } | null>(null);

  async function fetchNotifications() {
    const token = await user?.getIdToken();
    const res = await fetch("/api/notifications", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const resData = await res.json();
    setDbData(resData.data);
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <StudentNavigatorLayout>
      <Title
        title="Your Notifications"
        imageUrl="/images/student/title-profile.png"
      />

      <div className="w-full min-h-[calc(100vh-390px)] grid grid-cols-1 gap-2">
        {!dbData && (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">⏳</div>
            <div className="text-gray-600 text-lg mb-2">
              Getting your updates...
            </div>
          </div>
        )}

        {(dbData && dbData.notifications.length === 0) ? (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">🔔</div>
            <div className="text-gray-600 text-lg mb-2">
              No notifications right now
            </div>
            <div className="text-gray-500">
              We'll let you know when something new arrives!
            </div>
          </div>
        ) : (
          dbData && dbData.notifications.map((n) => (
            <ViewNotificationItem key={n.notificationID} {...n} />
          ))
        )}
        
      </div>
    </StudentNavigatorLayout>
  );
}
