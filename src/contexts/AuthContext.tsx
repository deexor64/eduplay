"use client";

import React, { createContext, useState, ReactNode } from "react";
import { UserType } from "@/lib/utils/types";

interface AuthContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<UserType>("unknown");

  return (
    <AuthContext.Provider value={{ userType, setUserType }}>
      {children}
    </AuthContext.Provider>
  );
}
