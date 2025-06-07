import { BrowserRouter, Routes, Route } from "react-router";

import "./App.css";

// all

import Home from "./pages/Home";
import Signup from "./pages/userType/Signup";
import Signin from "./pages/userType/Signin";
import Dashboard from "./pages/userType/Dashboard";
import Profile from "./pages/userType/Profile";
import Settings from "./pages/userType/Settings";

// admin
import ManageUsers from "./pages/Admin/ManageUsers";
import SystemSettings from "./pages/Admin/SystemSettings";

// teacher
import MyClass from "./pages/Teacher/MyClass";
import CreateActivity from "./pages/Teacher/Activity/CreateActivity";
import ManageActivities from "./pages/Teacher/Activity/ManageActivities";
import RenderTemplate from "./pages/Teacher/Activity/RenderTemplate";

// parent
import MyChild from "./pages/Parent/MyChild";
import ContactSchool from "./pages/Parent/ContactSchool";

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
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />

          {/* admin */}
          <Route>
            <Route path="manageusers" element={<ManageUsers />} />
            <Route path="systemsettings" element={<SystemSettings />} />
          </Route>

          {/* teacher */}
          <Route>
            <Route path="myclass" element={<MyClass />} />
            <Route path="activity">
              { /*temp*/}   <Route path=":templateName" element={<RenderTemplate mode="view" />} />
              <Route path="manage" element={<ManageActivities />} />
              <Route path="create" element={<CreateActivity />} />
              <Route path="create/:templateName" element={<RenderTemplate mode="create" />} />
            </Route>
          </Route>

          {/* parent */}
          <Route>
            <Route path="mychild" element={<MyChild />} />
            <Route path="contactschool" element={<ContactSchool />} />
          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
