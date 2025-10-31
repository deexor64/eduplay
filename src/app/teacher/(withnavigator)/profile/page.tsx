"use client"

import NavigatorLayout from "@/components/navigator/NavigatorLayout";
import Title from "@/components/shared/headings/Title";
import ProfileSummary from "@/components/profile/ProfileSummary";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";
import Notifications from "@/components/profile/Notifications";
import PasswordChangeForm from "@/components/profile/PasswordChangeForm";
import { useContext, useEffect, useState } from "react";
import { updateTeacherInfo } from "@/actions/profile/updateTeacherInfo";
import { UserStatus, TeacherRole, UserType, NotificationType } from "@prisma/client";
import { AuthContext } from "@/contexts/AuthProvider";
import useFileStoreUploader from "@/hooks/useFileStoreUploader";
import generateHash from "@/lib/utils/generateHash";
import { EmailAuthProvider, reauthenticateWithCredential, sendEmailVerification, updateEmail, updatePassword, verifyBeforeUpdateEmail } from "firebase/auth";
import { clientAuth } from "@/lib/firebaseClient";
import toast from "react-hot-toast";
import usePrompt from "@/hooks/usePrompt";
import { PromptDialog } from "@/components/shared/popups/promptDialog";
import { markNotificationAsRead } from "@/actions/notification/markNotificationAsRead";

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
    },
    notifications: Array<{
      notificationID: string,
      title: string,
      message: string,
      type: NotificationType,
      createdAt: Date,
      isRead?: boolean,
    }>,
  } | null>(null);

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
    if (!resData.status) {
      console.log(resData.data);
      return;
    }
    setDbData(resData.data);
    
  }
  
  async function handleMarkNotificationRead(notificationID: string) {
    const token = await user?.getIdToken();
    await markNotificationAsRead(notificationID, token!);
    await fetchTeacher();
  }
  
  async function updateProfilePictureHandler(file: File) {
    const hash = await generateHash(file.name);
    try {
      const tId = toast.loading("Updating profile picture...");
      const urls = await fileStoreUploader(new Map<string, File>([[hash, file]]));
      const url = urls.get(hash) + "";
      const token = await user?.getIdToken();
      await updateTeacherInfo({ displayPicUrl: url }, token!);
      fetchTeacher();
      toast.success("Profile picture updated successfully", { id: tId });
    } catch (e: any) {
      toast.error("Failed to update profile picture");
    }
  }
  
  async function updateTeacherInfoHandler(update: { firstName?: string, lastName?: string, email?: string }) {
    try {
      const tId = toast.loading("Updating profile information...");
      const token = await user?.getIdToken();
      await updateTeacherInfo(update, token!);
      await fetchTeacher();
      toast.success("Profile information updated successfully", { id: tId });
    } catch (e: any) {
      toast.error("Failed to update profile information");
    } 
  }
  
  async function updateEmailHandler(newEmail: string) {
    try {
      const tId = toast.loading("Updating email...");
      const currentPassword = await prompt("Enter your password");
      if (!currentPassword) throw new Error("Password is required");
      const credential = EmailAuthProvider.credential(user!.email!, currentPassword);
      await reauthenticateWithCredential(user!, credential);
      await verifyBeforeUpdateEmail(user!, newEmail);
      toast.success("Verification email sent, Please verify to prevent login lockout", { id: tId });
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

  useEffect(() => {
    fetchTeacher();
  }, []);

  return (
    <>
      
      <PromptDialog state={promptState} setState={setPromptState} />
      
      <div className="p-4 space-y-6">
        <Title title="Profile" />
        
        {/* Profile Summary and Notifications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Profile Summary Section */}
            <div className="lg:w-2/5 border-r border-gray-200 pr-6">
              { dbData ? 
                <ProfileSummary teacherInfo={dbData} updateProfilePictureHandler={updateProfilePictureHandler} />
                : <p>Loading..</p>
              } 
            </div>

            {/* Notifications Section */}
            <div className="lg:w-3/5">
              { dbData ? (
                dbData.notifications.length === 0 ? 
                  <p>No notifications</p> :
                  <Notifications notifications={dbData.notifications} handleMarkNotificationRead={handleMarkNotificationRead} /> 
                )
                : <p>Loading</p>
              }            
            </div>
            
          </div>
        </div>

        {/* Personal Info and Password Change */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Personal Information Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {dbData ? 
              <PersonalInfoForm 
                data={dbData}
                emailVerified={dbData.email === email ? true : false}
                currentEmail={email}
                updateEmailHandler={updateEmailHandler}
                updateTeacherInfo={updateTeacherInfoHandler}
              /> : <p>Loading..</p>
            }
          </div>

          {/* Password Change Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <PasswordChangeForm 
              updatePasswordHandler={updatePasswordHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
}
