"use client";

// To be used with authProvider context

import { AuthContext } from "@/contexts/AuthProvider";
import { useContext } from "react";

export default function useAuth() {
  return useContext(AuthContext);
}

// usage
/*

  import { useAuth } from "@/hooks/useAuth";
  
  export default function Component() {
    const { userType, permissionLevel } = useAuth();
    // ...
  }
  
*/