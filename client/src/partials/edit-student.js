import "../styles/edit.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const EditStudent = ({
  setShowEditStudent,
  userId,
  userName,
  userEmail,
  userCardNumber,
  userSpeciality,
  userGroup,
}) => {
  const [newEmail, setNewEmail] = useState(userEmail);
  const [newCardNumber, setNewCardNumber] = useState(userCardNumber);
  const [newSpeciality, setNewSpeciality] = useState(userSpeciality);
  const [newGroup, setNewGroup] = useState(userGroup);

  let navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/edit", {
      type: "student",
      id: userId,
      email: newEmail,
      student_card_num: newCardNumber,
      speciality: newSpeciality,
      group: newGroup,
    })
      .then((res) => {
        console.log(res);
        console.log("updated");
        setTimeout(() => navigate(0), 300);
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  return (
    <div className="overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Edit {userName}'s informations</h2>
        </div>
        <form>
          <div className="labels">
            <label>Email</label>
          </div>
          <div className="info-inputs">
            <input
              id="email"
              type="email"
              name="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>

          <label>Card Number</label>
          <div className="info-inputs">
            <input
              id="card-number"
              type="number"
              name="card-number"
              value={newCardNumber}
              onChange={(e) => setNewCardNumber(e.target.value)}
            />
          </div>
          <div className="labels">
            <label>Speciality</label>
            <label>Group</label>
          </div>

          <div className="select-inputs">
            <select
              name="speciality"
              id="speciality"
              value={newSpeciality}
              onChange={(e) => setNewSpeciality(e.target.value)}
            >
              <option disabled selected value>
                {""}
              </option>
              <option value="TI">TI</option>
              <option value="GL">GL</option>
              <option value="SCI">SCI</option>
              <option value="SI">SI</option>
            </select>

            <select
              name="group"
              id="group"
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
            >
              <option disabled selected value>
                {""}
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="buttons-container">
            <button
              id="cancel-btn"
              className="btn"
              onClick={() => {
                setShowEditStudent(false);
              }}
            >
              CANCEL
            </button>

            <button
              className="btn"
              type="submit"
              id="submit-btn"
              onClick={handleEdit}
            >
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
