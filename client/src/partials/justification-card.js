import Axios from "axios";
import { useState, useEffect } from "react";

const JustificationCard = (props) => {
  const justification = props.justification;
  const studentsList = props.studentsList;
  const teachersList = props.teachersList;

  const [absenceInfo, setAbsenceInfo] = useState([]);
  const [isJustified, SetIsJustified] = useState();

  useEffect(() => {
    Axios.get(`http://localhost:3001/absence/${justification.absence_id}`)
      .then((res) => {
        console.log(res.data);
        setAbsenceInfo(res.data);
        SetIsJustified(res.data.justified);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAccept = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/editAbsenceType", {
      id: justification.absence_id,
      justified: true,
    })
      .then((res) => {
        console.log(res);
        SetIsJustified(true);
        console.log("accepted");
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  return (
    <div className="just_card">
      <div className="justification_body">
        <div className="labels">
          <p>Last Name :</p>
          <p>First Name :</p>
          <p>Class :</p>
          <p>Teacher :</p>
          <p>Date :</p>
          <p>Group :</p>
          <p>Speciality :</p>
        </div>

        <div className="values">
          <p>
            {studentsList &&
              absenceInfo.student_id &&
              studentsList.find(
                (student) => student._id === absenceInfo.student_id
              ).last_name}
          </p>
          <p>
            {studentsList &&
              absenceInfo.student_id &&
              studentsList.find(
                (student) => student._id === absenceInfo.student_id
              ).first_name}
          </p>
          <p>
            {absenceInfo.class_name} - {absenceInfo.class_type}
          </p>
          <p>
            {teachersList &&
              absenceInfo.teacher_id &&
              teachersList.find(
                (teacher) => teacher._id === absenceInfo.teacher_id
              ).last_name}{" "}
            {teachersList &&
              absenceInfo.teacher_id &&
              teachersList.find(
                (teacher) => teacher._id === absenceInfo.teacher_id
              ).first_name}
          </p>
          <p>
            {new Date(absenceInfo.date).getDate()}/
            {new Date(absenceInfo.date).getMonth() + 1}/
            {new Date(absenceInfo.date).getFullYear()} - {absenceInfo.time}
          </p>
          <p>
            0
            {studentsList &&
              absenceInfo.student_id &&
              studentsList.find(
                (student) => student._id === absenceInfo.student_id
              ).group}
          </p>
          <p>
            {studentsList &&
              absenceInfo.student_id &&
              studentsList.find(
                (student) => student._id === absenceInfo.student_id
              ).speciality}
          </p>
        </div>
      </div>
      <div className="justification_btns">
        <a id="check_btn" href={justification.link}>
          check the link
        </a>

        {isJustified === true ? (
          <button className="acpt_btn" id="accepted_btn">
            accepted
          </button>
        ) : (
          <button className="acpt_btn" id="accept_btn" onClick={handleAccept}>
            accept
          </button>
        )}
      </div>
    </div>
  );
};

export default JustificationCard;
