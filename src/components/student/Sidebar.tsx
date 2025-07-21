import React from "react";
import Image from "next/image";
import Link from "next/link";

// LeftSidebar: Book, Cup, and Wrench
export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-full w-28 flex flex-col items-center pt-35 gap-10 z-40">
      {/* Book */}
      <Link href="/student/activities">
        <div className="transition-transform duration-200 hover:scale-110 hover:shadow-2xl cursor-pointer bg-transparent rounded-lg">
          <Image src="/images/book.png" alt="Book" width={150} height={150} />
        </div>
      </Link>
      {/* Cup */}
      <Link href="/student/progress">
        <div className="transition-transform duration-200 hover:scale-110 hover:shadow-2xl cursor-pointer bg-transparent rounded-lg">
          <Image src="/images/trophy.png" alt="Cup" width={70} height={70} />
        </div>
      </Link>
      {/* Settings */}
      <Link href="/student/profile">
        <div className="transition-transform duration-200 hover:scale-110 hover:shadow-2xl cursor-pointer bg-transparent rounded-lg">
          <Image src="/images/wrench.png" alt="Settings" width={65} height={65} />
        </div>
      </Link>
    </div>
  );
}
