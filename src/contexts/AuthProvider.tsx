"use client";

// Use authWrapper 

import { createContext } from "react";
import { TeacherRole, UserType } from "@/lib/utils/types";

type AuthContextType = {
  userType: UserType;
  teacherRole: TeacherRole;
};

export const AuthContext = createContext<AuthContextType>({
  userType: "UNKNOWN",
  teacherRole: "UNKNOWN",
});

export default function AuthProvider({
  children,
  userType,
  teacherRole,
}: {
  children: React.ReactNode;
  userType: UserType;
  teacherRole: TeacherRole;
}) {
  return (
    <AuthContext.Provider value={{ userType: userType, teacherRole: teacherRole }}>
      {children}
    </AuthContext.Provider>
  );
}
