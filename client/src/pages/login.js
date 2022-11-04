// import style
import "../styles/login.css";

// import utilities
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// import assets
import logo from "../assets/logo.png";
import loginImg from "../assets/login.svg";
import arrow from "../assets/arrow.svg";

function Login() {
  const [obscure, setObscure] = useState(true);

  const togglePassword = () => {
    const pwd = document.querySelector("#password");
    if (obscure) {
      setObscure(false);
      pwd.setAttribute("type", "text");
    } else {
      setObscure(true);
      pwd.setAttribute("type", "password");
    }
  };

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
        document.getElementById("login-message").style.display = "block";
        setTimeout(() => {
          document.getElementById("login-message").style.display = "none";
        }, 5000);

        if (res.data.dbresult.password === password) {
          setMessage("Login successful ✅");
          console.log(res.data);
          window.localStorage.setItem("token", res.data.dbresult._id);
          window.localStorage.setItem("firstName", res.data.dbresult.first_name);
          window.localStorage.setItem("lastName", res.data.dbresult.last_name);
          window.localStorage.setItem("loggedIn", true);
          window.localStorage.setItem("accountType", res.data.account_type);
          setTimeout(() => {
            navigate("/home");
          }, 2500);
        } else {
          setMessage("Login failed: wrong credentials ❌");
        }
      })
      .catch((err) => {
        setMessage(err + " ❌");
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
          <div className="pass">
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
            {obscure && (
              <FontAwesomeIcon
                icon={faEye}
                style={{
                  marginLeft: "-2.4rem",
                  marginBottom: "-0.3rem",
                  width: "26px",
                  height: "26px",
                  cursor: "pointer",
                  color: "#3d7b30",
                }}
                id="toggle-password"
                onClick={togglePassword}
              />
            )}
            {!obscure && (
              <FontAwesomeIcon
                icon={faEyeSlash}
                style={{
                  marginLeft: "-2.4rem",
                  marginBottom: "-0.3rem",
                  width: "26px",
                  height: "26px",
                  cursor: "pointer",
                  color: "#3d7b30",
                }}
                id="toggle-password"
                onClick={togglePassword}
              />
            )}
          </div>
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
