//import style
import "../styles/home.css";
//import partials
import Header from "../partials/header";
import Loading from "../partials/loading";
import SideMenu from "../partials/side-menu";
import JustificationCard from "../partials/justification-card";

//import utilities
import Axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Justifications = () =>{

  const navigate = useNavigate();

  const loggedIn = window.localStorage.getItem("loggedIn");
  const accountType = window.localStorage.getItem("accountType");

  const [justificationList, setJustificationList] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [teachersList, setTeachersList] = useState([]);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      setIsLoading(true);
      Axios.get("http://localhost:3001/students")
        .then((res) => {
          console.log(res.data);
          setStudentsList(res.data);
       
          Axios.get("http://localhost:3001/teachers")
            .then((res) => {
              console.log(res.data);
              setTeachersList(res.data);
              setTimeout(() => {
                Axios.get("http://localhost:3001/justifications")
                  .then((res) => {
                    console.log(res.data);
                    setJustificationList(res.data);
                    setIsLoading(false);
                    
                  })
                  .catch((err) => {
                    setError(err);
                    console.log(err);
                    setIsLoading(false);
                  });
              }, 1000);
            })
            .catch((err) => {
              setError(err);
              console.log(err);
              setIsLoading(false);
            });
        })
        .catch((err) => {
          setError(err);
          console.log(err);
          setIsLoading(false);
        });
        

    }
  }, []);

  return(
    <div className="home-page">
      <Header />

      <div className="home">
        <SideMenu type={accountType} page="justifications" />

        <div className="main-page">
          {error && <h1>{error}</h1>}
          {isLoading && <Loading />}
          {!isLoading && !error && (
              <div className="cards">
                {justificationList.map((justification) => (
                  <JustificationCard
                    key={justification._id}
                    
                    justification={justification}
                    studentsList={studentsList}
                    teachersList={teachersList}
                  />
                 
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  )

}

export default Justifications