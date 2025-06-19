import { usePathname, useParams } from 'next/navigation';
import { UserType } from '../lib/utils/types';

export default function useUserType(): UserType {
  
  const users: UserType[] = ["admin", "teacher", "parent", "unknown"];
  
  const params = useParams();
  const dynamicUser = String(params.userType); // userType slug
  const staticUser = usePathname().split("/")[1]; // url path
  const cookieUser = "unknown"; // from cookie
  
  console.log(dynamicUser)

  if (users.includes(dynamicUser as UserType)) return dynamicUser as UserType;
  if (users.includes(staticUser as UserType)) return staticUser as UserType;
  if (users.includes(cookieUser as UserType)) return cookieUser as UserType;
  
  return "unknown";
  
}
