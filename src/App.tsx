import { BrowserRouter, Routes, Route } from "react-router";
import './App.css';
import Home from './pages/Home';


// admin
// import AdminSignup from "./pages/Admin/Signup";
// import AdminSignin from "./pages/Admin/Signin";
// import AdminDashboard from "./pages/Admin/Dashboard";

// teacher
import TeacherSignup from "./pages/Teacher/Signup";
import TeacherSignin from "./pages/Teacher/Signin";
import TeacherDashboard from "./pages/Teacher/Dashboard";

// student
import StudentSignup from "./pages/Student/Signup";
import StudentSignin from "./pages/Student/Signin";
import StudentDashboard from "./pages/Student/Dashboard";

// parent
// import ParentSignup from "./pages/Parent/Signup";
// import ParentSignin from "./pages/Parent/Signin";
// import ParentDashboard from "./pages/Parent/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />

        <Route path="signup">
          {/* <Route path="admin" element={<AdminSignup />} />  */}
          <Route path="teacher" element={<TeacherSignup />} /> 
          <Route path="student" element={<StudentSignup />} />
          {/* <Route path="parent" element={<ParentSignup />} />  */}
        </Route>

        <Route path="signin">
          {/* <Route path="admin" element={<AdminSignin />} />  */}
          <Route path="teacher" element={<TeacherSignin />} /> 
          <Route path="student" element={<StudentSignin />} />
          {/* <Route path="parent" element={<ParentSignin />} />  */}
        </Route>

        <Route path="dashboard">
          {/* <Route path="admin" element={<AdminDashboard />} /> */}
          <Route path="teacher" element={<TeacherDashboard />} />
          <Route path="student" element={<StudentDashboard />} />
          {/* <Route path="parent" element={<ParentDashboard />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App
