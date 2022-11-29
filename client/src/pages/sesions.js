//import style
import "../styles/home.css";

//import partials
import Header from "../partials/header";
import Loading from "../partials/loading";
import SideMenu from "../partials/side-menu";
import NewSesion from "../partials/newsesion";
import StudentCard from "../partials/student-card";

//import utilities
import Axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Sesions() {
  const navigate = useNavigate();
  const [showAddSesion, setShowAddSesion] = useState(false);
  const loggedIn = window.localStorage.getItem("loggedIn");
  const accountType = window.localStorage.getItem("accountType");

  const [studentsList, setStudentsList] = useState([]);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [specialityFilter, setSpecialityFilter] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  const [alphabeticOrder, setAlphabeticOrder] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentCardNum, setStudentCardNum] = useState("");
  const [speciality, setSpeciality] = useState("TI");
  const [group, setGroup] = useState("1");

  const handleAddUser = () => {
    document.getElementById("students-page").style.display = "none";
    document.getElementById("add-student-page").style.display = "block";
  };

  const handleCancel = () => {
    document.getElementById("add-student-page").style.display = "none";
    document.getElementById("students-page").style.display = "block";
  };

  const handleSubmit = () => {
    Axios.post("http://localhost:3001/signup", {
      type: "student",
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      studentCardNum: studentCardNum,
      speciality: speciality,
      group: group,
    })
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          navigate("/students");
        }, 1500);
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      setIsLoading(true);
      setTimeout(() => {
        Axios.get("http://localhost:3001/students")
          .then((res) => {
            console.log(res.data);
            setStudentsList(res.data);
            setIsLoading(false);
          })
          .catch((err) => {
            setError(err);
            setIsLoading(false);
            console.log(err);
          });
      }, 1000);
    }
  }, []);

  return (
    <div className="home-page">
      <Header />
      <div className="home">
        <SideMenu type={accountType} page="sesions" />
        <div className="main-page" id="students-page">
          <div className="settings">
            <h1>Students List</h1>
            <form className="filters">
              <select
                name="filter-by-speciality"
                id="filter-by-speciality"
                defaultValue=""
                onChange={(e) => {
                  setSpecialityFilter(e.target.value);
                }}
              >
                <option disabled value="">
                  Filter by speciality
                </option>
                <option value="TI">TI</option>
                <option value="GL">GL</option>
                <option value="SCI">SCI</option>
                <option value="SI">SI</option>
              </select>
              <select
                name="filter-by-group"
                id="filter-by-group"
                defaultValue=""
                onChange={(e) => {
                  setGroupFilter(e.target.value);
                }}
              >
                <option disabled value="">
                  Filter by group
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <div>
                <input
                  type="checkbox"
                  name="order-alphabetically"
                  id="order-alphabetically"
                  onClick={() => {
                    setAlphabeticOrder(!alphabeticOrder);
                  }}
                />
                <label htmlFor="order-alphabetically">
                  Order alphabetically
                </label>
              </div>
            </form>
          </div>
          <button
            className="main-btn add-user"
            id="add-student"
            onClick={()=>{setShowAddSesion(true)}}
          >
            <FontAwesomeIcon
              icon={faPlus}
              style={{
                marginRight: "1vw",
              }}
            />
            new sesion
          </button>
          {isLoading && <Loading />}
          {error && <p>{error}</p>}

          {/* no filters */}
          {(!isLoading &&
            !error &&
            !groupFilter &&
            !specialityFilter &&
            !alphabeticOrder && (
              <div className="cards">
                {studentsList.map((student) => (
                  <StudentCard student={student} key={student._id}/>
                ))}
              </div>
            )) ||
            (!isLoading &&
              !error &&
              !groupFilter &&
              !specialityFilter &&
              alphabeticOrder && (
                <div className="cards">
                  {studentsList
                    .slice(0, studentsList.length)
                    .sort((a, b) =>
                      a.last_name < b.last_name
                        ? -1
                        : a.last_name > b.last_name
                        ? 1
                        : 0
                    )
                    .map((student) => (
                      <StudentCard student={student} key={student._id}/>
                    ))}
                </div>
              ))}

          {/* filter group */}
          {(!isLoading &&
            !error &&
            !specialityFilter &&
            groupFilter &&
            !alphabeticOrder && (
              <div className="cards">
                {studentsList
                  .filter((student) => student.group === groupFilter)
                  .map((student) => (
                    <StudentCard student={student} key={student._id}/>
                  ))}
              </div>
            )) ||
            (!isLoading &&
              !error &&
              !specialityFilter &&
              groupFilter &&
              alphabeticOrder && (
                <div className="cards">
                  {studentsList
                    .filter((student) => student.group === groupFilter)
                    .sort((a, b) =>
                      a.last_name < b.last_name
                        ? -1
                        : a.last_name > b.last_name
                        ? 1
                        : 0
                    )
                    .map((student) => (
                      <StudentCard student={student} key={student._id}/>
                    ))}
                </div>
              ))}

          {/* filter speciality */}
          {(!isLoading &&
            !error &&
            !groupFilter &&
            specialityFilter &&
            !alphabeticOrder && (
              <div className="cards">
                {studentsList
                  .filter((student) => student.speciality === specialityFilter)
                  .map((student) => (
                    <StudentCard student={student} key={student._id}/>
                  ))}
              </div>
            )) ||
            (!isLoading &&
              !error &&
              !groupFilter &&
              specialityFilter &&
              alphabeticOrder && (
                <div className="cards">
                  {studentsList
                    .filter(
                      (student) => student.speciality === specialityFilter
                    )
                    .sort((a, b) =>
                      a.last_name < b.last_name
                        ? -1
                        : a.last_name > b.last_name
                        ? 1
                        : 0
                    )
                    .map((student) => (
                      <StudentCard student={student} key={student._id}/>
                    ))}
                </div>
              ))}

          {/* filter speciality and group */}
          {(!isLoading &&
            !error &&
            groupFilter &&
            specialityFilter &&
            !alphabeticOrder && (
              <div className="cards">
                {studentsList
                  .filter((student) => student.speciality === specialityFilter)
                  .filter((student) => student.group === groupFilter)
                  .map((student) => (
                    <StudentCard student={student} key={student._id}/>
                  ))}
              </div>
            )) ||
            (!isLoading &&
              !error &&
              groupFilter &&
              specialityFilter &&
              alphabeticOrder && (
                <div className="cards">
                  {studentsList
                    .filter(
                      (student) => student.speciality === specialityFilter
                    )
                    .filter((student) => student.group === groupFilter)
                    .sort((a, b) =>
                      a.last_name < b.last_name
                        ? -1
                        : a.last_name > b.last_name
                        ? 1
                        : 0
                    )
                    .map((student) => (
                      <StudentCard student={student} key={student._id}/>
                    ))}
                </div>
              ))}
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
