"use client";

import React, { ReactNode, useContext, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUser, faUserFriends, faFileAlt, faBox, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "@/contexts/AuthProvider";
import { signOut } from "firebase/auth";
import { clientAuth } from "@/lib/firebaseClient";
import useConfirm from "@/hooks/useConfirm";
import { ConfirmDialog } from "../shared/popups/confirmDialog";

type SideBarLinkProps = {
  link: string;
  children: ReactNode;
  icon?: any;
  isOpen: boolean;
  isActive: boolean;
  onClick: () => void;
};

function SideBarLink({ link, children, icon, isOpen, isActive, onClick }: SideBarLinkProps) {
  return (
    <li>
      <Link href={link} onClick={onClick}>
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group cursor-pointer ${!isOpen ? "justify-center" : ""} ${
            isActive ? "bg-white text-black" : "text-gray-900 hover:bg-white hover:text-black"
          }`}>
          {icon && (
            <div
              className={`w-7 h-7 transition-colors duration-200 flex items-center justify-center ${
                isActive ? "text-black" : "text-gray-900 group-hover:text-black"
              }`}>
              <FontAwesomeIcon icon={icon} className="w-6 h-6" />
            </div>
          )}

          <span className={`font-semibold overflow-hidden transition-all duration-300 ${!isOpen ? "w-0" : "w-auto"}`}>
            {isOpen && children}
          </span>
        </div>
      </Link>
    </li>
  );
}

function LogoutButton({ children, icon, isOpen, isActive, onClick }: any) {
  return (
    <li className="relative top-20">
      <button
        onClick={onClick}
        type="button"
        className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group cursor-pointer ${!isOpen ? "justify-center" : ""} ${
          isActive ? "bg-white text-black" : "text-gray-900 hover:bg-white hover:text-black"
        }`}>
        {icon && (
          <div
            className={`w-7 h-7 transition-colors duration-200 flex items-center justify-center ${
              isActive ? "text-black" : "text-gray-900 group-hover:text-black"
            }`}>
            <FontAwesomeIcon icon={icon} className="w-6 h-6" />
          </div>
        )}

        <span className={`font-semibold overflow-hidden transition-all duration-300 ${!isOpen ? "w-0" : "w-auto"}`}>
          {isOpen && children}
        </span>
      </button>
    </li>
  );
}

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { userID, email, userType, role, status, user } = useContext(AuthContext);
  const [openedLink, setOpenedLink] = useState("");
  const { confirm, confirmState, setConfirmState } = useConfirm();

  async function logOut() {
    const ok = await confirm("Do you really want to Logout?");
    if (ok) await signOut(clientAuth);
  }

  return (
    <>
      <div className="fixed h-full">
        <div
          className={`h-full bg-[#D8BFD8] backdrop-blur-lg border-r border-gray-800/50 shadow-sm transition-all duration-100 ease-in-out px-2 py-1 ${
            isOpen ? "w-50" : "w-20"
          }`}>
          <ul className="space-y-6 mt-20">
            {userType === "TEACHER" && role === "ADMIN" && (
              <>
                <SideBarLink
                  link="/teacher/users?userListType=STUDENT"
                  icon={faUsers}
                  isOpen={isOpen}
                  isActive={openedLink === "/teacher/users?userListType=STUDENT"}
                  onClick={() => setOpenedLink("/teacher/users?userListType=STUDENT")}
                >
                  Students
                </SideBarLink>
                <SideBarLink
                  link="/teacher/users?userListType=TEACHER"
                  icon={faUserFriends}
                  isOpen={isOpen}
                  isActive={openedLink === "/teacher/users?userListType=TEACHER"}
                  onClick={() => setOpenedLink("/teacher/users?userListType=TEACHER")}
                >
                  Teachers
                </SideBarLink>
              </>
            )}

            <SideBarLink
              link="/teacher/templates"
              icon={faFileAlt}
              isOpen={isOpen}
              isActive={openedLink === "/teacher/templates"}
              onClick={() => setOpenedLink("/teacher/templates")}
            >
              Templates
            </SideBarLink>

            <SideBarLink
              link="/teacher/activities"
              icon={faBox}
              isOpen={isOpen}
              isActive={openedLink === "/teacher/activities"}
              onClick={() => setOpenedLink("/teacher/activities")}
            >
              Activities
            </SideBarLink>

            <SideBarLink
              link="/teacher/profile"
              icon={faUser}
              isOpen={isOpen}
              isActive={openedLink === "/teacher/profile"}
              onClick={() => setOpenedLink("/teacher/profile")}
            >
              Profile
            </SideBarLink>

            <LogoutButton icon={faSignOut} isOpen={isOpen} isActive={openedLink === "/auth/signin"} onClick={async () => await logOut()}>
              Logout
            </LogoutButton>
          </ul>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-blue-900 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <div className="flex flex-col items-center justify-center w-5 h-5">
            <span className={`block w-4 h-0.5 bg-white rounded-full transition-transform duration-300 transform origin-center ${isOpen ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`block w-4 h-0.5 bg-white rounded-full transition-all duration-300 my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block w-4 h-0.5 bg-white rounded-full transition-transform duration-300 transform origin-center ${isOpen ? '-rotate-45 -translate-y-1' : ''}`} />
          </div>
        </button>
      </div>

      <ConfirmDialog state={confirmState} setState={setConfirmState} />
    </>
  );
}
