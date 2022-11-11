//import style
import "../styles/home.css";

//import partials
import Header from "../partials/header";
import Loading from "../partials/loading";
import SideMenu from "../partials/side-menu";

//import utilities
import Axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

function Teachers() {
  const navigate = useNavigate();

  const loggedIn = window.localStorage.getItem("loggedIn");
  const accountType = window.localStorage.getItem("accountType");

  const [teachersList, setTeachersList] = useState([]);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [departementFilter, setDepartementFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [alphabeticOrder, setAlphabeticOrder] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [departement, setDepartement] = useState("MI");
  const [classModule, setClassModule] = useState("DAW2");

  const handleAddUser = () => {
    document.getElementById("teachers-page").style.display = "none";
    document.getElementById("add-teacher-page").style.display = "block";
  };

  const handleCancel = () => {
    document.getElementById("add-teacher-page").style.display = "none";
    document.getElementById("teachers-page").style.display = "block";
  };

  const handleSubmit = () => {
    Axios.post("http://localhost:3001/signup", {
      teacherCode: "12345679",
      type: "teacher",
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      departement: departement,
      classModule: classModule
    })
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          navigate("/teachers");
        }, 1500);
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      setIsLoading(true);

      setTimeout(() => {
        Axios.get("http://localhost:3001/teachers")
          .then((res) => {
            console.log(res.data);
            setTeachersList(res.data);
            setIsLoading(false);
          })
          .catch((err) => {
            setError(err);
            console.log(err);
            setIsLoading(false);
          });
      }, 1000);
    }
  }, []);

  return (
    <div className="home-page">
      <Header />
      <div className="home">
        <SideMenu type={accountType} page="teachers" />
        <div className="main-page" id="teachers-page">
          <div className="settings">
            <h1>Teachers List</h1>
            <form className="filters">
              <select
                name="filter-by-departement"
                id="filter-by-departement"
                defaultValue=""
                onChange={(e) => {
                  setDepartementFilter(e.target.value);
                }}
              >
                <option disabled value="">
                  Filter by departement
                </option>
                <option value="MI">MI</option>
                <option value="IFA">IFA</option>
                <option value="TLSI">TLSI</option>
              </select>
              <select
                name="filter-by-class"
                id="filter-by-class"
                defaultValue=""
                onChange={(e) => {
                  setClassFilter(e.target.value);
                }}
              >
                <option disabled value="">
                  Filter by class
                </option>
                <option value="DAW2">DAW2</option>
                <option value="DAM">DAM</option>
                <option value="BDM">BDM</option>
                <option value="IASR">IASR</option>
                <option value="OTAM">OTAM</option>
                <option value="ACS">ACS</option>
                <option value="TEC">TEC</option>
              </select>
              <div>
                <input
                  type="checkbox"
                  name="order-alphabetically"
                  id="order-alphabetically"
                  onClick={() => {
                    setAlphabeticOrder(!alphabeticOrder);
                  }}
                />
                <label htmlFor="order-alphabetically">
                  Order alphabetically
                </label>
              </div>
            </form>
          </div>
          <button className="main-btn add-user" onClick={handleAddUser}>
            <FontAwesomeIcon
              icon={faUserPlus}
              style={{
                marginRight: "1vw",
              }} 
            />
            add teacher
          </button>
          {isLoading && <Loading />}
          {!error && <p>{error}</p>}

          {/* no filters */}
          {(!isLoading &&
            !error &&
            !departementFilter &&
            !classFilter &&
            !alphabeticOrder && (
              <div className="cards">
                {teachersList.map((teacher) => (
                  <div className="card" key={teacher._id}>
                    <div className="labels">
                      <p>Last Name :</p>
                      <p>First Name :</p>
                      <p>Departement :</p>
                      <p>Class :</p>
                    </div>
                    <div className="values">
                      <p>{teacher.last_name}</p>
                      <p>{teacher.first_name}</p>
                      <p>{teacher.departement}</p>
                      <p>{teacher.class_name}</p>
                    </div>
                    <div className="ed-btns">
                      <div id="edit-btn" onClick={() => {}}></div>
                      <div id="delete-btn" onClick={() => {}}></div>
                    </div>
                  </div>
                ))}
              </div>
            )) ||
            (!isLoading &&
              !error &&
              !departementFilter &&
              !classFilter &&
              alphabeticOrder && (
                <div className="cards">
                  {teachersList
                    .slice(0, teachersList.length)
                    .sort((a, b) =>
                      a.last_name < b.last_name
                        ? -1
                        : a.last_name > b.last_name
                        ? 1
                        : 0
                    )
                    .map((teacher) => (
                      <div className="card" key={teacher._id}>
                        <div className="labels">
                          <p>Last Name :</p>
                          <p>First Name :</p>
                          <p>Departement :</p>
                          <p>Class :</p>
                        </div>
                        <div className="values">
                          <p>{teacher.last_name}</p>
                          <p>{teacher.first_name}</p>
                          <p>{teacher.departement}</p>
                          <p>{teacher.class_name}</p>
                        </div>
                        <div className="ed-btns">
                          <div id="edit-btn" onClick={() => {}}></div>
                          <div id="delete-btn" onClick={() => {}}></div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}

          {/* filter departement */}
          {(!isLoading &&
            !error &&
            departementFilter &&
            !classFilter &&
            !alphabeticOrder && (
              <div className="cards">
                {teachersList
                  .filter(
                    (teacher) => teacher.departement === departementFilter
                  )
                  .map((teacher) => (
                    <div className="card" key={teacher._id}>
                      <div className="labels">
                        <p>Last Name :</p>
                        <p>First Name :</p>
                        <p>Departement :</p>
                        <p>Class :</p>
                      </div>
                      <div className="values">
                        <p>{teacher.last_name}</p>
                        <p>{teacher.first_name}</p>
                        <p>{teacher.departement}</p>
                        <p>{teacher.class_name}</p>
                      </div>
                      <div className="ed-btns">
                        <div id="edit-btn" onClick={() => {}}></div>
                        <div id="delete-btn" onClick={() => {}}></div>
                      </div>
                    </div>
                  ))}
              </div>
            )) ||
            (!isLoading &&
              !error &&
              departementFilter &&
              !classFilter &&
              alphabeticOrder && (
                <div className="cards">
                  {teachersList
                    .filter(
                      (teacher) => teacher.departement === departementFilter
                    )
                    .sort((a, b) =>
                      a.last_name < b.last_name
                        ? -1
                        : a.last_name > b.last_name
                        ? 1
                        : 0
                    )
                    .map((teacher) => (
                      <div className="card" key={teacher._id}>
                        <div className="labels">
                          <p>Last Name :</p>
                          <p>First Name :</p>
                          <p>Departement :</p>
                          <p>Class :</p>
                        </div>
                        <div className="values">
                          <p>{teacher.last_name}</p>
                          <p>{teacher.first_name}</p>
                          <p>{teacher.departement}</p>
                          <p>{teacher.class_name}</p>
                        </div>
                        <div className="ed-btns">
                          <div id="edit-btn" onClick={() => {}}></div>
                          <div id="delete-btn" onClick={() => {}}></div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}

          {/* filter class */}
          {(!isLoading &&
            !error &&
            !departementFilter &&
            classFilter &&
            !alphabeticOrder && (
              <div className="cards">
                {teachersList
                  .filter((teacher) => teacher.class_name === classFilter)
                  .map((teacher) => (
                    <div className="card" key={teacher._id}>
                      <div className="labels">
                        <p>Last Name :</p>
                        <p>First Name :</p>
                        <p>Departement :</p>
                        <p>Class :</p>
                      </div>
                      <div className="values">
                        <p>{teacher.last_name}</p>
                        <p>{teacher.first_name}</p>
                        <p>{teacher.departement}</p>
                        <p>{teacher.class_name}</p>
                      </div>
                      <div className="ed-btns">
                        <div id="edit-btn" onClick={() => {}}></div>
                        <div id="delete-btn" onClick={() => {}}></div>
                      </div>
                    </div>
                  ))}
              </div>
            )) ||
            (!isLoading &&
              !error &&
              !departementFilter &&
              classFilter &&
              alphabeticOrder && (
                <div className="cards">
                  {teachersList
                    .filter((teacher) => teacher.class_name === classFilter)
                    .sort((a, b) =>
                      a.last_name < b.last_name
                        ? -1
                        : a.last_name > b.last_name
                        ? 1
                        : 0
                    )
                    .map((teacher) => (
                      <div className="card" key={teacher._id}>
                        <div className="labels">
                          <p>Last Name :</p>
                          <p>First Name :</p>
                          <p>Departement :</p>
                          <p>Class :</p>
                        </div>
                        <div className="values">
                          <p>{teacher.last_name}</p>
                          <p>{teacher.first_name}</p>
                          <p>{teacher.departement}</p>
                          <p>{teacher.class_name}</p>
                        </div>
                        <div className="ed-btns">
                          <div id="edit-btn" onClick={() => {}}></div>
                          <div id="delete-btn" onClick={() => {}}></div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}

          {/* filter departement and class */}
          {(!isLoading &&
            !error &&
            departementFilter &&
            classFilter &&
            !alphabeticOrder && (
              <div className="cards">
                {teachersList
                  .filter(
                    (teacher) => teacher.departement === departementFilter
                  )
                  .filter((teacher) => teacher.class_name === classFilter)
                  .map((teacher) => (
                    <div className="card" key={teacher._id}>
                      <div className="labels">
                        <p>Last Name :</p>
                        <p>First Name :</p>
                        <p>Departement :</p>
                        <p>Class :</p>
                      </div>
                      <div className="values">
                        <p>{teacher.last_name}</p>
                        <p>{teacher.first_name}</p>
                        <p>{teacher.departement}</p>
                        <p>{teacher.class_name}</p>
                      </div>
                      <div className="ed-btns">
                        <div id="edit-btn" onClick={() => {}}></div>
                        <div id="delete-btn" onClick={() => {}}></div>
                      </div>
                    </div>
                  ))}
              </div>
            )) ||
            (!isLoading &&
              !error &&
              departementFilter &&
              classFilter &&
              alphabeticOrder && (
                <div className="cards">
                  {teachersList
                    .filter(
                      (teacher) => teacher.departement === departementFilter
                    )
                    .filter((teacher) => teacher.class_name === classFilter)
                    .sort((a, b) =>
                      a.last_name < b.last_name
                        ? -1
                        : a.last_name > b.last_name
                        ? 1
                        : 0
                    )
                    .map((teacher) => (
                      <div className="card" key={teacher._id}>
                        <div className="labels">
                          <p>Last Name :</p>
                          <p>First Name :</p>
                          <p>Departement :</p>
                          <p>Class :</p>
                        </div>
                        <div className="values">
                          <p>{teacher.last_name}</p>
                          <p>{teacher.first_name}</p>
                          <p>{teacher.departement}</p>
                          <p>{teacher.class_name}</p>
                        </div>
                        <div className="ed-btns">
                          <div id="edit-btn" onClick={() => {}}></div>
                          <div id="delete-btn" onClick={() => {}}></div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
        </div>
        <div className="add-user-page" id="add-teacher-page">
          <form onSubmit={handleSubmit}>
            <h2>Add New Teacher</h2>
            <div className="input-grid">
              <label htmlFor="first-name">First Name</label>
              <label htmlFor="last-name">Last Name</label>
              <input type="text" name="first-name" onChange={(e) => {
                setFirstName(e.target.value);
              }}/>
              <input type="text" name="last-name" onChange={(e) => {
                setLastName(e.target.value);
              }}/>
            </div>
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" id="email" onChange={(e) => {
                setEmail(e.target.value);
              }}/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={(e) => {
                setPassword(e.target.value);
              }}/>
            <div className="input-grid">
              <label htmlFor="departement">Departement</label>
              <label htmlFor="class">Class</label>
              <select name="departement" id="departement" onChange={(e) => {
                setDepartement(e.target.value);
              }}>
                <option value="MI">MI</option>
                <option value="IFA">IFA</option>
                <option value="TLSI">TLSI</option>
              </select>
              <select name="class" id="class" onChange={(e) => {
                setClassModule(e.target.value);
              }}>
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
              <button type="button" className="secondary-btn" onClick={handleCancel}>
                cancel
              </button>
              <button type="submit" className="main-btn">
                add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Teachers;
