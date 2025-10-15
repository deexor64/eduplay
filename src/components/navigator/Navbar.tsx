'use client';

import { useRouter } from 'next/navigation';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '@/contexts/AuthProvider';
import { useContext, useEffect, useState } from 'react';
import { getNavigatorInfo } from '@/actions/navigator/getNavigatorInfo';

export default function Navbar() {

  const { userType, user } = useContext(AuthContext);
  
  // User info shown on top
  const [navigatorInfo, setNavigatorInfo] = useState<{
    displayPicUrl:string,
    firstName:string,
    lastName:string,
    unreadCount?: number,
  }>({
    displayPicUrl: "/images/avatar.png",
    firstName: user?.displayName?.split(' ')[0] || '',
    lastName: user?.displayName?.split(' ')[1] || '',
    unreadCount: 0,
  })
  
  async function fetchNavigatorInfo() {
    const token = await user?.getIdToken();
    try {
      const info = await getNavigatorInfo(token!)
      setNavigatorInfo(info as any);
    } catch (error) {
      console.log("Server error");
    }
  }
  
  useEffect(() => {
    fetchNavigatorInfo();
  }, [user]);

  // route back to dashboard
  const router = useRouter();
  function routeBackToDashboard() { 
    router.push(`/${userType?.toLowerCase()}/`)
  }

  function goToProfile() {
    router.push(`/${userType?.toLowerCase()}/profile`);
  }

  return (
    <div className="w-full h-16 bg-blue-950 flex justify-between items-center 
      p-4 pr-6 pl-6 shadow-md sticky top-0 z-20 ">
        
      <div
        className="text-white font-bold cursor-pointer"
        onClick={ routeBackToDashboard}>
        <span className="text-xl">EduPlay</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <p className="text-white font-bold">{navigatorInfo.firstName} {navigatorInfo.lastName}</p>
        <div className="relative">
          <img src={navigatorInfo.displayPicUrl} className="w-8 h-8 rounded-full cursor-pointer" alt="Profile" onClick={goToProfile}/>
          { (navigatorInfo.unreadCount ?? 0) > 0 && (
            <span className="h-3 w-3 absolute top-6 -right-2 bg-emerald-300 text-white text-xs rounded-full text-center">
              {/*{navigatorInfo.unreadCount}*/}
            </span>
          )}
        </div>
      </div>
      
    </div>
  );
}
