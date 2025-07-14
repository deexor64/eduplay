"use client";

import { ReactNode } from "react";
import Link from 'next/link';
import useAuth from "@/hooks/useAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faUser, 
  faUserFriends, 
  faFileAlt, 
  faBox, 
  faCog, 
  faEnvelope 
} from '@fortawesome/free-solid-svg-icons';

interface SideBarLinkProps {
  link: string,
  children: ReactNode,
  icon?: any,
  isOpen: boolean
}

function SideBarLink({ link, children, icon, isOpen }: SideBarLinkProps) { 

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

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  
  const { userType } = useAuth();

  const teacherLinks = {
    "Students": "/teacher/users?userListType=student",
    "Teachers": "/teacher/users?userListType=teacher", 
    "Parents": "/teacher/users?userListType=parent",
    "Templates": "/teacher/templates",
    "Activities": "/teacher/activities",
    "Profile": "/teacher/profile",
    "System Settings": "/teacher/system-settings",
  };

  const parentLinks = {
    "My Child": "/parent/mychild",
    "Contact School": "/parent/contactschool", 
    "Profile": "/parent/profile",
    "Settings": "/parent/settings",
  };

  const icons = {
    "Students": faUsers,
    "Teachers": faUser,
    "Parents": faUserFriends,
    "Templates": faFileAlt,
    "Activities": faBox,
    "Profile": faUser,
    "System Settings": faCog,
    "My Child": faUser,
    "Contact School": faEnvelope,
    "Settings": faCog,
  };

  const links = userType === "TEACHER" ? teacherLinks : userType === "PARENT" ? parentLinks : {};

  return (
    <div className="w-50 fixed">
      {/* Sidebar */}
      <div className={`h-full bg-gray-600/50 backdrop-blur-lg border-r border-gray-800/50 shadow-sm transition-all duration-300
          pl-2 pr-2 py-1 ${isOpen ? "w-50" : "w-16"}`}>
        <ul className="space-y-2 mt-20 ">
          {Object.entries(links).map(([label, href]) => (
            <SideBarLink 
              key={href as string} 
              link={href as string} 
              icon={icons[label as keyof typeof icons]} 
              isOpen={isOpen}
            >
              {label}
            </SideBarLink>
          ))}
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
