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
import Loading from "../partials/loading";
import SideMenu from "../partials/side-menu";

//import utilities
import Axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Students() {
  const navigate = useNavigate();

  const loggedIn = window.localStorage.getItem("loggedIn");
  const accountType = window.localStorage.getItem("accountType");

  const [studentsList, setStudentsList] = useState([]);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [specialityFilter, setSpecialityFilter] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  const [alphabeticOrder, setAlphabeticOrder] = useState(false);

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
      <SideMenu type={accountType} page='students'/>
        <div className="main-page">
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
                  <div className="card" key={student._id}>
                    <div className="labels">
                      <p>Last Name :</p>
                      <p>First Name :</p>
                      <p>Speciality :</p>
                      <p>Group :</p>
                      <p>Student Num :</p>
                    </div>
                    <div className="values">
                      <p>{student.last_name}</p>
                      <p>{student.first_name}</p>
                      <p>{student.speciality}</p>
                      <p>0{student.group}</p>
                      <p>{student.student_card_num}</p>
                    </div>
                    <div className="ed-btns">
                      <div id="edit-btn" onClick={() => {}}></div>
                      <div id="delete-btn" onClick={() => {}}></div>
                    </div>
                  </div>
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
                  .slice(0,studentsList.length)
                    .sort((a, b) =>
                      a.last_name < b.last_name
                        ? -1
                        : a.last_name > b.last_name
                        ? 1
                        : 0
                    )
                    .map((student) => (
                      <div className="card" key={student._id}>
                        <div className="labels">
                          <p>Last Name :</p>
                          <p>First Name :</p>
                          <p>Speciality :</p>
                          <p>Group :</p>
                          <p>Student Num :</p>
                        </div>
                        <div className="values">
                          <p>{student.last_name}</p>
                          <p>{student.first_name}</p>
                          <p>{student.speciality}</p>
                          <p>0{student.group}</p>
                          <p>{student.student_card_num}</p>
                        </div>
                        <div className="ed-btns">
                          <div id="edit-btn" onClick={() => {}}></div>
                          <div id="delete-btn" onClick={() => {}}></div>
                        </div>
                      </div>
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
                    <div className="card" key={student._id}>
                      <div className="labels">
                        <p>Last Name :</p>
                        <p>First Name :</p>
                        <p>Speciality :</p>
                        <p>Group :</p>
                        <p>Student Num :</p>
                      </div>
                      <div className="values">
                        <p>{student.last_name}</p>
                        <p>{student.first_name}</p>
                        <p>{student.speciality}</p>
                        <p>0{student.group}</p>
                        <p>{student.student_card_num}</p>
                      </div>
                      <div className="ed-btns">
                        <div id="edit-btn" onClick={() => {}}></div>
                        <div id="delete-btn" onClick={() => {}}></div>
                      </div>
                    </div>
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
                      <div className="card" key={student._id}>
                        <div className="labels">
                          <p>Last Name :</p>
                          <p>First Name :</p>
                          <p>Speciality :</p>
                          <p>Group :</p>
                          <p>Student Num :</p>
                        </div>
                        <div className="values">
                          <p>{student.last_name}</p>
                          <p>{student.first_name}</p>
                          <p>{student.speciality}</p>
                          <p>0{student.group}</p>
                          <p>{student.student_card_num}</p>
                        </div>
                        <div className="ed-btns">
                          <div id="edit-btn" onClick={() => {}}></div>
                          <div id="delete-btn" onClick={() => {}}></div>
                        </div>
                      </div>
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
                    <div className="card" key={student._id}>
                      <div className="labels">
                        <p>Last Name :</p>
                        <p>First Name :</p>
                        <p>Speciality :</p>
                        <p>Group :</p>
                        <p>Student Num :</p>
                      </div>
                      <div className="values">
                        <p>{student.last_name}</p>
                        <p>{student.first_name}</p>
                        <p>{student.speciality}</p>
                        <p>0{student.group}</p>
                        <p>{student.student_card_num}</p>
                      </div>
                      <div className="ed-btns">
                        <div id="edit-btn" onClick={() => {}}></div>
                        <div id="delete-btn" onClick={() => {}}></div>
                      </div>
                    </div>
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
                      <div className="card" key={student._id}>
                        <div className="labels">
                          <p>Last Name :</p>
                          <p>First Name :</p>
                          <p>Speciality :</p>
                          <p>Group :</p>
                          <p>Student Num :</p>
                        </div>
                        <div className="values">
                          <p>{student.last_name}</p>
                          <p>{student.first_name}</p>
                          <p>{student.speciality}</p>
                          <p>0{student.group}</p>
                          <p>{student.student_card_num}</p>
                        </div>
                        <div className="ed-btns">
                          <div id="edit-btn" onClick={() => {}}></div>
                          <div id="delete-btn" onClick={() => {}}></div>
                        </div>
                      </div>
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
                    <div className="card" key={student._id}>
                      <div className="labels">
                        <p>Last Name :</p>
                        <p>First Name :</p>
                        <p>Speciality :</p>
                        <p>Group :</p>
                        <p>Student Num :</p>
                      </div>
                      <div className="values">
                        <p>{student.last_name}</p>
                        <p>{student.first_name}</p>
                        <p>{student.speciality}</p>
                        <p>0{student.group}</p>
                        <p>{student.student_card_num}</p>
                      </div>
                      <div className="ed-btns">
                        <div id="edit-btn" onClick={() => {}}></div>
                        <div id="delete-btn" onClick={() => {}}></div>
                      </div>
                    </div>
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
                      <div className="card" key={student._id}>
                        <div className="labels">
                          <p>Last Name :</p>
                          <p>First Name :</p>
                          <p>Speciality :</p>
                          <p>Group :</p>
                          <p>Student Num :</p>
                        </div>
                        <div className="values">
                          <p>{student.last_name}</p>
                          <p>{student.first_name}</p>
                          <p>{student.speciality}</p>
                          <p>0{student.group}</p>
                          <p>{student.student_card_num}</p>
                        </div>
                        <div className="ed-btns">
                          <div id="edit-btn" onClick={() => {}}></div>
                          <div id="delete-btn" onClick={() => {}}></div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Students;
