"use client";

// Use authWrapper 

import { createContext } from "react";
import { UserType } from "@/lib/utils/types";

type AuthContextType = {
  userType: UserType;
  permissionLevel: number;
};

export const AuthContext = createContext<AuthContextType>({
  userType: "UNKNOWN",
  permissionLevel: 0,
});

export default function AuthProvider({
  children,
  userType,
  permissionLevel,
}: {
  children: React.ReactNode;
  userType: UserType;
  permissionLevel: number;
}) {
  return (
    <AuthContext.Provider value={{ userType: userType, permissionLevel: permissionLevel }}>
      {children}
    </AuthContext.Provider>
  );
}
