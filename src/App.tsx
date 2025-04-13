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


// dashboard


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route index element={<Home />} />

        <Route path="about" element={<About />} />

        <Route path="signup">
          <Route path="admin" element={<SignupAdmin />} /> 
          <Route path="teacher" element={<SignupTeacher />} /> 
          <Route path="student" element={<SignupStudent />} />
          <Route path="parent" element={<SignupParent />} /> 
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App
