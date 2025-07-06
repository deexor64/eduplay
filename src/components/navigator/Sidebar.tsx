"use client";

import { ReactNode, useState } from "react";
import Link from 'next/link';
import useAuth from "@/hooks/useAuth";

interface sideBarLinkProps {
  link: string,
  children: ReactNode
}

function SideBarLink (props: sideBarLinkProps) { 
  return (
    <li>
      <Link href={props.link}>
        <div className="cursor-pointer hover:bg-blue-100 p-2 rounded" key={props.link}>
          {props.children}
        </div>
      </Link>
    </li>
  )
}

// interface sideBarProps {
//   toggleSidebar: Function
// }

type SidebarProps = {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar(props: SidebarProps) {
  
  // Side bar links are rendered according to the userType
  // Permission level is not used here
  const { userType, permissionLevel } = useAuth();
  
  // side bar
  const { isOpen, setIsOpen } = props;

  return (
    
    <div className="w-50 fixed">

      {/* Sidebar */}
      <div className={`h-full bg-gray-100 pl-4 shadow-md transition-all 
        duration-300 ${isOpen ? "w-50 pr-2" : "w-0 pr-0"}`}>
            
        <ul className={`space-y-2 mt-16 bg-blue-100 ${isOpen ? "" : "overflow-hidden"}`}>
          {
            userType == "TEACHER" && Object.entries({
              "Classes": "/teacher/classes",
              "Create Activity": "/teacher/activity/create",
              "Manage Activity": "/teacher/activity/manage",
              "Profile": "/teacher/profile",
              "Settings": "/teacher/settings",
              }).map(function ([label, href]) {
                return <SideBarLink link={href} key={href}>{label}</SideBarLink>
              })
          }
          {
            userType == "PARENT" && Object.entries({
              "My Child": "/parent/mychild",
              "Contact School": "/parent/contactschool",
              "Profile": "/parent/profile",
              "Settings": "/parent/settings",
            }).map(function ([label, href]) {
                return <SideBarLink link={href } key={href}>{label}</SideBarLink>
              })
          }
          {
            userType == "ADMIN" && Object.entries({
              "Students": "/admin/users?userListType=student",
              "Teachers": "/admin/users?userListType=teacher",
              "Parents": "/admin/users?userListType=parent",
              "Admins": "/admin/users?userListType=admin",
              "Classes": "/admin/classes",
              "Lessons": "/admin/lessons",
              "Templates": "/admin/templates",
              "Admin profile": "/admin/profile",
              "System Settings": "/admin/system-settings",
            }).map(function ([label, href]) {
                return <SideBarLink link={href } key={href}>{label}</SideBarLink>
              })
          }
        </ul>
      </div>

      {/* Arrow Button (outside of the sidebar container) */}
      <div
        className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white
        rounded-full cursor-pointer absolute top-4 left-4 z-20 transform transition-transform
        duration-300" onClick={() => {setIsOpen(!isOpen)}}>
        <span
          className={`transform transition-transform duration-300
          ${isOpen ? "rotate-180" : "rotate-0"}`}>
          &#8594;
        </span>
      </div>
      
    </div>
  );
}
