import { usePathname, useParams } from 'next/navigation';
import { UserType } from '../lib/utils/types';

export default function useUserType(): UserType {
  
  const users: UserType[] = ["ADMIN", "TEACHER", "PARENT", "UNKNOWN"];
  
  const params = useParams();
  const dynamicUser = String(params.userType).toUpperCase(); // userType slug
  const staticUser = usePathname().split("/")[1].toUpperCase(); // url path
  const cookieUser = "UNKNOWN"; // from cookie

  if (users.includes(dynamicUser as UserType)) return dynamicUser as UserType;
  if (users.includes(staticUser as UserType)) return staticUser as UserType;
  if (users.includes(cookieUser as UserType)) return cookieUser as UserType;
  
  return "UNKNOWN";
  
}
