//import utilities
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faUserSlash,
  faUsers,
  faChalkboardUser,
  faPersonChalkboard
} from "@fortawesome/free-solid-svg-icons";

function SideMenu(props) {
  
  const accountType = props.type;
  const page = props.page;

  return (
    <div className="side-menu">
      <div className="section-title">
        <h3>Dashboard</h3>
        <div className="line"></div>
      </div>
      {(page === "home" && (
        <Link to="/home">
          <div className="section selected-section" id="profile">
            <FontAwesomeIcon
              icon={faHouse}
              style={{
                marginRight: "1vw",
                color: "white",
                height: "18px",
              }}
            />
            <p>Home</p>
          </div>
        </Link>
      )) || (
        <Link to="/home">
          <div className="section" id="profile">
            <FontAwesomeIcon
              icon={faHouse}
              style={{
                marginRight: "1vw",
                color: "white",
                height: "18px",
              }}
            />
            <p>Home</p>
          </div>
        </Link>
      )}
      {(page === "profile" && (
        <Link to="/profile">
          <div className="section selected-section" id="profile">
            <FontAwesomeIcon
              icon={faUser}
              style={{
                marginRight: "1vw",
                color: "white",
                height: "18px",
              }}
            />
            <p>Profile</p>
          </div>
        </Link>
      )) || (
        <Link to="/profile">
          <div className="section" id="profile">
            <FontAwesomeIcon
              icon={faUser}
              style={{
                marginRight: "1vw",
                color: "white",
                height: "18px",
              }}
            />
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
              <FontAwesomeIcon
              icon={faUsers}
              style={{
                marginRight: "1vw",
                color: 'white',
                height: '18px'
              }}
            />
              <p>Students</p>
            </div>
          </Link>
        )) || (
          <Link to="/students">
            <div className="section" id="students">
              <FontAwesomeIcon
              icon={faUsers}
              style={{
                marginRight: "1vw",
                color: 'white',
                height: '18px'
              }}
            />
              <p>Students</p>
            </div>
          </Link>
        ))}
      {accountType === "admin" &&
        ((page === "teachers" && (
          <Link to="/teachers">
            <div className="section selected-section" id="teachers">
              <FontAwesomeIcon
              icon={faChalkboardUser}
              style={{
                marginRight: "1vw",
                color: 'white',
                height: '18px'
              }}
            />
              <p>Teachers</p>
            </div>
          </Link>
        )) || (
          <Link to="/teachers">
            <div className="section" id="teachers">
              <FontAwesomeIcon
              icon={faChalkboardUser}
              style={{
                marginRight: "1vw",
                color: 'white',
                height: '18px'
              }}
            />
              <p>Teachers</p>
            </div>
          </Link>
        ))}
      {(accountType === "teacher" || accountType === "admin") &&
        ((page === "absences" && (
          <Link to="/absences">
            <div className="section selected-section" id="absences">
              <FontAwesomeIcon
              icon={faUserSlash}
              style={{
                marginRight: "1vw",
                color: 'white',
                height: '18px'
              }}
            />
              <p>Absences</p>
            </div>
          </Link>
        )) || (
          <Link to="/absences">
            <div className="section" id="absences">
              <FontAwesomeIcon
              icon={faUserSlash}
              style={{
                marginRight: "1vw",
                color: 'white',
                height: '18px'
              }}
            />
              <p>Absences</p>
            </div>
          </Link>
        ))}
      {(accountType === "teacher") &&
        ((page === "sesions" && (
          <Link to="/sesions">
            <div className="section selected-section" id="sesions">
              <FontAwesomeIcon
              icon={faPersonChalkboard}
              style={{
                marginRight: "1vw",
                color: 'white',
                height: '18px'
              }}
            />
              <p>sesions</p>
            </div>
          </Link>
        )) || (
          <Link to="/sesions">
            <div className="section" id="sesions">
              <FontAwesomeIcon
              icon={faPersonChalkboard}
              style={{
                marginRight: "1vw",
                color: 'white',
                height: '18px'
              }}
            />
              <p>sesions</p>
            </div>
          </Link>
        ))}
        {(accountType === "student") &&
        ((page === "MyAbsences" && (
          <Link to="/my-absences">
            <div className="section selected-section" id="sesions">
              <FontAwesomeIcon
              icon={faUserSlash}
              style={{
                marginRight: "1vw",
                color: 'white',
                height: '18px'
              }}
            />
              <p>My Absences</p>
            </div>
          </Link>
        )) || (
          <Link to="/my-absences">
            <div className="section" id="sesions">
              <FontAwesomeIcon
              icon={faUserSlash}
              style={{
                marginRight: "1vw",
                color: 'white',
                height: '18px'
              }}
            />
              <p>My Absences</p>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default SideMenu;
