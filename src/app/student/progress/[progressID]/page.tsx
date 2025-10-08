"use client"

import ViewActivityLayout from "@/components/templates/ViewActivityLayout";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import { UserStatus, UserType } from "@prisma/client";
import Unauthorized from "@/components/shared/loading/Unauthorized";

export default function Progress() {
  
  const { userID, email, userType, role, status, user } = useContext(AuthContext);
  if (userType != UserType.STUDENT || status != UserStatus.ACTIVE) {
    return <Unauthorized />;
  }

  return <ViewActivityLayout viewMode="PROGRESS" />

}
