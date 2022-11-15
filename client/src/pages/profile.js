//import style
import "../styles/home.css";

//import partials
import Header from "../partials/header";
import Loading from "../partials/loading";
import SideMenu from "../partials/side-menu";

//import assets
import avatar from "../assets/avatar.svg";

//import utilities
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

function Profile() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({});

  const navigate = useNavigate();
  const accountType = window.localStorage.getItem("accountType");

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("loggedIn");

    if (!loggedIn) navigate("/login");
    else {
      setIsLoading(true);
      Axios.post("http://localhost:3001/user", {
        type: window.localStorage.getItem("accountType"),
        id: window.localStorage.getItem("token"),
      })
        .then((res) => {
          // console.log(res.data);
          setUser(res.data);
          setIsLoading(false);
          setNewEmail(res.data.email);
          setNewPassword(res.data.password);
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
          // console.log(err);
        });
    }
  }, []);

  const handleEditPress = () => {
    document.getElementById("my-profile").style.display = "none";
    document.getElementById("edit-my-profile").style.display = "flex";
  };

  const handleEdit = () => {
    Axios.post("http://localhost:3001/edit", {
      type: window.localStorage.getItem("accountType"),
      id: user._id,
      email: newEmail,
      password: newPassword,
      speciality: user.speciality,
      group: user.group,
      departement: user.departement,
      classModule: user.classModule,
    })
      .then((res) => {
        console.log(res);
        navigate("/profile");
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  const showLogoutDialog = () => {
    document.getElementById("logout-dialog").style.display = "block";
    document.getElementById("black").style.display = "block";
  };

  const handleGoBack = () => {
    document.getElementById("logout-dialog").style.display = "none";
    document.getElementById("black").style.display = "none";
    document.getElementById("edit-my-profile").style.display = "none";
    document.getElementById("my-profile").style.display = "flex";
  };

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("loggedIn");
    window.localStorage.removeItem("firstName");
    window.localStorage.removeItem("lastName");
    window.localStorage.removeItem("accountType");
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <Header />

      <div className="home">
        <SideMenu type={accountType} page="profile" />
        <div className="main-page">
          {isLoading && <Loading />}
          {error && <p>{error}</p>}
          <div className="card edit-my-profile" id="edit-my-profile">
            <img src={avatar} alt="Avatar" />
            <form onSubmit={handleEdit}>
              <div className="profile-info">
                <p className="label">Last Name :</p>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={user.last_name}
                  disabled
                />
                <p className="label">First Name :</p>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={user.first_name}
                  disabled
                />
                <p className="label">Email Address :</p>
                <input
                  type="text"
                  name="email"
                  id="email"
                  defaultValue={newEmail}
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                  }}
                />
                <p className="label">Password :</p>
                <input
                  type="password"
                  name="password"
                  id="password"
                  defaultValue={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
                {accountType === "student" && (
                  <p className="label">Speciality :</p>
                )}
                {accountType === "student" && (
                  <select
                    name="speciality"
                    id="speciality"
                    value={user.speciality}
                    disabled
                  ></select>
                )}
                {accountType === "student" && <p className="label">Group :</p>}
                {accountType === "student" && (
                  <select
                    name="group"
                    id="group"
                    value={user.group}
                    disabled
                  ></select>
                )}
                {accountType === "teacher" && (
                  <p className="label">Departement :</p>
                )}
                {accountType === "teacher" && (
                  <select
                    name="departement"
                    id="departement"
                    value={user.departement}
                    disabled
                  ></select>
                )}
                {accountType === "teacher" && <p className="label">Class :</p>}
                {accountType === "teacher" && (
                  <select
                    name="classModule"
                    id="classModule"
                    value={user.classModule}
                    disabled
                  ></select>
                )}
              </div>
              <div className="cat-btns" id="edit-cat-btns">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={handleGoBack}
                >
                  cancel
                </button>
                <button type="submit" className="main-btn">
                  update
                </button>
              </div>
            </form>
          </div>
          <div className="card my-profile" id="my-profile">
            <img src={avatar} alt="Avatar" />
            <div className="profile-info" id="profile-info">
              <p className="label">Last Name :</p>
              <p className="value">{user.last_name}</p>
              <p className="label">First Name :</p>
              <p className="value">{user.first_name}</p>
              <p className="label">Email Address :</p>
              <p className="value">{user.email}</p>
              <p className="label">Password :</p>
              <p className="value">{"**********"}</p>
            </div>
            <div className="profile-btns" id="profile-cat-btns">
              <button id="edit" onClick={handleEditPress}>
                edit
              </button>
              <button id="logout" onClick={showLogoutDialog}>
                logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="black-background" id="black" onClick={handleGoBack}></div>
      <div className="logout-dialog" id="logout-dialog">
        <h3>Are you sure you want to log out?</h3>
        <div className="cat-btns">
          <button
            type="button"
            className="secondary-btn"
            id="go-back"
            onClick={handleGoBack}
          >
            go back
          </button>
          <button
            type="button"
            className="main-btn"
            id="confirm-logout"
            onClick={handleLogout}
          >
            yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
