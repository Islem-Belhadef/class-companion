// import style
import "../styles/login.css";

// import utilities
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";

// import assets
import logo from "../assets/logo.png";
import loginImg from "../assets/login.svg";
import arrow from "../assets/arrow.svg";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      user: user,
      password: password,
    })
      .then((res) => {
        // console.log('res');
        console.log(res);
        document.getElementById('login-message').style.display = 'block';
        setTimeout(()=>{
          document.getElementById('login-message').style.display = 'none';
        }, 5000)

        if (res.data.password === password) {
          setMessage('Login successful ✅');
          window.localStorage.setItem('token', res.data._id); 
          window.localStorage.setItem('first_name', res.data.first_name); 
          window.localStorage.setItem('last_name', res.data.last_name); 
          window.localStorage.setItem('loggedIn', true);
          setTimeout(()=>{
            navigate("/home");
          }, 2500)
        }
        else {
          setMessage('Login failed: wrong credentials ❌');
        }
      })
      .catch((err) => {
        setMessage(err+' ❌');
        console.log(err);
      });
  };

  return (
    <div className="login-page">
      <div className="login-message" id="login-message">
        <h3>{message}</h3>
      </div>
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
        <form
          autoComplete="off"
          spellCheck="false"
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
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
              reset
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
