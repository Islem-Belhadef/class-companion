import '../styles/edit.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const DeleteModal = ({setShowDeleteModal ,type, userId , userName}) => {

    let navigate = useNavigate()
    
        const handleDelete = () => {
            axios.post("http://localhost:3001/delete", {
              type: type,
              id: userId,
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
                    <h2>Delete {userName}</h2>
                </div>

                <div className='delete-text'>
                    <p>all informations will be deleted permanently,</p>
                    <p>do you want to continue?</p>
                </div>

                <div className='delete-btn-cont'>
                    <button
                        id='cancel-delete-btn'
                        onClick={()=>setShowDeleteModal(false)}
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

export default DeleteModal;
