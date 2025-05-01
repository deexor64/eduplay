import { useState } from "react"; import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useParams, Outlet, Navigate } from "react-router";

function Layout() {

  // check valid user type
  var params = useParams();
  var userType = params.userType;
  var allowedUserTypes = ["admin", "teacher", "parent", "student"];
  if (!userType || allowedUserTypes.indexOf(userType) === -1) {
    // return <Navigate to="/not-found" />;
    return;
  }




  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className="flex flex-col h-min">

      <Navbar userType={userType} />
      <div className="w-full h-16" /> {/* Spacer for Navbar height */}

      <div className="flex flex-grow" >

        {/* Sidebar with passed toggle function */}
        <Sidebar userType={userType} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <section className="flex-grow transition-all duration-300 bg-sky-300"
          style={{ marginLeft: isSidebarOpen ? "12rem" : "4rem" }} >
          {/* Outlet for nested routes */}
          <Outlet />
        </section>

      </div>

    </div>
  );
}

export default Layout;
