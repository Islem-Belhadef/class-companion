//import style
import "../styles/home.css";

//import partials
import Header from "../partials/header";
import Loading from "../partials/loading";
import SideMenu from "../partials/side-menu";
import NewSesion from "../partials/new-sesion";
import SesionCard from "../partials/sesion-card";

//import utilities
import Axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


function Sesions() {
  const navigate = useNavigate();
  const [showAddSesion, setShowAddSesion] = useState(false);
  const loggedIn = window.localStorage.getItem("loggedIn");
  const accountType = window.localStorage.getItem("accountType");
  const [teachersList, setTeachersList] = useState([]);
 
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
const [sesionsList,setSesionList]=useState([]);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      setIsLoading(true);
      setTimeout(() => {
        if(localStorage.getItem("accountType")==="teacher"){
          axios.post("http://localhost:3001/teacherSesions",{
            id:localStorage.getItem("token")
          })
          .then((res) => {
            console.log(res.data);
            setSesionList(res.data);
            console.log(sesionsList)
            setIsLoading(false);
            
          })
          .catch((err) => {
            setError(err);
            setIsLoading(false);
            console.log(err);
            setTimeout(() => {
              Axios.get("http://localhost:3001/teacher")
                .then((res) => {
                  console.log(res.data);
                  setTeachersList(res.data);
                  setIsLoading(false);
                  
                })
                .catch((err) => {
                  setError(err);
                  console.log(err);
                  setIsLoading(false);
                });
            }, 1000);
          });
        }else{
          Axios.get("http://localhost:3001/sesions")
          .then((res) => {
            console.log(res.data);
            setSesionList(res.data);
            console.log(sesionsList)
            setIsLoading(false);
          
          })
          .catch((err) => {
            setError(err);
            setIsLoading(false);
            console.log(err);
          });
        }
       
      }, 1000);
    }
  }, []);

  return (
    <div className="home-page">
      <Header />
      <div className="home">
        <SideMenu type={accountType} page="sesions" />
        <div className="main-page" id="students-page">
        {error && <h1>{error}</h1>}
          {isLoading && <Loading />}
          {!isLoading && !error && (
              <div className="cards">
                {sesionsList.map((sesion)=><SesionCard sesion={sesion} teachersList={teachersList}/>)}
              </div>
          )}
          <button
            className="main-btn add-user"
            id="add-student"
            onClick={()=>{setShowAddSesion(true)}}
          >
            <FontAwesomeIcon
              icon={faCirclePlus}
              style={{
                
                marginRight: "1vw",
              }}
            />
            new sesion
          </button>
          
          {error && <p>{error}</p>}
        </div>
      </div>
      {
        showAddSesion && (
          <NewSesion
          setShowAddSesion={setShowAddSesion}
          
          />
        )
      }
    </div>
  );
}

export default Sesions;