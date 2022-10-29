//import style
import "../styles/header.css";

// import assets
import logo from "../assets/logo.png";
import avatar from "../assets/avatar.svg";

function Header() {
  return (
    <header>
      <div className="header-logo">
        <img src={logo} alt="Logo" className="logo-img" />
        <h3>Class Companion</h3>
      </div>
      <div className="user">
        <h3>Firstname Lastname</h3>
        <img src={avatar} alt="avatar" className="user-img" />
      </div>
    </header>
  );
}

export default Header;
