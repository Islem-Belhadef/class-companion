//import style
import "../styles/home.css";

//import partials
import Header from "../partials/header";
import SideMenu from "../partials/side-menu";

//import assets
import avatar from '../assets/avatar.svg';
import {TbCirclePlus} from "react-icons/tb";

//import utilities
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const accountType = window.localStorage.getItem("accountType");

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("loggedIn");

    if (!loggedIn) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="home-page">
      <Header />
      <div className="home">
        <SideMenu type={accountType} page="home" />
        {accountType === "admin" && ( 
          <div className="main-page">
            <div className="welcome-div-admin">
              <div className="welcome-admin">
                <p>Welcome</p>
                <p>Belala Nabil</p>
              </div>
              <div className="admin-btns">
                <div>
                <button className="task-btn">
                <TbCirclePlus className="plus1"/>
                  <p>Create an account for a teacher</p>
                </button>
              </div>
              <div>
                <button className="task-btn">
                <TbCirclePlus className="plus1"/>
                  <p>Create an account for a student</p>
                </button>
              </div></div>
            </div>
            <div className="profile-div">
              <img src={avatar} alt="avatar" className="big-icon " />
            </div>
          </div>
        )}
        {accountType === "teacher" && (  
          <div className="main-page">
            <div className="welcome-div-teacher">
              <div className="welcome-teacher">
                <p>Welcome</p>
                <p>Belala Nabil</p>
              </div>
              <div className="task-teacher">
                <button className="task-btn">
                  <TbCirclePlus className="plus1"/>
                  <p>Start new session</p>
                </button>
              </div>
            </div>
            <div className="profile-div">
              <img src={avatar} alt="avatar" className="big-icon " />
            </div>
          </div>
        )}
        {accountType === "student" && (  
          <div className="main-page">
            <div className="welcome-div-student">
              <div className="welcome-student">
                <p>Welcome</p>
                <p>Belala Nabil</p>
              </div>
            </div>
            <div className="profile-div">
              <img src={avatar} alt="avatar" className="big-icon " />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
