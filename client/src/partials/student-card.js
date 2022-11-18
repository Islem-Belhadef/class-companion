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
    document.getElementById("edit-" + student._id).style.display = "block";
    document.getElementById("black-bg").style.display = "block";
  };

  const handleDeletePress = () => {
    document.getElementById("delete-" + student._id).style.display = "block";
    document.getElementById("black-bg").style.display = "block";
  };

  const handleGoBack = () => {
    document.getElementById("edit-" + student._id).style.display = "none";
    document.getElementById("delete-" + student._id).style.display = "none";
    document.getElementById("black-bg").style.display = "none";
  };

  const handleEdit = () => {
    Axios.post("http://localhost:3001/edit", {
      type: "student",
      id: student._id,
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
    Axios.post("http://localhost:3001/delete", {
      type: "student",
      id: student._id,
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
      <div
        className="black-background"
        id="black-bg"
        onClick={() => {
          document.getElementById("edit-" + student._id).style.display = "none";
          document.getElementById("delete-" + student._id).style.display =
            "none";
          document.getElementById("black-bg").style.display = "none";
        }}
      ></div>
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
      <div className="card delete-dialog" id={"delete-" + student._id}>
        <h3>
          Are you sure you want to delete {student.last_name} from the students
          list?
        </h3>
        <form onSubmit={handleDelete}>
          <div className="cat-btns">
            <button
              type="button"
              className="secondary-btn"
              onClick={handleGoBack}
            >
              go back
            </button>
            <button
              type="submit"
              className="main-btn"
              id="confirm-delete"
            >
              delete
            </button>
          </div>
        </form>
      </div>
      <div className="card edit-card" id={"edit-" + student._id}>
        <h2>Edit {student.last_name}'s informations</h2>
        <form onSubmit={handleEdit}>
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            name="email"
            defaultValue={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            defaultValue={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <label htmlFor="speciality">Speciality</label>
          <select
            name="speciality"
            id="speciality"
            defaultValue={newSpeciality}
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
            defaultValue={newGroup}
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
            <button type="submit" className="main-btn">
              update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentCard;
