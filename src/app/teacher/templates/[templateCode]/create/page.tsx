"use client"

import { EdgeStoreProvider } from "@/lib/edgestore";
import CreateActivityLayout from "@/components/templates/CreateActivityLayout";
import TemplateProvider from "@/contexts/TemplateProvider";
import { AuthContext } from "@/contexts/AuthProvider";
import { useContext } from "react";
import { TeacherRole, UserStatus } from "@prisma/client";
import Unauthorized from "@/components/shared/loading/Unauthorized";


export default function Create() {
  
  const { userID, email, userType, role, status, user } = useContext(AuthContext);
  if (status != UserStatus.ACTIVE) {
    return <Unauthorized />;
  }
  
  return (
    <EdgeStoreProvider>
      <TemplateProvider>
        <CreateActivityLayout /> 
      </TemplateProvider>
    </EdgeStoreProvider>
  )
};
