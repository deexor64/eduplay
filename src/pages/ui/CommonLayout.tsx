import { useState } from "react";
import { useParams } from "react-router";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function CommonLayout(props: any) {

  // user type check
  var userType = useParams().userType;
  if (!["admin", "teacher", "parent"]
    .includes("" + userType)) return;

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className="flex flex-col h-min">
      {/* Nav bar and Spacer for Navbar height */}
      <Navbar userType={userType} />
      <div className="w-full h-16" />
      {/* main content */}
      <div className="flex flex-grow" >
        {/* Sidebar with passed toggle function */}
        <Sidebar userType={userType} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        {/* layout content */}
        <section className="flex-grow transition-all duration-300 bg-sky-300"
          style={{ marginLeft: isSidebarOpen ? "12rem" : "4rem" }} >
          {props.children}
        </section>
      </div>
    </div>
  );
}

export default CommonLayout;
