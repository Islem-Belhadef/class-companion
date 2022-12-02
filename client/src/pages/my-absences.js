//import style
import "../styles/home.css";

//import partials
import Header from "../partials/header";
import Loading from "../partials/loading";
import SideMenu from "../partials/side-menu";
import MyAbsenceCard from "../partials/my-absence-card";

//import utilities
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function MyAbsences() {
  const navigate = useNavigate();

  const [myabsencesList, setMyAbsencesList] = useState([]);
  const [teachersList, setTeachersList] = useState([]);
  const accountType = window.localStorage.getItem("accountType");
  const [classFilter, setClassFilter] = useState("");
  const userId = window.localStorage.getItem("token");

  const loggedIn = window.localStorage.getItem("loggedIn");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      setIsLoading(true);

      Axios.get("http://localhost:3001/teachers")
        .then((res) => {
          console.log(res.data);
          setTeachersList(res.data);
          setTimeout(() => {
            Axios.post("http://localhost:3001/absences", {
              id: userId,
            })
              .then((res) => {
                console.log(res.data);
                setMyAbsencesList(res.data);
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
    }
  }, []);

  return (
    <div className="home-page">
      <Header />
      <div className="home">
        <SideMenu type={accountType} page="MyAbsences" />
        {isLoading && <Loading />}
        {error && <p>{error}</p>}
        {!isLoading && !error && (
          <div className="main-page" id="students-page">
            <div className="myAbsences-setting">
              <h1>My Absences</h1>
              <form className="filters">
                <select
                  name="filter-by-class"
                  id="filter-by-class"
                  defaultValue=""
                  onChange={(e) => {
                    setClassFilter(e.target.value);
                  }}
                >
                  <option disabled value="">
                    Filter by class
                  </option>
                  <option value="DAW2">DAW</option>
                  <option value="DAM">IPO</option>
                  <option value="POO">POO</option>
                  <option value="BDM">BDM</option>
                </select>
              </form>
            </div>
            <div className="cards">
              {myabsencesList.map((absence) => (
                <MyAbsenceCard
                  key={absence._id}
                  absence={absence}
                  teachersList={teachersList}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAbsences;
