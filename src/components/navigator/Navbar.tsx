'use client';

import { useRouter } from 'next/navigation';
import useAuth from "@/hooks/useAuth";
import { faBell, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Navbar() {

  const { userType, teacherRole } = useAuth();
  
  // route back to dashboard
  const router = useRouter();
  function routeBackToDashboard() { 
    router.push(`/${userType.toLowerCase()}/`)
  }

  return (
    <div className="w-full h-16 bg-blue-950 flex justify-between items-center 
      p-4 shadow-md sticky top-0 z-20 ">
      <div
        className="text-white font-bold cursor-pointer"
        onClick={ routeBackToDashboard}>
        <span className="text-xl">EduSoft</span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-white"><FontAwesomeIcon icon={faBell} /></button>
        <img src="/images/avatar.png" className="w-8 h-8 rounded-full" alt="Profile" />
        <button className="text-white"><FontAwesomeIcon icon={faSignOut} /></button>
      </div>
    </div>
  );
}
