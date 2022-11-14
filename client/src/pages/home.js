//import style
import "../styles/home.css";

//import partials
import Header from "../partials/header";
import SideMenu from "../partials/side-menu";

//import assets
import plus from '../assets/plus.svg';
import avatar from '../assets/avatar.svg';

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
            <div className="welcome-belala-nabil">
              <div className="welcome">
                <p>Welcome</p>
                <p>Belala Nabil</p>
              </div>
              <div className="start-new-session">
                <button>
                  <img src={plus}></img>
                  <p>Create an account for a teacher</p>
                </button>
              </div>
              <div className="start-new-session">
                <button>
                  <img src={plus}></img>
                  <p>Create an account for a student</p>
                </button>
              </div>
            </div>
            <div className="profile-div">
              <img src={avatar} alt="avatar" className="big-icon " />
            </div>
          </div>
        )}
        {accountType === "teacher" && (
          <div className="main-page">
            <div className="welcome-belala-nabil">
              <div className="welcome">
                <p>Welcome</p>
                <p>Belala Nabil</p>
              </div>
              <div className="start-new-session">
                <button>
                  <img src={plus}></img>
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
            <div className="welcome-belala-nabil">
              <div className="welcome">
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
