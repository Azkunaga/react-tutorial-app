import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import BackButton from '../../../components/backButton'
import { useParams } from 'react-router-dom';
import { normalAxios } from '../../../api/axios';

const UsersEditPage = () => {

    const [username, setUsername] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [code, setCode] = useState();
    const [email, setEmail] = useState();
    const [userRole, setUserRole] = useState();
    const [state, setState] = useState();

    const [studentCode, setStudentCode] = useState(false)

    const { id } = useParams();

    const [image, setImage] = useState(null);

    const getFileInfo = (e) => {
        setImage(e.target.files[0]);
    }

    const getUser = async() =>{
        try {
            const role = localStorage.getItem('userData')?.role || null;
            const response = await normalAxios.post("/api/users/"+id,
                JSON.stringify({"role":role}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            setUsername(response?.data?.user.username);
            setFirstName(response?.data?.user.firstName);
            setLastName(response?.data?.user.lastName);
            setEmail(response?.data?.user.email);
            setUserRole(response?.data?.user.role);
            setCode(response?.data?.user.code); 
            setState(response?.data?.user.state);

        } catch (err) {
            if (!err?.response) {
                console.log("no response");
            }else{
                console.log("error")
            }
        }
    }

    const handleSubmit = async(event)=>{
        try {
            event.preventDefault();
            const formData = new FormData(); 
            formData.append("file",image);
            const response = await normalAxios.post("/api/upload-image", formData,  
            {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            }
            );

            const imageName = response?.data?.image;

            const logedRole = localStorage.getItem('userData')?.role || null;

            const response2 = await normalAxios.post("/api/users/edit/"+id,
            JSON.stringify({imageName, firstName, lastName, username, state, email, code, userRole , "role":logedRole}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );

        }catch(err){
            if (!err?.response) {
                console.log("not response")
                console.log(err);
            }else{
                console.log(err);
            }
        }
    };

    useEffect(()=>{
        getUser();
    },[id]);

    useEffect(()=>{
        if(userRole==="student"){
            setStudentCode(true);
        }else{
            setStudentCode(false);
            setCode(null);
        }
    },[userRole]);

    return (
        <Container>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit} >
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
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
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
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
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
                        <button type="button" className="btn btn-dark" onClick={handleSubmit}>Save</button> 
                </div>
            </form>
            <BackButton></BackButton>
        </Container>

    )
}

export default UsersEditPage;