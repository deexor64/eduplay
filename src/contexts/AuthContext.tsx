"use client";

import React, { createContext, useState, ReactNode } from "react";
import { UserType } from "@/lib/utils/types";

interface AuthContextProps {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<UserType>("UNKNOWN");

  return (
    <AuthContext.Provider value={{ userType, setUserType }}>
      {children}
    </AuthContext.Provider>
  );
  
}
