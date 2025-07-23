import React from "react";
import Image from "next/image";
import Link from "next/link";

// LeftSidebar: Book, Cup, and Wrench
export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-full w-28 flex flex-col items-center pt-30 gap-4 z-40">
      {/* Curriculum */}
      <Link href="/student/curriculum" title="Curriculum">
        <div className="transition-transform duration-200 hover:scale-110 hover:shadow-2xl cursor-pointer bg-transparent rounded-lg">
          <Image src="/images/curriculum-icon.png" alt="Settings" width={90} height={90} />
        </div>
      </Link>
      {/* Activities */}
      <Link href="/student/activities" title="Activities">
        <div className="transition-transform duration-200 hover:scale-110 hover:shadow-2xl cursor-pointer bg-transparent rounded-lg">
          <Image src="/images/activities-icon.png" alt="Book" width={80} height={80} />
        </div>
      </Link>
      {/* Games */}
      <Link href="/student/games" title="Games">
        <div className="transition-transform duration-200 hover:scale-110 hover:shadow-2xl cursor-pointer bg-transparent rounded-lg">
          <Image src="/images/games-icon.png" alt="Settings" width={100} height={100} />
        </div>
      </Link>
      {/* Progress */}
      <Link href="/student/progress" title="Progress">
        <div className="transition-transform duration-200 hover:scale-110 hover:shadow-2xl cursor-pointer bg-transparent rounded-lg mt-5">
          <Image src="/images/progress-icon.png" alt="Cup" width={50} height={50} />
        </div>
      </Link>
      {/* Settings */}
      <Link href="/student/profile" title="Settings">
        <div className="transition-transform duration-200 hover:scale-110 hover:shadow-2xl cursor-pointer bg-transparent rounded-lg mt-5">
          <Image src="/images/settings-icon.png" alt="Settings" width={60} height={60} />
        </div>
      </Link>
    </div>
  );
}
