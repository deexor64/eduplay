"use client";

import { usePathname, redirect } from "next/navigation";
import { useEffect, useState, createContext } from "react";
import { getIdTokenResult } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { clientAuth } from "@/lib/firebaseClient";
import { TeacherRole, UserStatus, UserType } from "@prisma/client";
import Loading from "@/components/Loading";

/*

  import { AuthProvider } from "@/contexts/AuthProvider";
  
  export default function Component() {
    return (
      <AuthProvider
        userType={["TEACHER", "ADMIN"]} // allowed user types
        role={[]}                       // allowed roles (empty = allow all)
        status={["ACTIVE"]}             // allowed statuses
      >
        <ClientComponent />
      </AuthProvider>
    );
  }

*/

type AuthContextType = {
  userID: string | undefined;
  email: string | undefined;
  userType: UserType | undefined;
  role: TeacherRole | undefined;
  status: UserStatus | undefined;
};

export const AuthContext = createContext<AuthContextType>({
  userID: undefined,
  email: undefined,
  userType: undefined,
  role: undefined,
  status: undefined,
});

export function AuthProvider({ children, userType, role, status }:
  { children: React.ReactNode, userType: string[], role: string[], status: string[]}) {
    
  type UserToken = {
    user_id: string;
    email: string;
    userType: string;
    status: string;
    role?: string;
  };
  
  const pathname = usePathname(); // current url
  
  const [user, loading] = useAuthState(clientAuth);
  const [claims, setClaims] = useState<UserToken | null>(null);
  const [authorized, setAuthorized] = useState<boolean>(false);

  // Redirect if not logged in or loading
  useEffect(() => {
    
    if (loading) return;
  
    if (!user) {
      console.log("AUTH: No user");
      if (!pathname.startsWith("/auth")) redirect("/auth/signin");
      return;
    }
  
    if (!claims) {
      console.log("AUTH: fetching claims");
      (async () => {
        const token = await getIdTokenResult(user, true);
        setClaims(token.claims as UserToken);
      })();
      return;
    }
  
    console.log("AUTH: User exists ", claims);
    
    if (!user.emailVerified) {
      console.log("AUTH: Email not verified");
      if (!pathname.startsWith("/auth")) redirect("/auth/signin");
    }
  
    // Validate claims
    if (
      userType.length > 0 &&
      claims.userType &&
      !userType.includes(claims.userType)
    )
    if (!pathname.startsWith("/auth")) redirect("/auth/signin");
  
    if (
      role.length > 0 &&
      claims.role &&
      !role.includes(claims.role)
    )
    if (!pathname.startsWith("/auth")) redirect("/auth/signin");
  
    if (
      status.length > 0 &&
      claims.status &&
      !status.includes(claims.status)
    )
    if (!pathname.startsWith("/auth")) redirect("/auth/signin");
    
    // Set authorized status
    setAuthorized(true);
    
  }, [user, claims, loading, userType, role, status]);


  if (!authorized || !claims) return <Loading />;

  return (
    <AuthContext.Provider value={{ userID: claims.user_id, email: claims.email, 
      userType: claims.userType as UserType, role: claims.role as TeacherRole | undefined, 
      status: claims.status as UserStatus }}>
      {children}
    </AuthContext.Provider>
  );
}
