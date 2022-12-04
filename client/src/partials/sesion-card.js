import DeleteSesion from "./delete-sesion";
import { useState } from "react";
function SesionCard(props) {
  const sesion = props.sesion;
  const teachrList=props.teachersList;
  const [showDeleteSesion, setShowDeleteSesion] = useState(false);

  return (
    <div className="card">
      <div className="labels">
        <p>Module Name:</p>
      {!teachrList && <p> teacher name :</p>
          }
          
        <p>type :</p>
        <p>Date :</p>
        <p>Time :</p>
        <p>Group :</p>
      </div>
      <div className="values">
        <p>{sesion.module}</p>
        <p>{sesion.class_type}</p>
        <p>{new Date(sesion.sesiondate).getDate()}/{new Date(sesion.sesiondate).getMonth()+1}
          /{new Date(sesion.sesiondate).getFullYear()}</p>
        <p>{sesion.sesiontime}</p>
        <p>{sesion.group}</p>
      </div> 
      <div className="ed-btns">
       
        <div id="delete-btn" onClick={() => {
            setShowDeleteSesion(true);
          }}></div>
      </div>
      {showDeleteSesion && (
        <DeleteSesion
          setShowDeleteSesion={setShowDeleteSesion}
          sesionId={sesion._id}
          teacherId={sesion.teacher_id}
          sesiondate={sesion.sesiondate}
          sesiontime={sesion.sesiontime}
        />
      )}
    </div>
  );
}

export default SesionCard;
