"use client";

import { ReactNode } from "react";
import Link from 'next/link';
import useAuth from "@/hooks/useAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUser, faUserFriends, faFileAlt, faBox, faCog, faEnvelope }
 from '@fortawesome/free-solid-svg-icons';

interface SideBarLinkProps {
  link: string,
  children: ReactNode,
  icon?: any,
  isOpen: boolean
}

function SideBarLink(props: SideBarLinkProps) { 

  const { link, children, icon, isOpen } = props;

  return (
    <li>
      <Link href={link}>
        <div className={`flex items-center gap-3 px-4 py-3 'text-gray-100' hover:bg-gray-800/50 hover:text-blue-300 rounded-lg transition-all duration-300 group cursor-pointer ${!isOpen ? 'justify-center' : ''}`}>
          {icon && (
            <div className={`w-5 h-5 text-gray-300' group-hover:text-blue-400 transition-colors duration-200 flex-shrink-0 flex items-center justify-center`}>
              <FontAwesomeIcon icon={icon} className="w-4 h-4" />
            </div>
          )}
          <span className={`font-medium transition-all duration-300 whitespace-nowrap ${!isOpen ? 'opacity-0 max-w-0' : 'opacity-100 max-w-xs'}`}>
            {children}
          </span>
        </div>
      </Link>
    </li>
  )
}

type SidebarProps = {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar(props: SidebarProps) {

  const { isOpen, setIsOpen } = props;
  
  const { userType } = useAuth();

  return (
    <div className="w-50 fixed">
      {/* Sidebar */}
      <div className={`h-full bg-gray-600/50 backdrop-blur-lg border-r border-gray-800/50 shadow-sm transition-all duration-300
          pl-2 pr-2 py-1 ${isOpen ? "w-50" : "w-16"}`}>
        <ul className="space-y-2 mt-20 ">
          {userType === "TEACHER" && (
            <>
              <SideBarLink link="/teacher/users?userListType=student" icon={faUsers} isOpen={isOpen}>Students</SideBarLink>
              <SideBarLink link="/teacher/users?userListType=teacher" icon={faUser} isOpen={isOpen}>Teachers</SideBarLink>
              <SideBarLink link="/teacher/users?userListType=parent" icon={faUserFriends} isOpen={isOpen}>Parents</SideBarLink>
              <SideBarLink link="/teacher/templates" icon={faFileAlt} isOpen={isOpen}>Templates</SideBarLink>
              <SideBarLink link="/teacher/activities" icon={faBox} isOpen={isOpen}>Activities</SideBarLink>
              <SideBarLink link="/teacher/profile" icon={faUser} isOpen={isOpen}>Profile</SideBarLink>
              <SideBarLink link="/teacher/system-settings" icon={faCog} isOpen={isOpen}>System Settings</SideBarLink>
            </>
          )}
          {userType === "PARENT" && (
            <>
              <SideBarLink link="/parent/mychild" icon={faUser} isOpen={isOpen}>My Child</SideBarLink>
              <SideBarLink link="/parent/contactschool" icon={faEnvelope} isOpen={isOpen}>Contact School</SideBarLink>
              <SideBarLink link="/parent/profile" icon={faUser} isOpen={isOpen}>Profile</SideBarLink>
              <SideBarLink link="/parent/settings" icon={faCog} isOpen={isOpen}>Settings</SideBarLink>
            </>
          )}
        </ul>
      </div>

      {/* Smaller Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex flex-col items-center justify-center bg-blue-600 text-white rounded-lg cursor-pointer absolute top-4 left-4 z-20 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        <div className="flex flex-col items-center justify-center w-5 h-5">
          <span 
            className={`block w-4 h-0.5 bg-white rounded-full transition-all duration-300 transform origin-center
            ${isOpen ? 'rotate-45 translate-y-1' : 'rotate-0 translate-y-0'}`}
          />
          <span 
            className={`block w-4 h-0.5 bg-white rounded-full transition-all duration-300 my-0.5
            ${isOpen ? 'opacity-0' : 'opacity-100'}`}
          />
          <span 
            className={`block w-4 h-0.5 bg-white rounded-full transition-all duration-300 transform origin-center
            ${isOpen ? '-rotate-45 -translate-y-1' : 'rotate-0 translate-y-0'}`}
          />
        </div>
      </button>
    </div>
  );
}
