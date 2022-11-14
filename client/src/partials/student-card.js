import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentCard(props) {
  const student = props.student;
  const navigate = useNavigate();

  const [newEmail, setNewEmail] = useState(student.email);
  const [newPassword, setNewPassword] = useState(student.password);
  const [newSpeciality, setNewSpeciality] = useState(student.speciality);
  const [newGroup, setNewGroup] = useState(student.group);

  const handleEditPress = () => {
    document.getElementById("edit-card").style.display = "block";
    document.getElementById("black-bg").style.display = "block";
  };

  const handleDeletePress = () => {
    document.getElementById("delete-dialog").style.display = "block";
    document.getElementById("black-bg").style.display = "block";
  };

  const handleGoBack = () => {
    document.getElementById("edit-card").style.display = "none";
    document.getElementById("delete-dialog").style.display = "none";
    document.getElementById("black-bg").style.display = "none";
  };

  const handleEdit = () => {
    Axios.post("http://localhost:3001/edit/student", {
      student_id: student._id,
      email: newEmail,
      password: newPassword,
      speciality: newSpeciality,
      group: newGroup,
    })
      .then((res) => {
        console.log(res);
        navigate("/students");
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  const handleDelete = () => {
    Axios.post("http://localhost:3001/delete/student", {
      student_id: student._id,
    })
      .then((res) => {
        console.log(res);
        navigate("/students");
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  return (
    <div className="card">
      <div className="black-background" id="black-bg"></div>
      <div className="labels">
        <p>Last Name :</p>
        <p>First Name :</p>
        <p>Speciality :</p>
        <p>Group :</p>
        <p>Student Num :</p>
      </div>
      <div className="values">
        <p>{student.last_name}</p>
        <p>{student.first_name}</p>
        <p>{student.speciality}</p>
        <p>0{student.group}</p>
        <p>{student.student_card_num}</p>
      </div>
      <div className="ed-btns">
        <div id="edit-btn" onClick={handleEditPress}></div>
        <div id="delete-btn" onClick={handleDeletePress}></div>
      </div>
      <div className="card delete-dialog" id="delete-dialog">
        <h3>
          Are you sure you want to delete {student.last_name} from the students
          list?
        </h3>
        <div className="cat-btns">
          <button
            type="button"
            className="secondary-btn"
            onClick={handleGoBack}
          >
            go back
          </button>
          <button
            type="button"
            className="main-btn"
            id="confirm-delete"
            onClick={handleDelete}
          >
            delete
          </button>
        </div>
      </div>
      <div className="card edit-card" id="edit-card">
        <h2>Edit {student.last_name}'s informations</h2>
        <label htmlFor="email">Email Address</label>
        <input
          type="text"
          name="email"
          value={newEmail}
          onChange={(e) => {
            setNewEmail(e.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
        <label htmlFor="speciality">Speciality</label>
        <select
          name="speciality"
          id="speciality"
          value={newSpeciality}
          onChange={(e) => {
            setNewSpeciality(e.target.value);
          }}
        >
          <option value="TI">TI</option>
          <option value="GL">GL</option>
          <option value="SCI">SCI</option>
          <option value="SI">SI</option>
        </select>
        <label htmlFor="group">Group</label>
        <select
          name="group"
          id="group"
          value={newGroup}
          onChange={(e) => {
            setNewGroup(e.target.value);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <div className="cat-btns">
          <button
            type="button"
            className="secondary-btn"
            onClick={handleGoBack}
          >
            cancel
          </button>
          <button type="button" className="main-btn" onClick={handleEdit}>
            update
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentCard;
