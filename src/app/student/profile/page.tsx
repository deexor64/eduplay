"use client"

import StudentNavigatorLayout from "@/components/student/StudentNavigatorLayout";
import PersonalInfoForm from "@/components/student/profile/PersonalInfoForm";
import AcademicInfoForm from "@/components/student/profile/AcademicInfoForm";
import ProfilePictureUpload from "@/components/student/profile/ProfilePictureUpload";
import PasswordChangeForm from "@/components/student/profile/PasswordChangeForm";
import ParentInfoCard from "@/components/student/profile/ParentInfoCard";
import { useEffect, useState } from "react";
import { updateStudentInfo } from "@/actions/student/updateStudentInfo";
import Assistant from "@/components/student/Assistant";
import { StudentClass, UserStatus } from "@prisma/client";
import { EdgeStoreProvider } from "@/lib/edgestore";

export default function StudentProfile() {

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
    phoneNumber?: string,
    dateOfBirth?: string,
    displayPicUrl: string,
    status: UserStatus,
    student: {
      studentID: string,
      indexNumber: string,
      email: string,
      grade: 1 | 2 | 3 | 4 | 5,
      class: StudentClass,
      parent: {
        parentID: string,
        email: string,
        user: {
          userID: string,
          firstName: string,
          lastName: string,
          displayPicUrl: string,
        }
      }
    }
  }>({
    userID: "",
    firstName: "-",
    lastName: "-",
    phoneNumber: "-",
    dateOfBirth: "-",
    displayPicUrl: "-",
    status: "INACTIVE",
    student: {
      studentID: "",
      indexNumber: "",
      email: "",
      grade: 1,
      class: "A",
      parent: {
        parentID: "",
        email: "",
        user: {
          userID: "",
          firstName: "",
          lastName: "",
          displayPicUrl: "/images/avatar.png",
        }
      }
    }
  });

  // Fetch student data
  async function fetchStudent() {  

    const res = await fetch("/api/profile");

    const resData = await res.json();
    setDbData(resData.data);

  }

  async function updateStudentInfoHandler(update: any) {
    await updateStudentInfo(update);
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

  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <>
    <EdgeStoreProvider>
    <StudentNavigatorLayout>
      <div className="p-4 space-y-6">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Update your personal information</p>
        </div>
        
        {/* ISSUE: Image selection window doesn't open */}
        <ProfilePictureUpload 
          currentImage={dbData.displayPicUrl}
          studentName={`${dbData.firstName} ${dbData.lastName}`}
          updateStudentInfo={updateStudentInfoHandler}
          studentInfo={{
            indexNumber: dbData.student.indexNumber,
            email: dbData.student.email,
            grade: dbData.student.grade,
            class: dbData.student.class,
            status: dbData.status
          }}
        />
        <PersonalInfoForm data={dbData} updateStudentInfo={updateStudentInfoHandler} />
        <AcademicInfoForm data={dbData.student} updateStudentInfo={updateStudentInfoHandler} />
        <ParentInfoCard parent={dbData.student.parent} />
        {/* TODO: implement password change */}
        <PasswordChangeForm />

      </div>
    </StudentNavigatorLayout>
    </EdgeStoreProvider>

    {/* Assistant */}
    <Assistant assistantMessage={assistantMessage} setAssistantMessage={setAssistantMessage} />

    </>
  );
}
