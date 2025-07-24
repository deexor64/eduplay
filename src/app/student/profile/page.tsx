"use client"

import StudentNavigatorLayout from "@/components/student/StudentNavigatorLayout";
import PersonalInfoForm from "@/components/student/profile/PersonalInfoForm";
import AcademicInfoForm from "@/components/student/profile/AcademicInfoForm";
import ProfilePictureUpload from "@/components/student/profile/ProfilePictureUpload";
import PasswordChangeForm from "@/components/student/profile/PasswordChangeForm";
import { useEffect, useState } from "react";

export default function StudentProfile() {

  // State for student data
  const [dbData, setDbData] = useState<{
    firstName: string,
    lastName: string,
    phoneNumber?: string,
    dateOfBirth?: string,
    displayPicUrl: string,
    student: {
      email: string,
      grade?: number,
      class?: string,
      indexNumber: string,
    }
  }>({
    firstName: "-",
    lastName: "-",
    phoneNumber: "-",
    dateOfBirth: "-",
    displayPicUrl: "-",
    student: {
      email: "-",
      grade: 0,
      class: "-",
      indexNumber: "-",
    }
  });

  // Fetch student data
  async function fetchStudent() {   
    const res = await fetch("/api/profile");
    const resData = await res.json();
    setDbData(resData.data);
  }

  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <StudentNavigatorLayout>
      <div className="p-4 space-y-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Update your personal information</p>
        </div>
        
        <ProfilePictureUpload 
          currentImage={dbData.displayPicUrl}
          studentName={`${dbData.firstName} ${dbData.lastName}`}
        />
        <PersonalInfoForm data={dbData} onUpdatePersonalInfo={fetchStudent} />
        <AcademicInfoForm data={dbData.student} onUpdateAcademicInfo={fetchStudent} />
        <PasswordChangeForm />

       </div>
    </StudentNavigatorLayout>
  );
} 