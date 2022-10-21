import '../styles/login.css';

import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import loginImg from "../assets/login.svg";
import arrow from "../assets/arrow.svg";

function Login() {
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
        <form action="#" method="POST" autoComplete="off">
          <label htmlFor="email">Email Address </label>
          <input type="text" name="email" id="email" required maxLength={50} />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            maxLength={40}
          />
          <small>
            Don't have an account? <Link to="/signup">Click here</Link>
          </small>
          <div className="cat-btns">
            <button type="reset" className="secondary-btn">
              cancel
            </button>
            <button type="submit" className="main-btn">
              login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
