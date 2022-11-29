//import assets
import home from "../assets/home.svg";
import user from "../assets/user.svg";
import students from "../assets/students.svg";
import teachers from "../assets/teachers.svg";
import absences from "../assets/absences.svg";
import sesions from "../assets/sesions.svg";

//import utilities
import { Link } from "react-router-dom";
// import { useState } from "react";

function SideMenu(props) {
  const accountType = props.type;
  const page = props.page;

  // const isAdmin = props.admin;
  // const isTeacher = props.teacher;
  // const isStudent = props.student;

  return (
    <div className="side-menu">
      <div className="section-title">
        <h3>Dashboard</h3>
        <div className="line"></div>
      </div>
      {(page === "home" && (
        <Link to="/home">
          <div className="section selected-section" id="profile">
            <img src={home} alt="Home" height="18px" className="icon" />
            <p>Home</p>
          </div>
        </Link>
      )) || (
        <Link to="/home">
          <div className="section" id="profile">
            <img src={home} alt="Home" height="18px" className="icon" />
            <p>Home</p>
          </div>
        </Link>
      )}
      {(page === "profile" && (
        <Link to="/profile">
          <div className="section selected-section" id="profile">
            <img src={user} alt="User" height="18px" className="icon" />
            <p>Profile</p>
          </div>
        </Link>
      )) || (
        <Link to="/profile">
          <div className="section" id="profile">
            <img src={user} alt="User" height="18px" className="icon" />
            <p>Profile</p>
          </div>
        </Link>
      )}
      <div className="section-title">
        <h3>Administration</h3>
        <div className="line"></div>
      </div>
      {accountType === "admin" &&
        ((page === "students" && (
          <Link to="/students">
            <div className="section selected-section" id="students">
              <img
                src={students}
                alt="Students"
                height="18px"
                className="icon"
              />
              <p>Students</p>
            </div>
          </Link>
        )) || (
          <Link to="/students">
            <div className="section" id="students">
              <img
                src={students}
                alt="Students"
                height="18px"
                className="icon"
              />
              <p>Students</p>
            </div>
          </Link>
        ))}
      {accountType === "admin" &&
        ((page === "teachers" && (
          <Link to="/teachers">
            <div className="section selected-section" id="teachers">
              <img
                src={teachers}
                alt="Teachers"
                height="18px"
                className="icon"
              />
              <p>Teachers</p>
            </div>
          </Link>
        )) || (
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
        ))}
      {(accountType === "teacher" || accountType === "admin" ) && (
        (page==='absences')&&(<Link to="/absences">
          <div className="section selected-section" id="absences">
            <img src={absences} alt="Absences" height="18px" className="icon" />
            <p>Absences</p>
          </div>
        </Link>) || (<Link to="/absences">
          <div className="section" id="absences">
            <img src={absences} alt="Absences" height="18px" className="icon" />
            <p>Absences</p>
          </div>
        </Link>)
      )}
      {(accountType === "teacher" || accountType === "admin" ) && (
        (page==='sesions')&&(<Link to="/sesions">
          <div className="section selected-section" id="sesions">
            <img src={sesions} alt="sesions" height="18px" className="icon" />
            <p>sesions</p>
          </div>
        </Link>) || (<Link to="/sesions">
          <div className="section" id="sesions">
            <img src={sesions} alt="sesions" height="18px" className="icon" />
            <p>sesions</p>
          </div>
        </Link>)
      )}
    </div>
  );
}

export default SideMenu;
