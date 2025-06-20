'use client';

import { usePathname, useRouter } from 'next/navigation';
import getUserType from '@/hooks/useUserType';

export default function Navbar(props: any) {

  const userType = getUserType();
  
  // route back to dashboard
  const router = useRouter();
  function routeBackToDashboard() { 
    router.push(`/${userType.toLowerCase()}/dashboard`)
  }

  return (
    <div className="w-full h-16 bg-blue-600 flex justify-between items-center 
      px-4 shadow-md fixed z-20">
      <div
        className="text-white font-bold cursor-pointer"
        onClick={routeBackToDashboard}>
        <span className="text-xl">EduSoft</span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-white">Logout</button>
        <img src="/profile.png" className="w-8 h-8 rounded-full" alt="Profile" />
        <button className="text-white">🔔</button>
      </div>
    </div>
  );
}
