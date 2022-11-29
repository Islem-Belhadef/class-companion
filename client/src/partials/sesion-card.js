



function SesionrCard(props) {
  const sesion = props.sesion;



  return (
    <div className="card">
      <div className="labels">
        <p>Module Name:</p>
        <p>type :</p>
        <p>Date :</p>
        <p>Time :</p>
        <p>Group :</p>
      </div>
      <div className="values">
        <p>{sesion.module}</p>
        <p>{sesion.class_type}</p>
        <p>{sesion.date}</p>
        <p>{sesion.time}</p>
        <p>{sesion.group}</p>
      </div>
     
      
      
     
    </div>
  );
}

export default SesionrCard;
