import "../styles/login.css";

import { Link, redirect } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import logo from "../assets/logo.png";
import loginImg from "../assets/login.svg";
import arrow from "../assets/arrow.svg";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    console.log(user);
    console.log(password);
    Axios.post("http://localhost:3001/login", {
      user: user,
      password: password,
    }).then((res) => {
      console.log(res);
      if (res.data.password === password) {
        console.log('redirecting......');
        redirect('/home');
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="login-page">
      <div className="login-banner">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
          <h3>Class Companion</h3>
        </div>
        <img
          src={loginImg}
          className="login-illustration"
          alt="Login Illustration"
        />
        <div className="continue">
          <h1>
            Authenticate
            <br />
            to continue
          </h1>
          <img src={arrow} alt="Arrow" />
        </div>
      </div>
      <div className="login-form">
        <div className="welcome">
          <h1>Welcome back</h1>
          <h2>To Class Companion of University of Constantine 2</h2>
        </div>
        <form autoComplete="off" spellCheck="false">
          <label htmlFor="email">Email Address </label>
          <input
            type="text"
            name="email"
            id="email"
            required
            maxLength={50}
            onChange={(e) => {
              setUser(e.target.value);
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
            Don't have an account? <Link to="/signup">Click here</Link>
          </small>
          <div className="cat-btns">
            <button type="reset" className="secondary-btn">
              cancel
            </button>
            <button type="button" className="main-btn" onClick={login}>
              login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
