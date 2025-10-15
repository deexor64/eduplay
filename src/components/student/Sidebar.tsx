"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useConfirm from "@/hooks/useConfirm";
import { signOut } from "firebase/auth";
import { clientAuth } from "@/lib/firebaseClient";
import { ConfirmDialog } from "../shared/popups/confirmDialog";
import { AuthContext } from "@/contexts/AuthProvider";
import { getNavigatorInfo } from "@/actions/navigator/getNavigatorInfo";

export function LeftSidebar() {

  return (
    <div className="fixed top-0 left-0 h-full w-28 flex flex-col justify-evenly items-center pt-5 gap-8 z-40">
      {/* Activities */}
      <Link href="/student/activities" title="Activities">
        <div className="transition-transform duration-200 hover:scale-110 drop-shadow-white drop-shadow-xl  cursor-pointer bg-transparent rounded-lg flex flex-col items-center">
          <Image src="/images/student/activities.png" alt="Book" width={80} height={80} />
          <span className="mt-2 text-md text-amber-950 font-bold">Activities</span>
        </div>
      </Link>
      {/* Games */}
      <Link href={process.env.NEXT_PUBLIC_GAME_URL || "/"} title="Games">
        <div className="transition-transform duration-200 hover:scale-110 drop-shadow-fuchsia-500 drop-shadow-xl  cursor-pointer bg-transparent rounded-lg flex flex-col items-center">
          <Image src="/images/student/games.png" alt="Settings" width={100} height={100} />
          <span className="mt-2 text-md text-amber-950 font-bold">Games</span>
        </div>
      </Link>
      {/* Progress */}
      <Link href="/student/progress" title="Progress">
        <div className="transition-transform duration-200 hover:scale-110 drop-shadow-amber-400 drop-shadow-xl  cursor-pointer bg-transparent rounded-lg mt-5 flex flex-col items-center">
          <Image src="/images/student/progress.png" alt="Cup" width={50} height={50} />
          <span className="mt-2 text-md text-amber-950 font-bold">Progress</span>
        </div>
      </Link>
    </div>
  );
}

export function RightSidebar() {

  const { userType, user } = useContext(AuthContext);
  const { confirm, confirmState, setConfirmState } = useConfirm();

  // User info shown on top
  const [navigatorInfo, setNavigatorInfo] = useState<{
    displayPicUrl: string,
    firstName: string,
    lastName: string,
    unreadCount?: number,
  }>({
    displayPicUrl: "/images/student/avatar.png",
    firstName: user?.displayName?.split(' ')[0] || '',
    lastName: user?.displayName?.split(' ')[1] || '',
    unreadCount: 0,
  })

  async function fetchNavigatorInfo() {
    const token = await user?.getIdToken();
    try {
      const info = await getNavigatorInfo(token!);
      // merge fetched info with defaults so we always have a valid displayPicUrl
      setNavigatorInfo((prev) => ({
        ...prev,
        ...(info as any),
        displayPicUrl: (info as any)?.displayPicUrl || prev.displayPicUrl,
      }));
    } catch (error) {
      console.log("Server error");
    }
  }

  useEffect(() => {
    fetchNavigatorInfo();
  }, [user]);

  // Logout
  async function logOut() {
    const ok = await confirm("Do you really want to Logout?");
    if (ok) signOut(clientAuth);
  }

  return (
    <div className="fixed top-0 right-0 h-full w-28 flex flex-col justify-evenly items-center pt-5 gap-8 z-40">
      {/* Avatar */}
      <Link href="/student/profile" title="Profile">
        <div className="flex flex-col items-center">
          <div className="w-[80px] h-[80px] rounded-full overflow-hidden relative border-2 border-stone-200">
            <Image src={navigatorInfo.displayPicUrl} alt="You" fill className="object-cover"/>
          </div>
          <span className="mt-2 text-md text-amber-950 font-bold">Profile</span>
        </div>
      </Link>
      {/* Notifications */}
      <Link href="/student/notifications" title="Notifications">
        <div title="Notifications" className="relative transition-transform duration-200 hover:scale-110 drop-shadow-amber-400 drop-shadow-xl  cursor-pointer bg-transparent rounded-lg mt-5 flex flex-col items-center">
          <Image src="/images/student/envelop.png" alt="Notifications" width={60} height={60} />
          { (navigatorInfo.unreadCount ?? 0) > 0 && (
            <span className="absolute -top-2 right-4 bg-amber-500 w-5 h-5 text-white text-xs rounded-full px-1 text-center">
              {/*{navigatorInfo.unreadCount}*/}
            </span>
          )}
          <span className="mt-2 text-md text-amber-950 font-bold">Notifications</span>
        </div>
      </Link>
      {/* Logout */}
      <button title="Logout" onClick={logOut} className="transition-transform duration-200 hover:scale-110 drop-shadow-orange-600 drop-shadow-xl  cursor-pointer bg-transparent rounded-lg flex flex-col items-center">
        <Image src="/images/student/logout.png" alt="Logout" width={70} height={70} />
        <span className="mt-2 text-md text-amber-950 font-bold">Logout</span>
      </button>

      <ConfirmDialog state={confirmState} setState={setConfirmState} />

    </div>
  );
}
