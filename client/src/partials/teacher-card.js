import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TeacherCard(props) {
  const teacher = props.teacher;
  const navigate = useNavigate();

  const [newEmail, setNewEmail] = useState(teacher.email);
  const [newPassword, setNewPassword] = useState(teacher.password);
  const [newDepartement, setNewDepartement] = useState(teacher.departement);
  const [newClass, setNewClass] = useState(teacher.class);

  const handleEditPress = () => {
    document.getElementById("edit-card").style.display = "block";
    document.getElementById("blk-bg").style.display = "block";
  };

  const handleDeletePress = () => {
    document.getElementById("delete-dialog").style.display = "block";
    document.getElementById("blk-bg").style.display = "block";
  };

  const handleGoBack = () => {
    document.getElementById("edit-card").style.display = "none";
    document.getElementById("delete-dialog").style.display = "none";
    document.getElementById("blk-bg").style.display = "none";
  };

  const handleEdit = () => {
    Axios.post("http://localhost:3001/edit", {
      id: teacher._id,
      email: newEmail,
      password: newPassword,
      departement: newDepartement,
      classModule: newClass,
    })
      .then((res) => {
        console.log(res);
        navigate("/teachers");
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  const handleDelete = () => {
    Axios.post("http://localhost:3001/delete/teacher", {
      teacher_id: teacher._id,
    })
      .then((res) => {
        console.log(res);
        navigate("/teachers");
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  return (
    <div className="card">
      <div className="black-background" id="blk-bg"></div>
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
        <div id="edit-btn" onClick={handleEditPress}></div>
        <div id="delete-btn" onClick={handleDeletePress}></div>
      </div>
      <div className="card delete-dialog" id="delete-dialog">
        <h3>
          Are you sure you want to delete {teacher.last_name} from the teachers
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
        <h2>Edit {teacher.last_name}'s informations</h2>
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
        <label htmlFor="departement">Departement</label>
        <select
          name="departement"
          id="departement"
          value={newDepartement}
          onChange={(e) => {
            setNewDepartement(e.target.value);
          }}
        >
          <option value="MI">MI</option>
          <option value="IFA">IFA</option>
          <option value="TLSI">TLSI</option>
        </select>
        <label htmlFor="classModule">Class</label>
        <select
          name="classModule"
          id="classModule"
          value={newClass}
          onChange={(e) => {
            setNewClass(e.target.value);
          }}
        >
          <option value="DAW2">DAW2</option>
          <option value="DAM">DAM</option>
          <option value="BDM">BDM</option>
          <option value="IASR">IASR</option>
          <option value="OTAM">OTAM</option>
          <option value="ACS">ACS</option>
          <option value="TEC">TEC</option>
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

export default TeacherCard;
