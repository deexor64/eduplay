import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";

// utils
import PageRenderer from "./utils/PageRenderer";

// all
import Home from "./pages/Home";
import Layout from "./pages/ui/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";

// teacher
import CreateActivity from "./pages/Activity/CreateActivity";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />

        <Route path="signup">
          {/* <Route path="admin" element={<AdminSignup />} />  */}
          {/* <Route path="teacher" element={<TeacherSignup />} />  */}
          {/* <Route path="student" element={<StudentSignup />} /> */}
          {/* <Route path="parent" element={<ParentSignup />} />  */}
        </Route>

        <Route path="signin">
          {/* <Route path="admin" element={<AdminSignin />} />  */}
          {/* <Route path="teacher" element={<TeacherSignin />} />  */}
          {/* <Route path="student" element={<StudentSignin />} /> */}
          {/* <Route path="parent" element={<ParentSignin />} />  */}
        </Route>

        <Route path=":userType" element={<Layout />}>

          <Route path="dashboard" element={<Dashboard />} />

          <Route path="activity">
            <Route path=":contentName" element={<PageRenderer path="Activity" />} />
            <Route path="createActivity">
              <Route index element={<CreateActivity />} />
              <Route path=":contentName" element={<PageRenderer path="Activity/Create" />} />
            </Route>
          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
