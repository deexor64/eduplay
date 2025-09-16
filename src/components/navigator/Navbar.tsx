'use client';

import { useRouter } from 'next/navigation';
import { faBell, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '@/contexts/AuthProvider';
import { useContext } from 'react';
import { clientAuth } from "@/lib/firebaseClient";
import { signOut } from "firebase/auth";
import useConfirm from "@/hooks/useConfirm";
import { ConfirmDialog } from '../shared/popups/confirmDialog';

export default function Navbar() {

  const { userType } = useContext(AuthContext);
  const { confirm, state, setState } = useConfirm();
  
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

  return (
    <div className="w-full h-16 bg-blue-950 flex justify-between items-center 
      p-4 shadow-md sticky top-0 z-20 ">
        
      <div
        className="text-white font-bold cursor-pointer"
        onClick={ routeBackToDashboard}>
        <span className="text-xl">EduPlay</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-white cursor-pointer"><FontAwesomeIcon icon={faBell} /></button>
        <img src="/images/avatar.png" className="w-8 h-8 rounded-full" alt="Profile" />
        <button className="text-white cursor-pointer" onClick={async() => await logOut()}><FontAwesomeIcon icon={faSignOut} /></button>
      </div>
      
      <ConfirmDialog state={state} setState={setState} />
      
    </div>
  );
}
