import { ReactNode, useState } from "react";
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import useUserType from "@/hooks/useUserType";
import { generateUniqueID } from "@/lib/utils/generateRandomString";

interface sideBarLinkProps {
  link: string,
  children: ReactNode
}

function SideBarLink (props: sideBarLinkProps) { 
  return (
    <li>
      <Link href={props.link}>
        <div className="cursor-pointer hover:bg-blue-100 p-2 rounded" key={generateUniqueID()}>
          {props.children}
        </div>
      </Link>
    </li>
  )
}

interface sideBarProps {
  toggleSidebar: Function
}

export default function Sidebar(props: sideBarProps) {
  
  const userType = useUserType();
  
  // side bar
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed w-60">

      {/* Sidebar */}
      <div className={`w-46 h-full bg-gray-100 pl-4 shadow-md transition-all 
        duration-300 absolute
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            
        <ul className="space-y-2 mt-16 bg-blue-100">
          {
            userType == "TEACHER" && Object.entries({
              "My Class": "/teacher/myclass",
              "Create Activity": "/teacher/activity/create",
              "Manage Activity": "/teacher/activity/manage",
              "Profile": "/teacher/profile",
              "Settings": "/teacher/settings",
              }).map(function ([label, href]) {
                return <SideBarLink link={href} key={generateUniqueID()}>{label}</SideBarLink>
              })
          }
          {
            userType == "PARENT" && Object.entries({
              "My Child": "/parent/mychild",
              "Contact School": "/parent/contactschool",
              "Profile": "/parent/profile",
              "Settings": "/parent/settings",
            }).map(function ([label, href]) {
                return <SideBarLink link={href } key={generateUniqueID()}>{label}</SideBarLink>
              })
          }
          {
            userType == "ADMIN" && Object.entries({
              "Students": "/admin/users/students",
              "Teachers": "/admin/users/teachers",
              "Parents": "/admin/users/parents",
              "Admins": "/admin/users/admins",
              "Classes": "/admin/school/classes",
              "Lessons": "/admin/school/lessons",
              "Templates": "/admin/school/templates",
              "Admin profile": "/admin/profile",
              "System Settings": "/admin/system-settings",
            }).map(function ([label, href]) {
                return <SideBarLink link={href } key={generateUniqueID()}>{label}</SideBarLink>
              })
          }
          
        </ul>
      </div>

      {/* Arrow Button (outside of the sidebar container) */}
      <div
        className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white
        rounded-full cursor-pointer absolute top-4 left-4 z-20 transform transition-transform
        duration-300" onClick={function () { 
          setIsOpen(!isOpen);
          props.toggleSidebar();
        }}>
        <span
          className={`transform transition-transform duration-300
          ${isOpen ? "rotate-180" : "rotate-0"}`}>
          &#8594;
        </span>
      </div>
      
    </div>
  );
}
