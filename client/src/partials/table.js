import '../styles/table.css'
import Axios from 'axios'
import { useNavigate } from "react-router-dom";

let currentPresentStudents=[];
const Trigger = (e) => {
  if(!currentPresentStudents.includes(e._id)){
   currentPresentStudents.push(e._id)
    console.log(currentPresentStudents)}else
    {
        currentPresentStudents.splice(currentPresentStudents.indexOf(e._id), 1);
        console.log(currentPresentStudents)
    }
  }

const Table = ({ data, column,sesiondata }) => {
  const time=sesiondata[0].sesiontime;
  const date=sesiondata[0].sesiondate;
  const classType=sesiondata[0].class_type;
  const teacherId=sesiondata[0].teacher_id;
  const className=sesiondata[0].class_name;
   console.log(sesiondata[0].sesiondate)
   console.log(sesiondata[0].sesiontime)
   console.log(sesiondata[0].class_type)
   console.log(sesiondata[0].teacher_id)
   console.log(sesiondata[0].class_name)
      const navigate = useNavigate();
   
    const handleConfirm = (e) => {
        e.preventDefault()
        Axios.post("http://localhost:3001/addabsences", { 
          time:time,
          date:date,
          class_name:sesiondata[0].class_name.split(" ")[0],
          class_type:classType,
           absentStudents:currentPresentStudents,
           teacher_id:teacherId,
          })
            .then((res) => {
              console.log(res);
              console.log('added absences')
              
              setTimeout(()=> navigate(0),300)

             
            })
            .catch((err) => {
              console.log("Error: " + err);
            });
            navigate("/sesions")
          }
  return (
    <form method="post">
         <table>
      <thead>
        <tr>
          {column.map((item, index) => <TableHeadItem item={item} />)}
        </tr>
       
      </thead>
      <tbody>
        {data.map((item, index) => <TableRow item={item} column={column} />)}
      </tbody>
    </table>
    <button type="submit" id="submit-btn" onClick={handleConfirm}>confirm</button>
    </form>
   
  )
}

const TableHeadItem = ({ item }) => {
  if(item.heading==="id"){
    return ;
  }
return <th>{item.heading}</th>}
const TableRow = ({ item, column }) => (

  

    <tr>
    { 
    column.map((columnItem, index) => {
      
     
      if(columnItem.value==="") {
    
        return <td><input type="checkbox" name="present" id="present" onClick={() => Trigger(item)}/></td>
      }
      if(columnItem.heading==="id"){
        
        return //<td>{`${index}`}</td>
        
      }

      return <td>{item[`${columnItem.value}`]}</td>
    })}
  </tr>
)

export default Table
