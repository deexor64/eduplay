"use client"

import PersonalInfoForm from "@/components/student/profile/PersonalInfoForm";
import ProfilePictureUpload from "@/components/student/profile/ProfilePictureUpload";
import PasswordChangeForm from "@/components/student/profile/PasswordChangeForm";
import { useContext, useEffect, useState } from "react";
import { updateStudentInfo } from "@/actions/student/updateStudentInfo";
import Assistant from "@/components/student/Assistant";
import { UserStatus } from "@prisma/client";
import Title from "@/components/student/Title";
import { AuthContext } from "@/contexts/AuthProvider";
import useFileStoreUploader from "@/hooks/useFileStoreUploader";
import generateHash from "@/lib/utils/generateHash";
import { EmailAuthProvider, reauthenticateWithCredential, sendEmailVerification, signOut, updateEmail, updatePassword } from "firebase/auth";
import { clientAuth } from "@/lib/firebaseClient";
import ListLoading from "@/components/student/loading/ListLoading";

export default function Profile() {
  
  const { userID, email, userType, role, status, user } = useContext(AuthContext);
  
  // FileStore handler
  const fileStoreUploader = useFileStoreUploader();

  // Assistant 
  const [assistantMessage, setAssistantMessage] = useState<{
    show: boolean,
    text: string,
    mood?: "happy" | "angry" | "sad" | "normal" | "scared" | "confused",
    type?: "normal" | "error" | "success" | "warning" | "info",
    question?: boolean,
    onAnswer?: (answer: boolean) => void,
  }>({show: false, text: ""});

  // State for student data
  const [dbData, setDbData] = useState<{
    userID: string,
    firstName: string,
    lastName: string,
    email: string,
    displayPicUrl: string,
    status: UserStatus,
    student: {
      studentID: string,
      indexNumber: string,
      grade: 1 | 2 | 3 | 4 | 5,
    }
  } | null>(null);

  // Fetch student data
  async function fetchStudent() {  

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
  
  async function updateProfilePictureHandler(file: File) {
    const hash = await generateHash(file.name);
    try {
      const urls = await fileStoreUploader(new Map<string, File>([[hash, file]]));
      const url = urls.get(hash) + "";
      const token = await user?.getIdToken();
      await updateStudentInfo({ displayPicUrl: url }, token!);
      fetchStudent();
      setAssistantMessage({
        show: true,
        text: "We updated your new photo, take a look",
      });
    } catch (e: any) {
      setAssistantMessage({
        show: true,
        text: "Ooops, Something is wrong, can you try again..",
      });
    }
  }
  
  async function updateStudentInfoHandler(update: any) {
    try {
      const token = await user?.getIdToken();
      await updateStudentInfo(update, token!);
      await fetchStudent();
      setAssistantMessage({
        show: true,
        text: "We updated your profile information",
      });
    } catch (e: any) {
      setAssistantMessage({
        show: true,
        text: "Ooops, Something is wrong, can you try again..",
      });
    } 
  }
  
  async function updatePasswordHandler(currentPassword: string, newPassword: string) {

    if (newPassword.length < 6) {
      setAssistantMessage({
        show: true,
        text: "Password must be at least 6 characters long!",
      });
      return;
    }
    
    // ISSUE: firebase silently fail for empty password
    try {
      const credential = EmailAuthProvider.credential(email!, currentPassword);
      await reauthenticateWithCredential(user!, credential);
      await updatePassword(user!, newPassword);
      setAssistantMessage({
        show: true,
        text: "We updated your password",
      });
    } catch (e: any) {
      setAssistantMessage({
        show: true,
        text: "Ooops, Something is wrong, may be your old password is incorrect",
      });
      throw new Error("Password update failed");
    }
  }
  
  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <>
      <div className="p-4 space-y-6">

        <Title title="Profile" imageUrl="/images/student/title-activities.png" />
        
        {
          !dbData && ( 
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <ListLoading />
              <div className="text-gray-500 mt-4">Loading profile...</div>
            </div>
          )
        }
        
        {/* Profile picture section */}
        {
          dbData && <ProfilePictureUpload 
            updateProfilePictureHandler={updateProfilePictureHandler}
            studentInfo={
              {
                currentImage: dbData.displayPicUrl,
                studentName: `${dbData.firstName} ${dbData.lastName}`,
                indexNumber: dbData.student.indexNumber,
                email: dbData.email,
                grade: dbData.student.grade,
                status: dbData.status
              }
            }
          />
        }
        
        {/* Personal info form */}
        {dbData && <PersonalInfoForm data={dbData} updateStudentInfo={updateStudentInfoHandler} />}
        
        {/* Password change */}
        {dbData && <PasswordChangeForm updatePasswordHandler={updatePasswordHandler} /> }

      </div>

      {/* Assistant */}
      <Assistant assistantMessage={assistantMessage} setAssistantMessage={setAssistantMessage} />

    </>
  );
}
