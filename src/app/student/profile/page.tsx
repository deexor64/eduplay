"use client"

import StudentNavigatorLayout from "@/components/student/StudentNavigatorLayout";
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
  }>({
    userID: "",
    firstName: "-",
    lastName: "-",
    email: "",
    displayPicUrl: "-",
    status: "ACTIVE",
    student: {
      studentID: "",
      indexNumber: "",
      grade: 1,
    }
  });

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
    setDbData(resData.data);

  }

  async function updateStudentInfoHandler(update: any) {
    
    const token = await user?.getIdToken();
    
    await updateStudentInfo(update, token!);
    await fetchStudent();
    try {
      setAssistantMessage({
        show: true,
        text: "Profile updated successfully",
      });
    } catch (e: any) {
      setAssistantMessage({
        show: true,
        text: e.message,
      });
    }
  }
  
  async function updateProfilePictureHandler(file: File): Promise<string> {
    const hash = await generateHash(file.name);
    try {
      const urls = await fileStoreUploader(new Map<string, File>([[hash, file]]));
      const url = urls.get(hash) + "";
      const token = await user?.getIdToken();
      await updateStudentInfo({ displayPicUrl: url }, token!);
      return url;
    } catch (e: any) {
      setAssistantMessage({
        show: true,
        text: e.message,
      });
      return "";
    }
  }

  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <>
    <StudentNavigatorLayout>
      <div className="p-4 space-y-6">

        <Title title="Profile" imageUrl="/images/student/title-activities.png" />
        
        <ProfilePictureUpload 
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
        <PersonalInfoForm data={dbData} updateStudentInfo={updateStudentInfoHandler} />
        {/* TODO: implement password change */}
        <PasswordChangeForm />

      </div>
    </StudentNavigatorLayout>

    {/* Assistant */}
    <Assistant assistantMessage={assistantMessage} setAssistantMessage={setAssistantMessage} />

    </>
  );
}
