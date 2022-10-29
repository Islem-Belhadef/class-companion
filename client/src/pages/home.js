//import style
import "../styles/home.css";

//import assets
import user from "../assets/user.svg";
import students from "../assets/students.svg";
import teachers from "../assets/teachers.svg";
import absences from "../assets/absences.svg";
import pen from "../assets/pen.svg";
import trash from "../assets/trash.svg";

//import partials
import Header from "../partials/header";

//import utilities
import Axios from "axios";
import { useState, useEffect } from "react";

function Home() {

  const [studentsList, setStudentsList] = useState([]);
  const [teachersList, setTeachersList] = useState([]);
  const [absencesList, setAbsencesList] = useState([]);

  const [error, setError] = useState('');

  useEffect(() => {
    Axios.get("http://localhost:3001/students")
    .then(res => {
      console.log(res.data);
      setStudentsList(res.data);
    })
    .catch(err => {
      setError(err);
      console.log(err);
    });

    Axios.get("http://localhost:3001/teachers")
    .then(res => {
      console.log(res.data);
      setTeachersList(res.data);
    })
    .catch(err => {
      setError(err);
      console.log(err);
    });

    Axios.get("http://localhost:3001/absences")
    .then(res => {
      console.log(res.data);
      setAbsencesList(res.data);
    })
    .catch(err => {
      setError(err);
      console.log(err);
    });
  },[]);

  return (
    <div className="home-page">
      <Header />
      <div className="home">
        <div className="side-menu">
          <div className="section-title">
            <h3>Dashboard</h3>
            <div className="line"></div>
          </div>
          <div
            className="section"
            id="profile"
          >
            <img src={user} alt="User" height="18px" className="icon" />
            <p>Profile</p>
          </div>
          <div className="section-title">
            <h3>Administration</h3>
            <div className="line"></div>
          </div>
          <div
            className="section"
            id="students"
          >
            <img src={students} alt="Students" height="18px" className="icon" />
            <p>Students</p>
          </div>
          <div
            className="section"
            id="teachers"
          >
            <img src={teachers} alt="Teachers" height="18px" className="icon" />
            <p>Teachers</p>
          </div>
          <div
            className="section"
            id="absences"
          >
            <img src={absences} alt="Absences" height="18px" className="icon" />
            <p>Absences</p>
          </div>
        </div>
        <div className="main-page">
          <div className="settings">
            <h1>Students List</h1>
            <form className="filters">
              <select name="filter-by-speciality" id="filter-by-speciality" defaultValue=''>
                <option disabled value=''>
                  Filter by speciality
                </option>
                <option value="TI">TI</option>
                <option value="GL">GL</option>
                <option value="SCI">SCI</option>
                <option value="SI">SI</option>
              </select>
              <select name="filter-by-group" id="filter-by-group" defaultValue=''>
                <option disabled value=''>
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
                  <img src={pen} alt="Edit" width="50px" onClick={() => {}} />
                  <img src={trash} alt="Edit" width="50px" onClick={() => {}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
