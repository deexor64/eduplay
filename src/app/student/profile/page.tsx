"use client"

import StudentNavigatorLayout from "@/components/student/StudentNavigatorLayout";
import PersonalInfoForm from "@/components/student/profile/PersonalInfoForm";
import AcademicInfoForm from "@/components/student/profile/AcademicInfoForm";
import ProfilePictureUpload from "@/components/student/profile/ProfilePictureUpload";
import PasswordChangeForm from "@/components/student/profile/PasswordChangeForm";
import { useEffect, useState } from "react";
import { updateStudentInfo } from "@/actions/student/updateStudentInfo";

// Not completed ......

export default function StudentProfile() {
  // State for student data
  const [studentData, setStudentData] = useState<any>(null);

  // Fetch student data (replace with real API call)
  useEffect(() => {

    // Under development ....
    async function fetchStudent() {
      
      const res = await fetch("/api/profile");
      const data = await res.json();
      setStudentData(data.data);
      console.log(data.data)
    }
    fetchStudent();
  }, []);

  // Handler for updating personal info
  async function handleUpdatePersonalInfo(updated: any) {
    if (!studentData) return;
    await updateStudentInfo(studentData.student.studentID, updated);
    setStudentData((prev: any) => ({
      ...prev,
      user: { ...prev.user, ...updated },
    }));
  }

  // Handler for updating academic info
  async function handleUpdateAcademicInfo(updated: any) {
    if (!studentData) return;
    await updateStudentInfo(studentData.student.studentID, updated);
    setStudentData((prev: any) => ({
      ...prev,
      student: { ...prev.student, ...updated },
    }));
  }
  
  if (!studentData) return null;

  return (
    <StudentNavigatorLayout>
      <div className="p-4 space-y-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Update your personal information</p>
        </div>
        {  studentData ? (
          <>
          <ProfilePictureUpload 
            currentImage={studentData.displayPicUrl}
            studentName={`${studentData.firstName} ${studentData.lastName}`}
          />
          <PersonalInfoForm data={studentData} onSave={handleUpdatePersonalInfo} />
          <AcademicInfoForm data={studentData.student} onSave={handleUpdateAcademicInfo} />
          <PasswordChangeForm />
          </>
        ) : (
          <div className="p-8 text-center text-lg text-gray-500">Loading profile...</div>
        )}
      </div>
    </StudentNavigatorLayout>
  );
} 