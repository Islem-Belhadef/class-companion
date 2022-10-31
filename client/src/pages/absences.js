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

//import utilities
import Axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Absences() {
  const [absencesList, setAbsencesList] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [studentsObjectList, setStudentsObjectList] = useState([]);
  const [teachersList, setTeachersList] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/students")
      .then((res) => {
        console.log(res.data);
        setStudentsList(res.data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });

    Axios.get("http://localhost:3001/teachers")
      .then((res) => {
        console.log(res.data);
        setTeachersList(res.data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });

    Axios.get("http://localhost:3001/absences")
      .then((res) => {
        console.log(res.data);
        setAbsencesList(res.data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  }, []);

  return (
    <div className="home-page">
      <Header />
      <div className="home">
        <div className="side-menu">
          <div className="section-title">
            <h3>Dashboard</h3>
            <div className="line"></div>
          </div>
          <Link to="/home">
            <div className="section" id="profile">
              <img src={home} alt="Home" height="18px" className="icon" />
              <p>Home</p>
            </div>
          </Link>
          <Link to="/profile">
            <div className="section" id="profile">
              <img src={user} alt="User" height="18px" className="icon" />
              <p>Profile</p>
            </div>
          </Link>
          <div className="section-title">
            <h3>Administration</h3>
            <div className="line"></div>
          </div>
          <Link to="/students">
            <div className="section " id="students">
              <img
                src={students}
                alt="Students"
                height="18px"
                className="icon"
              />
              <p>Students</p>
            </div>
          </Link>
          <Link to="/teachers">
            <div className="section" id="teachers">
              <img
                src={teachers}
                alt="Teachers"
                height="18px"
                className="icon"
              />
              <p>Teachers</p>
            </div>
          </Link>
          <Link to="/absences">
            <div className="section selected-section" id="absences">
              <img
                src={absences}
                alt="Absences"
                height="18px"
                className="icon"
              />
              <p>Absences</p>
            </div>
          </Link>
        </div>
        <div className="main-page">
          <div className="settings">
            <h1>Students List</h1>
            <form className="filters">
              <select
                name="filter-by-speciality"
                id="filter-by-speciality"
                defaultValue=""
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
                />
                <label htmlFor="order-alphabetically">
                  Order alphabetically
                </label>
              </div>
            </form>
          </div>
          <div className="cards">
            {absencesList.map((absence) => (
              <div className="card" key={absence._id}>
                <div className="labels">
                  <p>Last Name :</p>
                  <p>First Name :</p>
                  <p>Speciality :</p>
                  <p>Group :</p>
                  <p>Class :</p>
                  <p>Teacher :</p>
                  <p>Date :</p>
                  <p>Nature :</p>
                </div>
                <div className="values">
                  <p>
                    {
                      studentsList.find(
                        (student) => student._id === absence.student_id
                      ).last_name
                    }
                  </p>
                  <p>
                    {
                      studentsList.find(
                        (student) => student._id === absence.student_id
                      ).first_name
                    }
                  </p>
                  <p>
                    {
                      studentsList.find(
                        (student) => student._id === absence.student_id
                      ).speciality
                    }
                  </p>
                  <p>
                    0
                    {
                      studentsList.find(
                        (student) => student._id === absence.student_id
                      ).group
                    }
                  </p>
                  <p>
                    {
                      teachersList.find(
                        (teacher) => teacher._id === absence.teacher_id
                      ).class_name
                    }{" "}
                    - {absence.class_type}
                  </p>
                  <p>
                    {
                      teachersList.find(
                        (teacher) => teacher._id === absence.teacher_id
                      ).last_name
                    }{" "}
                    {
                      teachersList.find(
                        (teacher) => teacher._id === absence.teacher_id
                      ).first_name
                    }
                  </p>
                  <p>
                    {new Date(absence.date).getDate()}/
                    {new Date(absence.date).getMonth()}/
                    {new Date(absence.date).getFullYear()} -{" "}
                    {new Date(absence.date).getHours()}:
                    {new Date(absence.date).getMinutes()}
                  </p>
                  <p id="nature">
                    {absence.justified ? "Justified" : "Unjustified"}
                  </p>
                </div>
                <div className="ed-btns">
                  <div id="edit-btn" onClick={() => {}}></div>
                  <div id="delete-btn" onClick={() => {}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Absences;
