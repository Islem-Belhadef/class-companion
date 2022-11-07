//import style
import "../styles/home.css";

//import partials
import Header from "../partials/header";
import SideMenu from "../partials/side-menu";

//import utilities
import { useNavigate } from "react-router-dom";
import { useEffect} from "react";

function Home() {
  const navigate = useNavigate();
  const accountType = window.localStorage.getItem("accountType");

  useEffect(() => {
    const loggedIn = window.localStorage.getItem('loggedIn');
  
    if (!loggedIn) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="home-page">
      <Header />
      <div className="home">
        <SideMenu type={accountType} page='home'/>
        <div className="main-page">
        </div>
      </div>
    </div>
  );
}

export default Home;
