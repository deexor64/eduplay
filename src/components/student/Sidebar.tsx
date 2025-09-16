import React from "react";
import Image from "next/image";
import Link from "next/link";
import useConfirm from "@/hooks/useConfirm";
import { signOut } from "firebase/auth";
import { clientAuth } from "@/lib/firebaseClient";
import { ConfirmDialog } from "../shared/popups/confirmDialog";

// LeftSidebar: Book, Cup, and Wrench
export function LeftSidebar() {
  return (
    <div className="fixed top-0 left-0 h-full w-28 flex flex-col justify-evenly items-center pt-5 gap-8 z-40">
      {/* Activities */}
      <Link href="/student/activities" title="Activities">
        <div className="transition-transform duration-200 hover:scale-110 drop-shadow-white drop-shadow-xl  cursor-pointer bg-transparent rounded-lg">
          <Image src="/images/student/activities.png" alt="Book" width={80} height={80} />
        </div>
      </Link>
      {/* Games */}
      <Link href="/student/games" title="Games">
        <div className="transition-transform duration-200 hover:scale-110 drop-shadow-fuchsia-500 drop-shadow-xl  cursor-pointer bg-transparent rounded-lg">
          <Image src="/images/student/games.png" alt="Settings" width={100} height={100} />
        </div>
      </Link>
      {/* Progress */}
      <Link href="/student/progress" title="Progress">
        <div className="transition-transform duration-200 hover:scale-110 drop-shadow-amber-400 drop-shadow-xl  cursor-pointer bg-transparent rounded-lg mt-5">
          <Image src="/images/student/progress.png" alt="Cup" width={50} height={50} />
        </div>
      </Link>
    </div>
  );
}

// RightSidebar: Assistant, Guide, Notifications, and Quick Actions
export function RightSidebar() {
  
  const { confirm, state, setState } = useConfirm();
  
  // Logout
  async function logOut() {
    const ok = await confirm("Do you really want to Logout?");
    if (ok) signOut(clientAuth);
  }
  
  return (
    <div className="fixed top-0 right-0 h-full w-28 flex flex-col justify-evenly items-center pt-5 gap-8 z-40">
      {/* Avatar */}
      <Link href="/student/profile" title="Settings">
        <div title="You" className="transition-transform duration-200 hover:scale-110 drop-shadow-gray-400 drop-shadow-xl  cursor-pointer bg-transparent rounded-lg ">
          <Image src="/images/student/avatar.png" alt="You" width={80} height={80} />
        </div>
      </Link>
      {/* Notifications */}
      <div title="Notifications" className="transition-transform duration-200 hover:scale-110 drop-shadow-amber-400 drop-shadow-xl  cursor-pointer bg-transparent rounded-lg mt-5">
        <Image src="/images/student/envelop.png" alt="Notifications" width={60} height={60} />
      </div>
      {/* Logout */}
      <button title="Logout" onClick={logOut} className="transition-transform duration-200 hover:scale-110 drop-shadow-orange-600 drop-shadow-xl  cursor-pointer bg-transparent rounded-lg">
        <Image src="/images/student/logout.png" alt="Logout" width={70} height={70} />
      </button>
      
      <ConfirmDialog state={state} setState={setState} />
      
    </div>
  );
}
