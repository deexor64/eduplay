import { adminAuth } from "@/lib/firebaseAdmin";
import { TeacherRole, UserStatus, UserType } from "@prisma/client";

export default async function userPermissionCheck(firebaseToken: string | undefined, userType: UserType[],
  role: TeacherRole[], status: UserStatus[] ): Promise<{ status: boolean; data: any }> {
  
  // No token provided
  if (!firebaseToken) return { status: false, data: "Unauthorized, No token provided" };

  try {
    
    // Verify Firebase ID token on server
    const decoded = await adminAuth.verifyIdToken(firebaseToken);

    // Check userType claim
    if (userType.length > 0 && !userType.includes(decoded.userType)) return { status: false, data: "User is unauthorized" };

    // Check role claim if applicable
    if (role?.length && decoded.role && !role.includes(decoded.role)) return { status: false, data: "User role is unauthorized" };

    // Check status claim if applicable
    if (status.length > 0 && decoded.status && !status.includes(decoded.status)) return { status: false, data: "User status is unauthorized" };

    // All checks passed
    return { status: true, data: decoded };

  } catch {
    
    // Token invalid or expired
    return { status: false, data: "Unauthorized, Invalid token" };
    
  }
  
}
