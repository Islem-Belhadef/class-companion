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
  const [message2, setMessage2] = useState("");

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

  const unjust = [];
  const just = [];
  const countUnjust = {};
  const countJust = {};

  useEffect(() => {
    myAbsencesList.forEach((abs) => {
      if (!abs.justified) {
        unjust.push(abs.class_name + " - " + abs.class_type);
      } else if (abs.justified) {
        just.push(abs.class_name + " - " + abs.class_type);
      }
    });

    console.log("justified : " + just);
    console.log("unjustified : " + unjust);

    for (const absence of myAbsencesList) {
      if (!absence.justified) {
        if (
          countUnjust[
            absence.class_name +
              " - " +
              absence.class_type
          ]
        ) {
          countUnjust[
            absence.class_name +
              " - " +
              absence.class_type
          ] += 1;
        } else {
          countUnjust[
            absence.class_name +
              " - " +
              absence.class_type
          ] = 1;
        }
      }
    }

    for (const absence of myAbsencesList) {
      if (absence.justified) {
        if (
          countJust[
            absence.class_name +
              " - " +
              absence.class_type
          ]
        ) {
          countJust[
            absence.class_name +
              " - " +
              absence.class_type
          ] += 1;
        } else {
          countJust[
            absence.class_name +
              " - " +
              absence.class_type
          ] = 1;
        }
      }
    }

    console.log('count just');
    console.log(countJust);
    console.log('count unjust');
    console.log(countUnjust);

    unjust.forEach((occurence) => {
      if (countUnjust[occurence] >= 2) {
        setMessage(
          "You have " +
            countUnjust[occurence] +
            " unjustified absences in " +
            occurence
        );
      }
      if (countJust[occurence] >= 4) {
        setMessage2(
          "You have " +
            countJust[occurence] +
            " justified absences in " +
            occurence
        );
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
              <div className="warnings">

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

              {message2 && (
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
                    {message2}
                    <button
                      className="justify-btn"
                      onClick={() => {
                        navigate("/my-absences");
                      }}
                    >
                      Check absences
                    </button>
                  </div>
                </div>
              )}

              {!message && !message2 && (
                <div className="warning" style={{ backgroundColor: "#d8ffcc" }}>
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    style={{
                      marginRight: "2rem",
                      color: "rgb(70, 223, 103)",
                      height: "24px",
                    }}
                  />
                  You don't have any excluding absences
                </div>
              )}
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
