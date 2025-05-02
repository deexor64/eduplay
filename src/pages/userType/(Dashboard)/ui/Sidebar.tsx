import { useState } from "react";
import { Link } from "react-router";

function Sidebar(props: any) {
  const [isOpen, setIsOpen] = useState(true);

  var links: { [key: string]: string } = {};

  if (props.userType === "teacher") {
    links = {
      "My Class": "/teacher/myclass",
      "Create Activity": "/teacher/createactivity",
      "Manage Activity": "/teacher/manageactivities",
      "Profile": "/teacher/profile",
      "Settings": "/teacher/settings",
    };
  } else if (props.userType === "parent") {
    links = {
      "My Child": "/parent/mychild",
      "Contact School": "/parent/contactschool",
      "Profile": "/parent/profile",
      "Settings": "/parent/settings",
    };
  } else if (props.userType === "admin") {
    links = {
      "User Management": "/user-management",
      "Content Review": "/content-review",
      "Reports": "/reports",
      "System Settings": "/system-settings",
    };
  } else {
    return;
  }

  function toggleSidebar() {
    setIsOpen(!isOpen);
    props.toggleSidebar();
  }

  return (
    <div className="fixed w-60">
      {/* Sidebar */}
      <div className={`w-46 h-full bg-gray-100 pl-4 shadow-md transition-all duration-300 absolute
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <ul className="space-y-2 mt-16">
          {Object.entries(links).map(([label, href], index) => (
            <li key={index}>
              <Link to={href}>
                <div className="cursor-pointer hover:bg-blue-100 p-2 rounded">
                  {label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Arrow Button (outside of the sidebar container) */}
      <div
        className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white
        rounded-full cursor-pointer absolute top-4 left-4 z-20 transform transition-transform
        duration-300" onClick={toggleSidebar}>
        <span
          className={`transform transition-transform duration-300
          ${isOpen ? "rotate-180" : "rotate-0"}`}>
          &#8594;
        </span>
      </div>
    </div>
  );
}

export default Sidebar;
