import { useState } from "react";
import DeleteModal from '../partials/delete-modal';
import EditTeacher from '../partials/edit-teacher';


function TeacherCard(props) {
  const teacher = props.teacher;

  const [showEditTeacher , setshowEditTeacher] = useState(false)
  const [showDeletemodal , setShowDeleteModal] = useState(false)

  return (
    <div className="card">
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
        <div id="edit-btn" onClick={()=>{setshowEditTeacher(true)}}></div>
        <div id="delete-btn" onClick={()=>{setShowDeleteModal(true)}}></div>
      </div>

      {showEditTeacher && (
          <EditTeacher 
          setShowEditTeacher={setshowEditTeacher} 
          userId={teacher._id} 
          userName={teacher.last_name}
          userEmail= {teacher.email} 
          userClass={teacher.class_name}
          userDepartement={teacher.departement}

          />
       )
       }
      
      {showDeletemodal && (
        <DeleteModal setShowDeleteModal={setShowDeleteModal} type="teacher" userId={teacher._id} userName={teacher.last_name}/>
       )
       }
      
    </div>
  );
}

export default TeacherCard;
