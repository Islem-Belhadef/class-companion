import "../styles/signup.css";

import { useState } from "react";
import Axios from "axios";

import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import signupImg from "../assets/signup.svg";
import arrow from "../assets/arrow.svg";

function Signup() {
  const [type, setType] = useState("student");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentCardNum, setStudentCardNum] = useState("");
  const [teacherCode, setTeacherCode] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [group, setGroup] = useState("");
  const [classModule, setClassModule] = useState("");

  const showAdditionalInfos = () => {
    const blackBG = document.getElementById("black-bg");
    const additionalStudentInfos = document.getElementById(
      "additional-infos-student"
    );
    const additionalTeacherInfos = document.getElementById(
      "additional-infos-teacher"
    );

    if (type === "student") {
      additionalStudentInfos.style.display = "block";
      blackBG.style.display = "block";
    } else {
      additionalTeacherInfos.style.display = "block";
      blackBG.style.display = "block";
    }
  };

  const goBack = () => {
    const blackBG = document.getElementById("black-bg");
    const additionalStudentInfos = document.getElementById(
      "additional-infos-student"
    );
    const additionalTeacherInfos = document.getElementById(
      "additional-infos-teacher"
    );

    additionalTeacherInfos.style.display = "none";
    additionalStudentInfos.style.display = "none";
    blackBG.style.display = "none";
  };

  const signup = () => {
    Axios.post("http://localhost:3001/signup", {
      type: type,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      studentCardNum: studentCardNum,
      teacherCode: teacherCode,
      speciality: speciality,
      group: group,
      classModule: classModule,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  return (
    <div className="signup-page">
      <div className="signup-banner">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
          <h3>Class Companion</h3>
        </div>
        <img
          src={signupImg}
          className="signup-illustration"
          alt="Signup Illustration"
        />
        <div className="continue">
          <h1>
            Create your Companion
            <br />
            account to continue
          </h1>
          <img src={arrow} alt="Arrow" />
        </div>
      </div>
      <div className="signup-form">
        <div className="welcome">
          <h1>Welcome</h1>
          <h2>To Class Companion of University of Constantine 2</h2>
        </div>
        <form autoComplete="off" spellCheck="false">
          <div className="account-type">
            <label htmlFor="type">I am a</label>
            <div>
              <input
                type="radio"
                name="type"
                id="student"
                value="student"
                defaultChecked
                onClick={() => {
                  setType("student");
                }}
              />
              <label htmlFor="student">Student</label>
            </div>
            <div>
              <input
                type="radio"
                name="type"
                id="teacher"
                value="teacher"
                onClick={() => {
                  setType("teacher");
                }}
              />
              <label htmlFor="teacher">Teacher</label>
            </div>
          </div>
          <div className="names-labels">
            <label htmlFor="first-name">First Name</label>
            <label htmlFor="last-name">Last Name</label>
          </div>
          <div className="names">
            <input
              type="text"
              name="first-name"
              id="first-name"
              required
              maxLength={50}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              type="text"
              name="last-name"
              id="last-name"
              required
              maxLength={30}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <label htmlFor="email">
            Email Address <small>(university professional email only)</small>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            maxLength={50}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            maxLength={40}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <small>
            Already have an account? <Link to="/login">Click here</Link>
          </small>
          <div className="cat-btns">
            <button type="reset" className="secondary-btn">
              reset
            </button>
            <button
              type="button"
              className="main-btn"
              onClick={showAdditionalInfos}
            >
              continue
            </button>
          </div>
        </form>
      </div>
      <div className="black-bg" id="black-bg"></div>
      <div className="additional-infos" id="additional-infos-student">
        <h1>Almost there..</h1>
        <h3>
          Please enter the rest of your student informations and you're good to
          go
        </h3>
        <form>
          <div className="additional-inputs">
            <input
              type="number"
              required
              placeholder="Student Card Number"
              minLength="12"
              maxLength="12"
              onChange={(e) => {
                setStudentCardNum(e.target.value);
              }}
            />
            <select
              name="speciality"
              id="speciality"
              onChange={(e) => {
                setSpeciality(e.target.value);
              }}
            >
              <option disabled selected value> Speciality </option>
              <option value="TI">TI</option>
              <option value="GL">GL</option>
              <option value="SCI">SCI</option>
              <option value="SI">SI</option>
            </select>
            <select
              name="group"
              id="group"
              onChange={(e) => {
                setGroup(e.target.value);
              }}
            >
              <option disabled selected value> Group </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="cat-btns">
            <button type="reset" className="secondary-btn" onClick={goBack}>
              go back
            </button>
            <button type="button" className="main-btn" onClick={signup}>
              create
            </button>
          </div>
        </form>
      </div>
      <div className="additional-infos" id="additional-infos-teacher">
        <h1>Almost there..</h1>
        <h3>
          Please enter the rest of your teacher informations and you're good to
          go
        </h3>
        <form>
          <div className="additional-inputs">
            <input
              type="number"
              required
              placeholder="123456789"
              onChange={(e) => {
                setTeacherCode(e.target.value);
              }}
            />
            <select name="speciality" id="speciality" placeholder="Speciality" onChange={(e) => {setSpeciality(e.target.value)}}>
              <option value="TI">TI</option>
              <option value="GL">GL</option>
              <option value="SCI">SCI</option>
              <option value="SI">SI</option>
            </select>
            <select name="class" id="class" placeholder="Class" onChange={(e) => {setClassModule(e.target.value)}}>
              <option value="DAW2">DAW2</option>
              <option value="DAM">DAM</option>
              <option value="BDM">BDM</option>
              <option value="IASR">IASR</option>
              <option value="OTAM">OTAM</option>
              <option value="ACS">ACS</option>
              <option value="TEC">TEC</option>
            </select>
          </div>
          <div className="cat-btns">
            <button type="reset" className="secondary-btn" onClick={goBack}>
              go back
            </button>
            <button type="button" className="main-btn" onClick={signup}>
              confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
