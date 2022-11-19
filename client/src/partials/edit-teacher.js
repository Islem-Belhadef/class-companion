import '../styles/edit.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


const EditTeacher = ({ setShowEditTeacher, userId, userName, userEmail,userDepartement, userClass}) => {


    const [newEmail, setNewEmail] = useState(userEmail)
    const [newDepartement, setNewDepartement] = useState(userDepartement)
    const [newClass, setNewClass] = useState(userClass)

    let navigate = useNavigate()

    const handleEdit = (e) => {
        e.preventDefault()
        Axios.post("http://localhost:3001/edit", {
            type: "teacher",
            id: userId,
            email: newEmail,
            departement: newDepartement,
            classModule: newClass,
          })
            .then((res) => {
              console.log(res);
              console.log('updated')
              setTimeout(()=> navigate(0),300)
             
            })
            .catch((err) => {
              console.log("Error: " + err);
            });
    }

    return (
        <div className="overlay">
            <div className="modal-container">
                <div className='modal-header'>
                    <h2>
                        Edit {userName}'s informations
                    </h2>
                </div>
                <form>

                    <div className='labels'>
                        <label>Email</label>

                    </div>
                    <div className='info-inputs'>
                        <input
                            id='email'
                            type='email'
                            name='email'
                            value= {newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}

                        />
                        

                    </div>
                    
                    <div className='labels'>
                        <label>Departement</label>
                        <label>Class</label>

                    </div>

                    <div className='select-inputs'>
                        <select
                            name="departement"
                            id="departement"
                            value={newDepartement}
                            onChange={(e) => setNewDepartement(e.target.value)}
                        >
                            <option disabled selected value>
                                {''}

                            </option>
                            <option value="MI">MI</option>
                            <option value="IFA">IFA</option>
                            <option value="TLSI">TLSI</option>

                        </select>

                        <select
                            name="class"
                            id="class"
                            value={newClass}
                            onChange={(e) => setNewClass(e.target.value)}
                        >
                            <option disabled selected value>
                                {''}

                            </option>
                            <option value="DAW2">DAW2</option>
                            <option value="DAM">DAM</option>
                            <option value="BDM">BDM</option>
                            <option value="IASR">IASR</option>
                            <option value="OTAM">OTAM</option>
                            <option value="ACS">ACS</option>
                            <option value="TEC">TEC</option>
                        </select>

                    </div>
                    <div className='buttons-container'>

                        <button
                            id='cancel-btn'
                            className='btn'
                            onClick={() => { setShowEditTeacher(false)}}
                        >
                            CANCEL
                        </button>

                        <button
                            className='btn'
                            type='submit'
                            id='submit-btn'
                            
                            onClick={handleEdit}
                        >
                        UPDATE
                        </button>


                    </div>

                </form>
            </div>
        </div>

    );
}

export default EditTeacher;
