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

// teacher
import Create from "./pages/Teacher/Create";

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
          {/* teacher */}
          <Route path="create" element={<DashboardLayout />}>
            <Route index element={<Create />} />
            <Route path=":contentName" element={<PageRenderer path={`${templatesRoute}/create`} />} />
          </Route>
          {/* admin */}
          {/* parent */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
