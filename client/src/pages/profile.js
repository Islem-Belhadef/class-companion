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
import SideMenu from "../partials/side-menu";

//import utilities
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Profile() {
  const navigate = useNavigate();
  const accountType = window.localStorage.getItem("accountType");

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
    document.getElementById("black").style.display = "block";
  };

  const goBack = () => {
    document.getElementById("logout-dialog").style.display = "none";
    document.getElementById("black").style.display = "none";
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
      <SideMenu type={accountType} page='profile'/>
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
      <div className="black-background" id="black"></div>
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
