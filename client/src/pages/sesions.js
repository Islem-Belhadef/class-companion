//import style
import "../styles/home.css";

//import partials
import Header from "../partials/header";
import Loading from "../partials/loading";
import SideMenu from "../partials/side-menu";
import NewSesion from "../partials/new-sesion";
import StudentCard from "../partials/student-card";

//import utilities
import Axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

function Sesions() {
  const navigate = useNavigate();
  const [showAddSesion, setShowAddSesion] = useState(false);
  const loggedIn = window.localStorage.getItem("loggedIn");
  const accountType = window.localStorage.getItem("accountType");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddUser = () => {
    document.getElementById("students-page").style.display = "none";
    document.getElementById("add-student-page").style.display = "block";
  };

  const handleCancel = () => {
    document.getElementById("add-student-page").style.display = "none";
    document.getElementById("students-page").style.display = "block";
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="home-page">
      <Header />
      <div className="home">
        <SideMenu type={accountType} page="sesions" />
        <div className="main-page" id="students-page">
          <button
            className="main-btn add-user"
            id="add-student"
            onClick={() => {
              setShowAddSesion(true);
            }}
          >
            <FontAwesomeIcon
              icon={faUserPlus}
              style={{
                marginRight: "1vw",
              }}
            />
            new sesion
          </button>
          {isLoading && <Loading />}
          {error && <p>{error}</p>}
        </div>
      </div>
      {showAddSesion && <NewSesion setShowAddSesion={setShowAddSesion} />}
    </div>
  );
}

export default Sesions;
