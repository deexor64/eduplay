"use client"

import ViewActivityLayout from "@/components/templates/ViewActivityLayout";
import TemplateProvider from "@/contexts/TemplateProvider";
import { TeacherRole, UserStatus } from "@prisma/client";
import Unauthorized from "@/components/shared/loading/Unauthorized";
import { AuthContext } from "@/contexts/AuthProvider";
import { useContext } from "react";

export default function Sample() {
  
  const { userID, email, userType, role, status, user } = useContext(AuthContext);
  if (status != UserStatus.ACTIVE) {
    return <Unauthorized />;
  }

  return (
    <TemplateProvider>
      <div className="student-page">
        <ViewActivityLayout viewMode="SAMPLE" />
      </div>
    </TemplateProvider>
  )

}
