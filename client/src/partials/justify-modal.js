import "../styles/edit.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const JustifyModal = (props) => {
  let navigate = useNavigate();

  const absence = props.absence;
  const setShowJustifyModal = props.setShowJustifyModal;

  const [justificationLink, setJustificationLink] = useState("");

  const handleJustify = () => {
    Axios.post("http://localhost:3001/justification", {
      link: justificationLink,
      absence_id: absence._id,
    })
      .then((res) => {
        setTimeout(() => navigate(0), 300);
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  return (
    <div className="overlay">
      <div className="justify-container">
        <div className="justify-header">
          <h2>Justify your absence</h2>
        </div>

        <div className="justify-text">
          <p>Please enter the google drive link to your justification</p>
        </div>

        <form onSubmit={handleJustify}>
          <input
            type="text"
            name="justification-link"
            id="justification-link"
            onChange={(e) => {
              setJustificationLink(e.target.value);
            }}
            placeholder="http://www.drive.google.com/123456"
          />
          <div className="justify-btn-cont">
            <button
              id="cancel-justify-btn"
              onClick={() => setShowJustifyModal(false)}
            >
              CANCEL
            </button>
            <button id="confirm-justify-btn" type="submit">
              UPLOAD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JustifyModal;
