//import style
import "../styles/home.css";

//import assets
import home from "../assets/home.svg";
import user from "../assets/user.svg";
import students from "../assets/students.svg";
import teachers from "../assets/teachers.svg";
import absences from "../assets/absences.svg";

//import partials
import Header from "../partials/header";

//import utilities
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Profile() {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = window.localStorage.getItem('loggedIn');
  
    if (!loggedIn) {
      navigate('/login');
    }
  }, []);

  const handleEdit = () => {
    //
  };

  const showLogoutDialog = () => {
    document.getElementById("logout-dialog").style.display = "block";
  };

  const goBack = () => {
    document.getElementById("logout-dialog").style.display = "none";
  };

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("loggedIn");
    window.localStorage.removeItem("firstName");
    window.localStorage.removeItem("lastName");
    window.localStorage.removeItem("accountType");
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <Header />
      <div className="home">
        <div className="side-menu">
          <div className="section-title">
            <h3>Dashboard</h3>
            <div className="line"></div>
          </div>
          <Link to="/home">
            <div className="section" id="profile">
              <img src={home} alt="Home" height="18px" className="icon" />
              <p>Home</p>
            </div>
          </Link>
          <Link to="/profile">
            <div className="section selected-section" id="profile">
              <img src={user} alt="User" height="18px" className="icon" />
              <p>Profile</p>
            </div>
          </Link>
          <div className="section-title">
            <h3>Administration</h3>
            <div className="line"></div>
          </div>
          <Link to="/students">
            <div className="section" id="students">
              <img
                src={students}
                alt="Students"
                height="18px"
                className="icon"
              />
              <p>Students</p>
            </div>
          </Link>
          <Link to="/teachers">
            <div className="section" id="teachers">
              <img
                src={teachers}
                alt="Teachers"
                height="18px"
                className="icon"
              />
              <p>Teachers</p>
            </div>
          </Link>
          <Link to="/absences">
            <div className="section" id="absences">
              <img
                src={absences}
                alt="Absences"
                height="18px"
                className="icon"
              />
              <p>Absences</p>
            </div>
          </Link>
        </div>
        <div className="main-page">
          <div className="profile-btns">
            <button id="edit" onClick={handleEdit}>
              edit
            </button>
            <button id="logout" onClick={showLogoutDialog}>
              logout
            </button>
          </div>
        </div>
      </div>
      <div className="black-background" id="black-background"></div>
      <div className="logout-dialog" id="logout-dialog">
        <h3>Are you sure you want to log out?</h3>
        <div className="cat-btns">
          <button type="button" className="secondary-btn" id="go-back" onClick={goBack}>
            go back
          </button>
          <button type="button" className="main-btn" id="confirm-logout" onClick={handleLogout}>
            yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
