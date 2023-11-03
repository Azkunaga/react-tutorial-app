import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { normalAxios , authAxios} from '../../../api/axios';
import AlertComponent from '../../../components/alert';

const UsersEditPage = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [code, setCode] = useState();
    const [email, setEmail] = useState();
    const [userRole, setUserRole] = useState();
    const [state, setState] = useState();
    const [imgName, setImgName] = useState();

    let [alertShow, setAlertShow] = useState(false);
    let [alert, setAlert] = useState("");

    const [studentCode, setStudentCode] = useState(false)

    const { id } = useParams();

    const [image, setImage] = useState(null);

    const getFileInfo = (e) => {
        setImage(e.target.files[0]);
    }

    async function getUser(){
        try {
            const role = localStorage.getItem('userData')?.role || null;
            const response = await authAxios.post("/api/users/"+id,
                JSON.stringify({"role":role}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(response);
            setUsername(response?.data?.user.username);
            setFirstName(response?.data?.user.firstName);
            setLastName(response?.data?.user.lastName);
            setEmail(response?.data?.user.email);
            setUserRole(response?.data?.user.role);
            setCode(response?.data?.user.code.code); 
            setState(response?.data?.user.state);
            setImgName(response?.data?.user.profileImage);

        } catch (err) {
            if (!err?.response) {
                console.log("no response");
            }else{
                console.log("error")
            }
        }
    }

    const saveUser = async(event)=>{
        try {
            event.preventDefault();
            if(image){
                const formData = new FormData();
                formData.append("file",image);
                const response = await authAxios.post("/api/upload-image", formData,  
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
                );
                console.log(response)
                setImgName(response?.data?.image);
            }
            
            const logedRole = localStorage.getItem('userData')?.role || null;

            const response2 = await authAxios.post("/api/users/edit/"+id,
            JSON.stringify({imgName, firstName, lastName, username, state, email, code, userRole , "role":logedRole}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            console.log(response2)

            if(response2.status === 200){
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

    useEffect(()=>{
        if(userRole==="student"){
            setStudentCode(true);
        }else{
            setStudentCode(false);
            setCode(null);
        }
    },[userRole]);

    useEffect(()=>{
        getUser();
    },[id]);

    return (
        <Container>
            <h2>Edit User</h2>
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
                                onChange={(e) => {setUsername(e.target.value);}}
                            />
                        </div>
                    </Col>
                    <Col>
                    <div className='input-container'>
                        <label htmlFor="state">State</label>
                        <select
                            name="state"
                            value={state}
                            required
                            onChange={(e) => setState(e.target.value)}>
                                <option value="active">Active</option>
                                <option value="disabled">Disabled</option>
                        </select>
                    </div> 
                    </Col>
                    <Col>
                        <div className='input-container'>
                            <label for="file-ip-1">Profile Image</label>
                            <input 
                            type="file"
                            id="file-ip-1"
                            accept="image/*"
                            
                            onChange={getFileInfo} />
                        </div>
                    </Col> 
                </Row>

                <Row>
                    <Col>
                    <div className='input-container'>
                    <label htmlFor="firstName">First Name</label>
                    <input
                            placeholder=" " 
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            autoComplete="off"
                            required
                        />
                    </div>
                    
                    </Col>
                    <Col>
                    <div className='input-container'>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        placeholder=" " 
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => {setLastName(e.target.value);}}
                        autoComplete="off"
                        required
                    />
                    </div>
                    
                    </Col>

                </Row>
                
                <Row>
                    <Col>
                        <div className='input-container'>
                            <label htmlFor='email'>Email</label>
                            <input 
                                placeholder=" "
                                type="email"
                                id="email"
                                autoComplete="off"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </Col>
                </Row>

                <Row>
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
                    <Col>
                    {studentCode ?<div className='input-container'>
                        <label htmlFor="classCode">Class Code</label>
                        <input
                            placeholder=" "
                            type="text"
                            id="classCode"
                            onChange={(e) => setCode(e.target.value)}
                            value={code}
                        />
                    </div> : null}
                    </Col>
                </Row>

                <div className='edit-actions'>           
                    <button type="button" className="btn btn-dark" onClick={saveUser}>Save</button> 
                    <button type="button" className="btn btn-dark" onClick={()=>navigate(-1)}>Cancel</button> 
                </div>
        </Container>

    )
}

export default UsersEditPage;