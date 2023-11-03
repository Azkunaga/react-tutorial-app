import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { normalAxios, authAxios } from '../../../../api/axios';
import AlertComponent from '../../../../components/alert';

const NewUserPage = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState();
    const [userRole, setUserRole] = useState("teacher");

    let [alertShow, setAlertShow] = useState(false);
    let [alert, setAlert] = useState("");

    const createUser = async(event)=>{
        try {
            console.log("creating...")
            event.preventDefault();
            const logedRole = localStorage.getItem('userData')?.role || null;

            const response = await authAxios.post("/api/users/create",
            JSON.stringify({username, userRole , "role":logedRole}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
            );
            console.log(response);
            if(response.status === 200){
                navigate(-1);
            }

        }catch(err){
            if (!err?.response.data.message) {
                setAlert("Something went wrong");
                setAlertShow(true);
            }else{
                setAlert(err?.response.data.message);
                setAlertShow(true);
            }
        }
    };

    return (
        <Container>
            <h2>Create User</h2>
            <AlertComponent show={alertShow} variant={"danger"} text={alert} action={setAlertShow}></AlertComponent>
                <Row>
                    <Col>
                        <div className='input-container'>
                            <label htmlFor='username'>Username</label>
                            <input 
                                placeholder="   "
                                type="text"
                                id="username"
                                autoComplete="off"
                                value={username}
                                required
                                aria-describedby="nameNote"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <p id="nameNote" className="instructions">
                                <i className="fa-solid fa-circle-info"></i>&nbsp;
                                The password for this user will be the same as the username.
                            </p>
                        </div>
                    </Col>

                    <Col>
                    <div className='input-container'>
                        <label htmlFor="classRole">Role</label>
                        <select 
                            name="role"
                            value={userRole}
                            required
                            onChange={(e) => setUserRole(e.target.value)}>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                                <option value="admin">Admin</option>
                        </select>
                    </div> 
                    </Col>
                    
                </Row>

                <div className='edit-actions'>
                    <button type="button" className="btn btn-dark" onClick={createUser}>Create new</button> 
                    <button type="button" className="btn btn-dark" onClick={()=>navigate(-1)}>Cancel</button> 
                </div>
        </Container>

    )
}

export default NewUserPage;