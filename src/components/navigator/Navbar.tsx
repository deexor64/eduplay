'use client';

import { useRouter } from 'next/navigation';
import { faBell, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '@/contexts/AuthProvider';
import { useContext, useEffect, useState } from 'react';
import { clientAuth } from "@/lib/firebaseClient";
import { signOut } from "firebase/auth";
import useConfirm from "@/hooks/useConfirm";
import { ConfirmDialog } from '../shared/popups/confirmDialog';
import { getNavigatorInfo } from '@/actions/navigator/getNavigatorInfo';

export default function Navbar() {

  const { userType, user } = useContext(AuthContext);
  const { confirm, confirmState, setConfirmState } = useConfirm();
  
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
  
  // Logout
  async function logOut() {
    const ok = await confirm("Do you really want to Logout?");
    if (ok) signOut(clientAuth);
  }

  function goToProfile() {
    router.push(`/${userType?.toLowerCase()}/profile`);
  }

  return (
    <div className="w-full h-16 bg-blue-950 flex justify-between items-center 
      p-4 shadow-md sticky top-0 z-20 ">
        
      <div
        className="text-white font-bold cursor-pointer"
        onClick={ routeBackToDashboard}>
        <span className="text-xl">EduPlay</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <p className="text-white">{navigatorInfo.firstName} {navigatorInfo.lastName}</p>
        <img src={navigatorInfo.displayPicUrl} className="w-8 h-8 rounded-full cursor-pointer" alt="Profile" onClick={goToProfile}/>
        <button className="relative text-white cursor-pointer" onClick={goToProfile}>
          <FontAwesomeIcon icon={faBell} />
          { (navigatorInfo.unreadCount ?? 0) > 0 && (
            <span className="absolute -top-3 -right-2 bg-red-500 text-white text-xs rounded-full px-1 min-w-[18px] text-center">
              {navigatorInfo.unreadCount}
            </span>
          )}
        </button>
        <button className="text-white cursor-pointer" onClick={async() => await logOut()}><FontAwesomeIcon icon={faSignOut} /></button>
      </div>
      
      <ConfirmDialog state={confirmState} setState={setConfirmState} />
      
    </div>
  );
}
