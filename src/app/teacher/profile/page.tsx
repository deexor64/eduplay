"use client"

import NavigatorLayout from "@/components/navigator/NavigatorLayout";
import Title from "@/components/shared/headings/Title";
import ProfileSummary from "@/components/profile/ProfileSummary";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";
import Notifications from "@/components/profile/Notifications";
import PasswordChangeForm from "@/components/profile/PasswordChangeForm";
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
  // TODO: Implement notifications
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
    },
    {
      id: "4",
      title: "System Maintenance",
      message: "Scheduled maintenance will occur tonight from 2-4 AM",
      type: "warning", 
      timestamp: new Date(Date.now() - 7200000),
      read: true
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

  useEffect(() => {
    fetchTeacher();
  }, []);

  return (
    <NavigatorLayout>
      
      <PromptDialog state={promptState} setState={setPromptState} />
      
      <div className="p-4 space-y-6">
        <Title title="Profile" />
        
        {/* Top Section: Profile Summary and Notifications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Profile Summary Section - 1/2 width */}
            <div className="lg:w-1/2 border-r border-gray-200 pr-6">
              <ProfileSummary 
                teacherInfo={dbData}
                updateProfilePictureHandler={updateProfilePictureHandler}
              />
            </div>

            {/* Notifications Section - 1/2 width */}
            <div className="lg:w-1/2">
              <Notifications 
                notifications={notifications}
                markNotificationAsRead={markNotificationAsRead}
              />
            </div>
          </div>
        </div>

        {/* Middle Section: Personal Info and Password Change */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Personal Information Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <PersonalInfoForm 
              data={dbData}
              emailVerified={dbData.email === email ? true : false}
              currentEmail={email}
              updateEmailHandler={updateEmailHandler}
              updateTeacherInfo={updateTeacherInfoHandler}
            />
          </div>

          {/* Password Change Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <PasswordChangeForm 
              updatePasswordHandler={updatePasswordHandler}
            />
          </div>
        </div>
      </div>
    </NavigatorLayout>
  );
}
