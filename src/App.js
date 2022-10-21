// utilities
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Error from './pages/404';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
