import "../styles/error.css";

import { useNavigate } from 'react-router-dom';

import error from "../assets/404.svg";

function Error() {

  const navigate = useNavigate();

  return (
    <div className="error-page">
      <img src={error} alt="404 Page" className="error-illustration"/>
      <h1>URL Not Found</h1>
      <p>Sorry we can't find the page you're looking for</p>
      <button className="main-btn" onClick={() => navigate('/')}>back to home </button>
    </div>
  );

}

export default Error;
