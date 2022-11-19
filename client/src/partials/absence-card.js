const AbsenceCard = (props) => {
  const absence = props.absence;
  const studentsList = props.studentsList;
  const teachersList = props.teachersList;

  return (
    <div className="card">
      <div className="labels">
        <p>Last Name :</p>
        <p>First Name :</p>
        <p>Speciality :</p>
        <p>Group :</p>
        <p>Class :</p>
        <p>Teacher :</p>
        <p>Date :</p>
        <p>Nature :</p>
      </div>
      <div className="values">
        <p>
          {
            studentsList.find((student) => student._id === absence.student_id)
              .last_name
          }
        </p>
        <p>
          {
            studentsList.find((student) => student._id === absence.student_id)
              .first_name
          }
        </p>
        <p>
          {
            studentsList.find((student) => student._id === absence.student_id)
              .speciality
          }
        </p>
        <p>
          0
          {
            studentsList.find((student) => student._id === absence.student_id)
              .group
          }
        </p>
        <p>
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
          {new Date(absence.date).getDate()}/{new Date(absence.date).getMonth()}
          /{new Date(absence.date).getFullYear()} -{" "}
          {new Date(absence.date).getHours()}:
          {new Date(absence.date).getMinutes()}
        </p>
        <p id="nature">{absence.justified ? "Justified" : "Unjustified"}</p>
      </div>
      <div className="ed-btns">
        <div id="edit-btn" onClick={() => {}}></div>
        <div id="delete-btn" onClick={() => {}}></div>
      </div>
    </div>
  );
};

export default AbsenceCard;
