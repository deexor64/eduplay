"use client"

import NavigatorLayout from "@/components/navigator/NavigatorLayout";
import Title from "@/components/shared/headings/Title";
import TeacherProfileSummary from "@/components/profile/TeacherProfileSummary";
import TeacherPersonalInfoForm from "@/components/profile/TeacherPersonalInfoForm";
import TeacherNotifications from "@/components/profile/TeacherNotifications";
import TeacherCalendar from "@/components/profile/TeacherCalendar";
import TeacherPasswordChangeForm from "@/components/profile/TeacherPasswordChangeForm";
import { useContext, useEffect, useState } from "react";
import { updateTeacherInfo } from "@/actions/teacher/updateTeacherInfo";
import { UserStatus, TeacherRole } from "@prisma/client";
import { AuthContext } from "@/contexts/AuthProvider";
import useFileStoreUploader from "@/hooks/useFileStoreUploader";
import generateHash from "@/lib/utils/generateHash";
import { EmailAuthProvider, reauthenticateWithCredential, sendEmailVerification, updateEmail, updatePassword, verifyBeforeUpdateEmail } from "firebase/auth";
import { clientAuth } from "@/lib/firebaseClient";
import toast from "react-hot-toast";
import usePrompt from "@/hooks/usePrompt";
import { PromptDialog } from "@/components/shared/popups/promptDialog";

export default function Profile() {
  
  const { userID, email, userType, role, status, user } = useContext(AuthContext);
  
  // FileStore handler
  const fileStoreUploader = useFileStoreUploader();
  
  // prompt
  const { prompt, promptState, setPromptState } = usePrompt();

  // State for teacher data
  const [dbData, setDbData] = useState<{
    userID: string,
    firstName: string,
    lastName: string,
    email: string,
    displayPicUrl: string,
    status: UserStatus,
    teacher: {
      teacherID: string,
      indexNumber: string,
      role: TeacherRole,
    }
  }>({
    userID: "",
    firstName: "-",
    lastName: "-",
    email: "",
    displayPicUrl: "-",
    status: "ACTIVE",
    teacher: {
      teacherID: "",
      indexNumber: "",
      role: "TEACHER",
    }
  });

  // Notifications state
  const [notifications, setNotifications] = useState<Array<{
    id: string,
    title: string,
    message: string,
    type: "info" | "success" | "warning" | "error",
    timestamp: Date,
    read: boolean
  }>>([
    {
      id: "1",
      title: "New Student Registration",
      message: "5 new students have been registered in your class",
      type: "info",
      timestamp: new Date(),
      read: false
    },
    {
      id: "2", 
      title: "Activity Published",
      message: "Your 'Math Addition' activity has been successfully published",
      type: "success",
      timestamp: new Date(Date.now() - 3600000),
      read: false
    },
    {
      id: "3",
      title: "System Maintenance",
      message: "Scheduled maintenance will occur tonight from 2-4 AM",
      type: "warning", 
      timestamp: new Date(Date.now() - 7200000),
      read: true
    }
  ]);

  // Calendar state
  const [calendarEvents, setCalendarEvents] = useState<Array<{
    id: string,
    title: string,
    date: Date,
    time: string,
    type: "class" | "meeting" | "deadline" | "personal"
  }>>([
    {
      id: "1",
      title: "Grade 3 Math Class",
      date: new Date(),
      time: "09:00 AM",
      type: "class"
    },
    {
      id: "2", 
      title: "Staff Meeting",
      date: new Date(Date.now() + 86400000),
      time: "02:00 PM",
      type: "meeting"
    },
    {
      id: "3",
      title: "Activity Review Deadline",
      date: new Date(Date.now() + 172800000),
      time: "05:00 PM", 
      type: "deadline"
    }
  ]);

  // Fetch teacher data
  async function fetchTeacher() {  
    const url = `/api/profile`;
    const token = await user?.getIdToken();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    const resData = await res.json();
    setDbData(resData.data);
  }
  
  async function updateProfilePictureHandler(file: File) {
    const hash = await generateHash(file.name);
    try {
      const urls = await fileStoreUploader(new Map<string, File>([[hash, file]]));
      const url = urls.get(hash) + "";
      const token = await user?.getIdToken();
      await updateTeacherInfo({ displayPicUrl: url }, token!);
      fetchTeacher();
      toast.success("Profile picture updated successfully");
    } catch (e: any) {
      toast.error("Failed to update profile picture");
    }
  }
  
  async function updateTeacherInfoHandler(update: { firstName?: string, lastName?: string, email?: string }) {
    try {
      const token = await user?.getIdToken();
      await updateTeacherInfo(update, token!);
      await fetchTeacher();
      toast.success("Profile information updated successfully");
    } catch (e: any) {
      toast.error("Failed to update profile information");
    } 
  }
  
  async function updateEmailHandler(newEmail: string) {
    try {
      const currentPassword = await prompt("Enter your password");
      if (!currentPassword) throw new Error("Password is required");
      const credential = EmailAuthProvider.credential(user!.email!, currentPassword);
      await reauthenticateWithCredential(user!, credential);
      await verifyBeforeUpdateEmail(user!, newEmail);
      toast.success("Verification email sent, Please verify to prevent login lockout");
    } catch (e: any) {
      toast.error("Failed to update email" + e.message);
    } 
  }
  
  async function updatePasswordHandler(currentPassword: string, newPassword: string, confirmPassword: string) {
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    
    try {
      const credential = EmailAuthProvider.credential(email!, currentPassword);
      await reauthenticateWithCredential(user!, credential);
      await updatePassword(user!, newPassword);
      toast.success("Password updated successfully");
    } catch (e: any) {
      toast.error("Failed to update password. Please check your current password.");
      throw new Error("Password update failed");
    }
  }

  function markNotificationAsRead(notificationId: string) {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  }

  function addCalendarEvent(event: Omit<typeof calendarEvents[0], 'id'>) {
    const newEvent = {
      ...event,
      id: Date.now().toString()
    };
    setCalendarEvents(prev => [...prev, newEvent].sort((a, b) => a.date.getTime() - b.date.getTime()));
  }

  useEffect(() => {
    fetchTeacher();
  }, []);

  return (
    <NavigatorLayout>
      
      <PromptDialog state={promptState} setState={setPromptState} />
      
      <div className="p-4 space-y-6">
        <Title title="Profile" />
        
        {/* Top Section: Combined Personal Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Profile Summary Section - 1/3 width */}
            <div className="lg:w-1/3 border-r border-gray-200 pr-6">
              <TeacherProfileSummary 
                teacherInfo={dbData}
                updateProfilePictureHandler={updateProfilePictureHandler}
              />
            </div>

            {/* Personal Information Form Section - 2/3 width */}
            <div className="lg:w-2/3 pl-0 lg:pl-6">
              <TeacherPersonalInfoForm 
                data={dbData}
                emailVerified={dbData.email === email ? true : false}
                currentEmail={email}
                updateEmailHandler={updateEmailHandler}
                updateTeacherInfo={updateTeacherInfoHandler}
              />
            </div>
          </div>
        </div>

        {/* Middle Section: Notifications and Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Notifications */}
          <TeacherNotifications 
            notifications={notifications}
            markNotificationAsRead={markNotificationAsRead}
          />

          {/* Calendar */}
          <TeacherCalendar 
            calendarEvents={calendarEvents}
            addCalendarEvent={addCalendarEvent}
          />
        </div>

        {/* Bottom Section: Password Change Form */}
        <TeacherPasswordChangeForm 
          updatePasswordHandler={updatePasswordHandler}
        />
      </div>
    </NavigatorLayout>
  );
}
