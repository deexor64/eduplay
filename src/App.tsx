import { BrowserRouter, Routes, Route } from "react-router";

import "./App.css";

// utils
import PageRenderer from "./utils/PageRenderer";

// all
import Home from "./pages/Home";
import Signup from "./pages/userType/Signup";
import Signin from "./pages/userType/Signin";
import DashboardLayout from "./pages/userType/(Dashboard)/(DashboardLayout)";
import Dashboard from "./pages/userType/(Dashboard)/Dashboard";
import Profile from "./pages/userType/Profile";
import Settings from "./pages/userType/Settings";

// teacher
import Create from "./pages/Teacher/Create";
import ManageActivities from "./pages/Teacher/ManageActivities";
import MyClass from "./pages/Teacher/MyClass";

// parent
import MyChild from "./pages/Parent/MyChild";
import ContactSchool from "./pages/Parent/ContactSchool";


var templatesRoute = "[templates]";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />

        <Route path=":userType">
          {/* all */}
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route path="dashboard" element={<DashboardLayout />} >
            <Route index element={<Dashboard />} />
          </Route>
          <Route element={<DashboardLayout />} >
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          {/* admin */}
          {/* teacher */}
          <Route element={<DashboardLayout />} >
            <Route path="myclass" element={<MyClass />} />
            <Route path="createactivity">
              <Route index element={<Create />} />
              <Route path=":contentName" element={<PageRenderer path={`${templatesRoute}/create`} />} />
            </Route>
            <Route path="manageactivities" element={<ManageActivities />} />
          </Route>
          {/* parent */}
          <Route element={<DashboardLayout />} >
            <Route path="mychild" element={<MyChild />} />
            <Route path="contactschool" element={<ContactSchool />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
