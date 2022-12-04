// utilities
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// pages
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Absences from "./pages/absences";
import Error from "./pages/404";
import Students from "./pages/students";
import Teachers from "./pages/teachers";
import Sesions from "./pages/sesions";
import StudentsByGroup from "./pages/studentsbygroup";
import MyAbsences from "./pages/my-absences";
import Justifications from "./pages/justifications";


function App() {

  const loggedIn = window.localStorage.getItem('loggedIn');

  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={(loggedIn) ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/students" element={<Students />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/absences" element={<Absences />} />
            <Route path="/sesions" element={< Sesions/>} />
            <Route path="/justifications" element={< Justifications/>} />
            <Route path="/studentsbygroup" element={< StudentsByGroup/>} />
            <Route path="/my-absences" element={< MyAbsences/>} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;