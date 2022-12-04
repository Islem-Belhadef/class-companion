import { FaPlusCircle } from "react-icons/fa";
import "../styles/home.css";
import JustifyModal from "./justify-modal";
import { useState } from "react";

const MyAbsenceCard = (props) => {
  const absence = props.absence;
  const teachersList = props.teachersList;

  const [showJustifyModal, setShowJustifyModal] = useState(false);

  const absDate = new Date(absence.date);
  const curDate = new Date();

  const dayDiff = curDate.getDate() - absDate.getDate();
  const monthDiff = curDate.getMonth() - absDate.getMonth();

  const daysInterval1 = [0, 1, 2, 3];
  const daysInterval2 = [-31, -30, -29, -28, -27];
  const monthsInterval1 = [0];
  const monthsInterval2 = [1, -12];

  const justifiable =
    (daysInterval1.indexOf(dayDiff) >= 0 &&
      monthsInterval1.indexOf(monthDiff) >= 0) ||
    (daysInterval2.indexOf(dayDiff) >= 0 &&
      monthsInterval2.indexOf(monthDiff) >= 0)
      ? true
      : false;

  return (
    <div className="card my-card">
      <div className="data">
        <div className="labels">
          <p>Class :</p>
          <p>Teacher :</p>
          <p>Date :</p>
          <p>Nature :</p>
        </div>

        <div className="values">
          <p>
            {" "}
            {
              teachersList.find((teacher) => teacher._id === absence.teacher_id)
                .class_name
            }{" "}
            - {absence.class_type}
          </p>
          <p>
            {
              teachersList.find((teacher) => teacher._id === absence.teacher_id)
                .last_name
            }{" "}
            {
              teachersList.find((teacher) => teacher._id === absence.teacher_id)
                .first_name
            }
          </p>
          <p>
            {new Date(absence.date).getDate()}/
            {new Date(absence.date).getMonth() + 1}/
            {new Date(absence.date).getFullYear()} - {absence.time}
          </p>
          <p id="nature">{absence.justified ? "Justified" : "Unjustified"}</p>
        </div>
      </div>

      {(justifiable && !absence.justification_sent && (
        <button
          className="upload-justification-btn"
          onClick={() => setShowJustifyModal(true)}
        >
          <FaPlusCircle size={18} className="fa-plus-btn" />
          Upload Justification
        </button>
      )) || (
        <button
          className="upload-justification-btn"
          disabled
          style={{ cursor: "auto", backgroundColor: "#fac3c8" }}
        >
          <FaPlusCircle size={18} className="fa-plus-btn" />
          Upload Justification
        </button>
      )}
      {showJustifyModal && (
        <JustifyModal
          absence={absence}
          setShowJustifyModal={setShowJustifyModal}
        />
      )}
    </div>
  );
};

export default MyAbsenceCard;
