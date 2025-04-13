import { BrowserRouter, Routes, Route } from "react-router";
import './App.css';
import Home from './pages/Home';
import About from './pages/About';


// signup
import SignupAdmin from "./pages/Signup/SignupAdmin";
import SignupTeacher from "./pages/Signup/SignupTeacher";
import SignupStudent from "./pages/Signup/SignupStudent";
import SignupParent from "./pages/Signup/SignupParent";

// signin
import SigninAdmin from "./pages/Signin/SigninAdmin";
import SigninTeacher from "./pages/Signin/SigninTeacher";
import SigninStudent from "./pages/Signin/SigninStudent";
import SigninParent from "./pages/Signin/SigninParent";


// dashboard
import DashboardAdmin from "./pages/Dashboard/DashboardAdmin";
import DashboardTeacher from "./pages/Dashboard/DashboardTeacher";
import DashboardStudent from "./pages/Dashboard/DashboardStudent";
import DashboardParent from "./pages/Dashboard/DashboardParent";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />

        <Route path="about" element={<About />} />

        <Route path="signup">
          <Route path="admin" element={<SignupAdmin />} /> 
          <Route path="teacher" element={<SignupTeacher />} /> 
          <Route path="student" element={<SignupStudent />} />
          <Route path="parent" element={<SignupParent />} /> 
        </Route>

        <Route path="signin">
          <Route path="admin" element={<SigninAdmin />} /> 
          <Route path="teacher" element={<SigninTeacher />} /> 
          <Route path="student" element={<SigninStudent />} />
          <Route path="parent" element={<SigninParent />} /> 
        </Route>

        <Route path="dashboard">
          <Route path="admin" element={<DashboardAdmin />} />
          <Route path="teacher" element={<DashboardTeacher />} />
          <Route path="student" element={<DashboardStudent />} />
          <Route path="parent" element={<DashboardParent />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App
