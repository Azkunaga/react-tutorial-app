import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import {normalAxios,SERVER_URL} from '../../../api/axios'
import {Row,Col} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {MDBTable, MDBTableHead, MDBTableBody} from  'mdb-react-ui-kit'
import profile from '../../../img/profile.jpg';

const MonitoringPage = () => {

    const user = JSON.parse(localStorage.getItem('userData'));

    const [code,setCode] = useState(null);
    const [codes,setCodes] = useState([]);

    const [newCode,setNewCode] = useState();
    const [errCode, setCodeErr] = useState("");

    const [users,setUsers] = useState([]);

    const getMyUsers = async () =>{
        try {
            const response = await normalAxios.post('/api/users/code',
                JSON.stringify({username:user?.username, code:code}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log("Response",response)
            setUsers(response?.data?.users);

        } catch (err) {
            if (!err?.response) {
                console.log("not response")
                setUsers([])
            }else{
                setUsers([])
            }
        }
    }

    const createCode = async () =>{
        try {
            if(newCode){
                const response = await normalAxios.post('/api/code/create',
                JSON.stringify({username:user?.username, code:newCode}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log("Response",response)
                if(response?.data?.code===null){
                    setCodeErr("Already exists")
                }else{
                    setNewCode("");
                    getCodes();
                }
           
            }else{
                setCodeErr("It can't be empty");
            }
            
        } catch (err) {
            if (!err?.response) {
                console.log("not response")
            }else{
                setCodeErr(err.error.message);
            }
        }
    }

    const getCodes = async()=>{
        try {
            const response = await normalAxios.post('/api/code/teacher',
                JSON.stringify({username:user?.username}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log("Response",response)
            setCodes(response?.data?.codes);
            setCode(response?.data?.codes[0]?.code);
            getMyUsers();

        } catch (err) {
            if (!err?.response) {
                console.log("not response")
                setUsers([])
            }else{
                setUsers([])
            }
        }
    }

    useEffect(()=>{
        if(code!==""){
            getMyUsers();
        }
    },[code])

    useEffect(()=>{
        setCodeErr("");
    },[code,newCode])

    useEffect(()=>{
        getCodes();
    },[])

    const navigate = useNavigate();

    return (
        <Container>
            <div className='code'>
            <h3>Code options</h3>
            <Row>
                <Col md={3} >
                    <div className='input-container'>
                        <label htmlFor='code'>My class codes: </label>
                        <select
                            id="code"
                            value={code}
                            required
                            onChange={(e) => setCode(e.target.value)}
                        >
                            {codes?.map((el)=>
                                <option key={el._id} value={el.code}>{el.code}</option>
                            )}
                        </select>
                    </div>
                    </Col>
                <Col></Col>
                <Col md={3}>
                    <div className='input-container'>
                        <label htmlFor='new'>Create Code</label>
                        <input type="text"
                        placeholder=" "
                        id="new"
                        autoComplete="off"
                        value={newCode}
                        onChange={(e) => setNewCode(e.target.value)}
                        />
                        <p className={errCode ? "errmsg" : "offscreen"} aria-live="assertive">{errCode}</p>
                    </div>
                    
                    <div className='button-right'>
                        <Button variant='dark' onClick={()=>createCode()}>Create</Button>
                    </div>
                    
                    </Col>
                </Row>
            </div>
            <h3>Students list</h3>
            <MDBTable align='middle' responsive>
            <MDBTableHead>
                <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Username</th>
                    <th scope='col'>Monitor student</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {users?.map((el)=>
                    <tr key={el._id}>
                    <td>
                        <div className='d-flex align-items-center'>
                        <img
                            src = {el.profileImage ?  SERVER_URL+"/userImages/"+el.profileImage : profile}
                            alt= 'profile picture'
                            style={{ width: '45px', height: '45px' }}
                            className='rounded-circle'
                        />
                        <div className='ms-3'>
                            <p className='fw-bold mb-1'>{el.firstName + " " + el.lastName}</p>
                            <p className='text-muted mb-0'>{el.email}</p>
                        </div>
                        </div>
                    </td>
                    <td>
                        <p className='fw-normal mb-1'>{el.username}</p>
                    </td>
                    <td className='actions'>
                        <a href={'/teacher/students/'+el._id}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        </a>
                    </td>
                    </tr>
                )}
            </MDBTableBody>
            </MDBTable>

            <div className='button-right'>
                <Button variant='dark' onClick={()=>navigate(-1)}>Back</Button>
            </div>
        </Container>
    )
}

export default MonitoringPage;