//import style
import "../styles/home.css";

//import partials
import Header from "../partials/header";
import SideMenu from "../partials/side-menu";

//import assets
import avatar from "../assets/avatar.svg";
import { TbCirclePlus } from "react-icons/tb";

//import utilities
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  const navigate = useNavigate();

  const [myAbsencesList, setMyAbsencesList] = useState([]);
  const [classFilter, setClassFilter] = useState("");

  const accountType = window.localStorage.getItem("accountType");
  const userId = window.localStorage.getItem("token");

  const loggedIn = window.localStorage.getItem("loggedIn");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState("");

  const occurences = [];
  const count = {};

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      if (accountType === "student") {
        Axios.post("http://localhost:3001/absences", {
          id: userId,
        })
          .then((res) => {
            setMyAbsencesList(res.data);
            setIsLoading(false);
          })
          .catch((err) => {
            setError(err);
            console.log(err);
            setIsLoading(false);
          });
      }
    }
  }, []);

  useEffect(() => {
    myAbsencesList.forEach((abs) => {
      if (abs.justified === false) {
        occurences.push(abs.class_name + " - " + abs.class_type);
      }
    });
    for (const absence of myAbsencesList) {
      if (count[absence.class_name + " - " + absence.class_type]) {
        count[absence.class_name + " - " + absence.class_type] += 1;
      } else {
        count[absence.class_name + " - " + absence.class_type] = 1;
      }
    }
    console.log(occurences);
    console.log(count);

    occurences.forEach((zeba) => {
      if (count[zeba] >= 3) {
        setMessage("You have " + count[zeba] + " absences in " + zeba);
      }
    });
  }, [myAbsencesList]);

  return (
    <div className="home-page">
      <Header />
      <div className="home">
        <SideMenu type={accountType} page="home" />
        {accountType === "admin" && (
          <div className="main-home">
            <div className="welcome">
              <div className="welcome-text">
                <h1>Welcome</h1>
                <h2>
                  {window.localStorage.getItem("firstName")}{" "}
                  {window.localStorage.getItem("lastName")}
                </h2>
              </div>
              <div className="tasks">
                  <button
                    className="task-btn"
                    onClick={() => {
                      navigate("/teachers");
                    }}
                  >
                    <TbCirclePlus className="plus1" />
                    Create an account for a teacher
                  </button>
                  <button
                    className="task-btn"
                    onClick={() => {
                      navigate("/students");
                    }}
                  >
                    <TbCirclePlus className="plus1" />
                    Create an account for a student
                  </button>
              </div>
            </div>
            <div className="profile-div">
              <img src={avatar} alt="avatar" className="big-icon " />
            </div>
          </div>
        )}
        {accountType === "teacher" && (
          <div className="main-home">
            <div className="welcome">
              <div className="welcome-text">
                <h1>Welcome</h1>
                <h2>
                  {window.localStorage.getItem("firstName")}{" "}
                  {window.localStorage.getItem("lastName")}
                </h2>
              </div>
              <div className="tasks">
                <button
                  className="task-btn"
                  onClick={() => {
                    navigate("/sesions");
                  }}
                >
                  <TbCirclePlus className="plus1" />
                  Start new session
                </button>
              </div>
            </div>
            <div className="profile-div">
              <img src={avatar} alt="avatar" className="big-icon " />
            </div>
          </div>
        )}
        {accountType === "student" && (
          <div className="main-home">
            <div className="welcome">
              <div className="welcome-text">
                <h1>Welcome</h1>
                <h2>
                  {window.localStorage.getItem("firstName")}{" "}
                  {window.localStorage.getItem("lastName")}
                </h2>
              </div>
              {message && (
                <div className="warning">
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    style={{
                      marginRight: "2rem",
                      color: "rgb(250, 56, 56)",
                      height: "24px",
                    }}
                  />
                  <div className="warning-info">
                    {message}
                    <button
                      className="justify-btn"
                      onClick={() => {
                        navigate("/my-absences");
                      }}
                    >
                      Justify
                    </button>
                  </div>
                </div>
              )}
              {!message && (
                <div className="warning" style={{ backgroundColor: "#d8ffcc" }}>
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    style={{
                      marginRight: "2rem",
                      color: "rgb(70, 223, 103)",
                      height: "24px",
                    }}
                  />
                  You don't exclusing absences
                </div>
              )}
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
