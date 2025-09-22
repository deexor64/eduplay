"use client";

import { usePathname, redirect } from "next/navigation";
import { useEffect, useState, createContext } from "react";
import { getIdTokenResult, User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { clientAuth } from "@/lib/firebaseClient";
import { TeacherRole, UserStatus, UserType } from "@prisma/client";
import CatLoading from "@/components/shared/loading/CatLoading";

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

/*
  const { userID, email, userType, role, status, verified } = useContext(AuthContext);
*/

type AuthContextType = {
  userID: string | undefined;
  email: string | undefined;
  userType: UserType | undefined;
  role: TeacherRole | undefined;
  status: UserStatus | undefined;
  user: User | undefined;
};

export const AuthContext = createContext<AuthContextType>({
  userID: undefined,
  email: undefined,
  userType: undefined,
  role: undefined,
  status: undefined,
  user: undefined,
});

export function AuthProvider({ children, userType, role, status }:
  { children: React.ReactNode, userType: string[], role: string[], status: string[]}) {
    
  type UserToken = {
    user_id: string | undefined;
    email: string | undefined;
    userType: UserType | undefined;
    status: UserStatus | undefined;
    role?: TeacherRole | undefined;
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
      
      if (pathname.startsWith("/auth")) { 
        setAuthorized(true);
        return;
      }
      
      redirect("/auth/signin");
      return;
    }
    
    console.log("AUTH: User exists ");
    console.log("AUTH: fetching claims");
    
    if (!claims) return;
    console.log("AUTH: ", claims);
    
    if (pathname.startsWith("/auth")) { 
      setAuthorized(true);
      return;
    }
    
    // Authenticate
    if (!user.emailVerified) {
      console.log("AUTH: Email not verified");
      redirect("/auth/signin");
      return;
    }
    
    if ( userType.length > 0 &&  claims.userType &&  !userType.includes(claims.userType)) {
      console.log("AUTH: User type not allowed");
      redirect("/auth/signin");
      return;
    }
  
    if ( role.length > 0 && claims.role && !role.includes(claims.role)){
      console.log("AUTH: Role not allowed");
      redirect("/auth/signin");
      return;
    }
    
    if ( status.length > 0 && claims.status && !status.includes(claims.status)) {
      console.log("AUTH: Status not allowed");
      if (claims.status === "ACTIVE" || claims.status === "SUSPENDED") redirect(`/${claims.userType?.toLowerCase()}/profile`);
      else redirect("/auth/signin");
      return;
    }
    
    // Set authorized status
    setAuthorized(true);
    
  }, [user, claims, loading, userType, role, status]);
  
  useEffect(() => {
    
    if (!user) return;
  
    (async () => {
      const token = await getIdTokenResult(user, true);
      setClaims(token.claims as UserToken);
    })();
    
  }, [user]);

  if (!authorized) return <CatLoading />;

  return user && claims ? (
    <AuthContext.Provider value={{ userID: claims.user_id, email: claims.email, 
      userType: claims.userType, role: claims.role, 
      status: claims.status as UserStatus, user: user }}>
      {children}
    </AuthContext.Provider>
  ) : (
    <AuthContext.Provider value={{ userID: undefined, email: undefined, 
      userType: undefined, role: undefined, status: undefined, user: undefined }}>
      {children}
    </AuthContext.Provider>
  );
  
}
