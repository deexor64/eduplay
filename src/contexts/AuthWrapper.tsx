import AuthProvider from "@/contexts/AuthProvider";
import { UserType } from "@/lib/utils/types";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

type AuthWrapperProps = {
  allowedUserTypes: UserType[];
  children: React.ReactNode;
};

export default async function AuthWrapper({ children, allowedUserTypes }: AuthWrapperProps) {
  
  const token = (await cookies()).get("userInfo")?.value;

  if (!token) redirect("/"); // redirect to site home if no token

  let userType: UserType = "UNKNOWN";
  let permissionLevel = 0;

  try {
    
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userType: UserType;
      permissionLevel: number;
    };

    userType = decoded.userType;
    permissionLevel = decoded.permissionLevel;
    
    // user not allowed
    if (!allowedUserTypes.includes(userType)) redirect("/unauthorized");
    
    console.log(userType)

  } catch (err) {
    console.error("Invalid token", err);
    if (!token) redirect("/"); // redirect to site home if no valid token
  }

  return (
    <AuthProvider userType={userType} permissionLevel={permissionLevel}>
      {children}
    </AuthProvider>
  );
}

// Usage
/*

  import AuthWrapper from "@/contexts/AuthWrapper";
  
  export default function Component() {
    return (
      <AuthWrapper allowedUserTypes={["TEACHER", "ADMIN"]}>
        <ClientComponent />
      </AuthWrapper>
    );
  }

*/
