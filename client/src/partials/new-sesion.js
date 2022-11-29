import "../styles/edit.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const NewSesion = ({ setShowAddSesion }) => {
  useEffect(() => {
    Axios.post("http://localhost:3001/user", {
      type: "teacher",
      id: window.localStorage.getItem("token"),
    }).then((res) => {
      setclasseModule(res.data.class_name);
    });
  }, []);

  let sesdate;
  let sestime;
  let sestype;
  let sesgroup;
  
  const [newDate, setNewDate] = useState(sesdate);
  const [Time, setTime] = useState(sestime);
  const [Newtype, setNewtype] = useState(sestype);
  const [newGroup, setNewGroup] = useState(sesgroup);
  const [classeModule, setclasseModule] = useState();

  let navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/addsesion", {
      teacher_id: window.localStorage.getItem("token"),
      sesiondate: newDate,
      sesiontime: Time,
      class_type: Newtype,
      module: classeModule,
      group: newGroup,
    })
      .then((res) => {
        console.log(res);
        console.log("added");
        setTimeout(() => navigate(0), 300);
        navigate("/studentsbygroup", {
          state: {
            teacher_id: window.localStorage.getItem("token"),
            sesiondate: newDate,
            sesiontime: Time,
            class_type: Newtype,
          },
        });
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  return (
    <div className="overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Add new session</h2>
        </div>
        <form onSubmit={handleCreate}>
          <div className="labels">
            <label>Date</label>
          </div>
          <div className="info-inputs">
            <input
              id="email"
              type="date"
              name="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </div>

          <label>Time</label>
          <div className="info-inputs">
            <input
              id="card-number"
              type="time"
              name="sesiontime"
              value={Time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="labels">
            <label>Type</label>
            <label>Group</label>
          </div>
          <div className="select-inputs">
            <select
              name="class_type"
              id="speciality"
              value={Newtype}
              onChange={(e) => setNewtype(e.target.value)}
            >
              <option disabled selected value>
                {""}
              </option>
              <option value="TP">TP</option>
              <option value="TD">TD</option>
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
                setShowAddSesion(false);
              }}
            >
              CANCEL
            </button>

            <button
              className="btn"
              type="submit"
              id="submit-btn"
            >
              CREATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewSesion;
