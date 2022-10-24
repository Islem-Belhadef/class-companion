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
  // const [studentCardNum, setStudentCardNum] = useState("");

  const signup = () => {
    if ((type === "student")) {
      Axios.post("http://localhost:3001/signup/student", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        studentCardNum: "202031026897",
      }).then((res) => {
        console.log(res);
      });
    } else {
      Axios.post("http://localhost:3001/signup/teacher", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        class: "DAW2",
      }).then((res) => {
        console.log(res);
      });
    }
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
              cancel
            </button>
            <button type="button" className="main-btn" onClick={signup}>
              create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
