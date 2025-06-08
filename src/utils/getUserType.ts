import { usePathname, useParams } from 'next/navigation';

export default function getUserType() {

  const pathName = usePathname();
  const params = useParams();
  
  if (params.userType) return params.userType;
  else return pathName.split("/")[1];

}