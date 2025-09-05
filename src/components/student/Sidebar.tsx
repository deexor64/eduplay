import React from "react";
import Image from "next/image";
import Link from "next/link";

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
      {/* Parent */}
      <Link href="/student/parent" title="Parent">
        <div className="transition-transform duration-200 hover:scale-110 drop-shadow-blue-400 drop-shadow-xl  cursor-pointer bg-transparent rounded-lg mt-5">
          <Image src="/images/student/parent.png" alt="Parent" width={70} height={70} />
        </div>
      </Link>
      {/* Logout */}
      <div title="Logout" className="transition-transform duration-200 hover:scale-110 drop-shadow-orange-600 drop-shadow-xl  cursor-pointer bg-transparent rounded-lg">
        <Image src="/images/student/logout.png" alt="Logout" width={70} height={70} />
      </div>
    </div>
  );
}
