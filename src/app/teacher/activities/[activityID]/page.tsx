"use client"

import Unauthorized from "@/components/shared/loading/Unauthorized";
import ViewActivityLayout from "@/components/templates/ViewActivityLayout";
import { AuthContext } from "@/contexts/AuthProvider";
import TemplateProvider from "@/contexts/TemplateProvider";
import { TeacherRole, UserStatus } from "@prisma/client";
import { useContext } from "react";

export default function Activity() {
  
  const { userID, email, userType, role, status, user } = useContext(AuthContext);
  if (status != UserStatus.ACTIVE) {
    return <Unauthorized />;
  }

  return (
    <TemplateProvider>
      <div className="student-page">
        <ViewActivityLayout viewMode="PREVIEW"/>
      </div>
    </TemplateProvider>
  )

}
