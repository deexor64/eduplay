import StudentNavigatorLayout from "@/components/student/StudentNavigatorLayout";
import PersonalInfoForm from "@/components/student/profile/PersonalInfoForm";
import AcademicInfoForm from "@/components/student/profile/AcademicInfoForm";
import ProfilePictureUpload from "@/components/student/profile/ProfilePictureUpload";
import PasswordChangeForm from "@/components/student/profile/PasswordChangeForm";

export default function StudentProfile() {
  // TODO: Replace with real data fetching
  const mockStudentData = {
    user: {
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "+1234567890",
      dateOfBirth: "2010-05-15",
      displayPicUrl: "/images/avatar.png",
    },
    student: {
      email: "john.doe@school.com",
      grade: 5,
      class: "A",
      indexNumber: "STU001",
    },
  };

  return (
    <StudentNavigatorLayout>
      <div className="p-4 space-y-6">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Update your personal information</p>
        </div>
        
        <ProfilePictureUpload 
          currentImage={mockStudentData.user.displayPicUrl}
          studentName={`${mockStudentData.user.firstName} ${mockStudentData.user.lastName}`}
        />
        
        <PersonalInfoForm data={mockStudentData.user} />
        
        <AcademicInfoForm data={mockStudentData.student} />
        
        <PasswordChangeForm />
        
      </div>
    </StudentNavigatorLayout>
  );
} 