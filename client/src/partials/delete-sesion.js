import '../styles/edit.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';


const DeleteSesion = ({setShowDeleteSesion ,sesionId, teacherId ,sesiondate, sesiontime}) => {

    let navigate = useNavigate()
    
        const handleDelete = () => {
            Axios.post("http://localhost:3001/deletesesion", {
              id: sesionId,
              teacherId:teacherId,
              date:sesiondate,
              time:sesiontime,
            })
              .then((res) => {
                console.log(res);
                console.log("deleted")
                setTimeout(()=> navigate(0),300)
              })
              .catch((err) => {
                console.log("Error: " + err);
              });
          }
       
    

    return (
        <div className="overlay">
            <div className="delete-container">
                <div className='delete-header'>
                    <h2>Delete Sesion</h2>
                </div>

                <div className='delete-text'>
                    <p>all informations will be deleted permanently,</p>
                    <p>do you want to continue?</p>
                </div>

                <div className='delete-btn-cont'>
                    <button
                        id='cancel-delete-btn'
                        onClick={()=>setShowDeleteSesion(false)}
                        >
                        CANCEL
                    </button>
                    <button
                        id='confirm-delete-btn'
                        onClick={handleDelete}
                        >
                        DELETE
                    </button>
                </div>
            </div>
        </div>

    );
    }

export default DeleteSesion;
