import { ReactNode, useState } from "react";
import Link from 'next/link';
import useAuth from "@/hooks/useAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUser, faUserFriends, faFileAlt, faBox, faCog, faEnvelope, faPeopleGroup, faBook }
 from '@fortawesome/free-solid-svg-icons';

type SideBarLinkProps = {
  link: string,
  children: ReactNode,
  icon?: any,
  isOpen: boolean,
  isActive: boolean,
  onClick: () => void
}

function SideBarLink(props: SideBarLinkProps) { 

  const { link, children, icon, isOpen, isActive, onClick } = props;

  return (
    <li>
      <Link href={link} onClick={onClick}>
        <div className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group cursor-pointer ${!isOpen ? 'justify-center' : ''} ${
          isActive 
            ? 'bg-white text-black' 
            : 'text-gray-100 hover:bg-white hover:text-black'
        }`}>
          {icon && (
            <div className={`w-6 h-6 transition-colors duration-200 flex items-center justify-center ${
              isActive 
                ? 'text-black' 
                : 'text-white group-hover:text-black'
            }`}>
              <FontAwesomeIcon icon={icon} className="w-5 h-5" />
            </div>
          )}
          <span className={`font-medium overflow-hidden transition-all duration-300 ${!isOpen ? 'w-0' : 'w-auto'}`}>
            {isOpen && children}
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

  const { userType } = useAuth();

  const { isOpen, setIsOpen } = props;
  const [ openedLink, setOpenedLink ] = useState("");
  

  return (
    <div className="fixed h-full">

      {/* ISSUE: Link wobbles when collapsing */}

      {/* Sidebar */}
      <div className={`h-full bg-blue-950 backdrop-blur-lg border-r border-gray-800/50 shadow-sm transition-all duration-300 ease-in-out
          px-2 py-1 ${isOpen ? "w-50" : "w-20"}`}>
        <ul className="space-y-6 mt-20 ">
          {userType === "TEACHER" && (
            <>
              <SideBarLink link="/teacher/users?userListType=student" icon={faUsers} isOpen={isOpen} isActive={openedLink === "/teacher/users?userListType=student"} onClick={() => setOpenedLink("/teacher/users?userListType=student")}>Students</SideBarLink>
              <SideBarLink link="/teacher/users?userListType=teacher" icon={faUserFriends} isOpen={isOpen} isActive={openedLink === "/teacher/users?userListType=teacher"} onClick={() => setOpenedLink("/teacher/users?userListType=teacher")}>Teachers</SideBarLink>
              <SideBarLink link="/teacher/templates" icon={faFileAlt} isOpen={isOpen} isActive={openedLink === "/teacher/templates"} onClick={() => setOpenedLink("/teacher/templates")}>Templates</SideBarLink>
              <SideBarLink link="/teacher/activities" icon={faBox} isOpen={isOpen} isActive={openedLink === "/teacher/activities"} onClick={() => setOpenedLink("/teacher/activities")}>Activities</SideBarLink>
              <SideBarLink link="/teacher/profile" icon={faUser} isOpen={isOpen} isActive={openedLink === "/teacher/profile"} onClick={() => setOpenedLink("/teacher/profile")}>Profile</SideBarLink>
            </>
          )}
          {userType === "PARENT" && (
            <>
              <SideBarLink link="/parent/mychild" icon={faUser} isOpen={isOpen} isActive={openedLink === "/parent/mychild"} onClick={() => setOpenedLink("/parent/mychild")}>My Child</SideBarLink>
              <SideBarLink link="/parent/contactschool" icon={faEnvelope} isOpen={isOpen} isActive={openedLink === "/parent/contactschool"} onClick={() => setOpenedLink("/parent/contactschool")}>Contact School</SideBarLink>
              <SideBarLink link="/parent/profile" icon={faUser} isOpen={isOpen} isActive={openedLink === "/parent/profile"} onClick={() => setOpenedLink("/parent/profile")}>Profile</SideBarLink>
            </>
          )}
        </ul>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-blue-900 text-white rounded-lg shadow-md hover:shadow-lg transform 
        hover:scale-105 transition-all duration-200"
      >
        <div className="flex flex-col items-center justify-center w-5 h-5">
          <span 
            className={`block w-4 h-0.5 bg-white rounded-full transition-transform duration-300 transform origin-center
            ${isOpen ? 'rotate-45 translate-y-1' : ''}`}
          />
          <span 
            className={`block w-4 h-0.5 bg-white rounded-full transition-all duration-300 my-0.5
            ${isOpen ? 'opacity-0' : 'opacity-100'}`}
          />
          <span 
            className={`block w-4 h-0.5 bg-white rounded-full transition-transform duration-300 transform origin-center
            ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}
          />
        </div>
      </button>
    </div>
  );
}
