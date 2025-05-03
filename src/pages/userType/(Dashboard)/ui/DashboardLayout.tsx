import { useState } from "react";
import { Outlet, useParams } from "react-router";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout() {

  // check valid user type -----
  var params = useParams();
  var userType = params.userType;
  var allowedUserTypes = ["admin", "teacher", "parent"];
  if (!userType || allowedUserTypes.indexOf(userType) === -1) {
    return;
  }
  // end check -----------------

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (

    <div className="flex flex-col h-min">

      {/* Nav bar and Spacer for Navbar height */}
      <Navbar userType={userType} />
      <div className="w-full h-16" />

      <div className="flex flex-grow" >
        {/* Sidebar with passed toggle function */}
        <Sidebar userType={userType} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        {/* outlet for dashboard content */}
        <section className="flex-grow transition-all duration-300 bg-sky-300"
          style={{ marginLeft: isSidebarOpen ? "12rem" : "4rem" }} >
          <Outlet />
        </section>
      </div>

    </div>
  );
}

export default DashboardLayout;
