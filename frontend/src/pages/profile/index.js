import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { normalAxios, SERVER_URL, authAxios } from '../../api/axios';
import regex from '../../utils/regex';
import profile from '../../img/profile.jpg';

const ProfilePage = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('userData'));

    const[errMsg, setErrMsg] = useState("");
    const[msg, setMsg] = useState("");

    const[errMsgPwd, setErrMsgPwd] = useState("");
    const[msgPwd, setMsgPwd] = useState("");

    const [username, setUsername] = useState("");
    const [validUsername, setValidUsername] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [validFirstName, setValidFirstName] = useState(false);

    const [lastName, setLastName] = useState("");
    const [validLastName, setValidLastName] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);

    const [matchPwd, setMatchPwd] = useState();
    const [validMatch, setValidMatch] = useState(false);

    const [code, setCode] = useState("");

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);

    const [imgName, setImgName] = useState("");

    const [studentCode, setStudentCode] = useState(false)

    const [image, setImage] = useState("");

    const getFileInfo = (e) => {
        setImage(e.target.files[0]);
    }

    async function getUser(){
        try {
            const response = await authAxios.post("/api/users/user",
                JSON.stringify({user:user?.username}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            setUsername(response?.data?.user.username);
            setFirstName(response?.data?.user.firstName);
            setLastName(response?.data?.user.lastName);
            setEmail(response?.data?.user.email);
            setCode(response?.data?.user.code.code);
            setImgName(response?.data?.user.profileImage);

            setValidFirstName(regex.NAME_REG.test(firstName));
            setValidLastName(regex.NAME_REG.test(lastName));
            setValidEmail(regex.EMAIL_REG.test(email));
            setValidUsername(regex.USER_REG.test(username));

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
            setErrMsg("");
            setMsg("");
            if(validUsername && validFirstName && validLastName && validEmail){
                console.log(image);
                if(image){
                    const formData = new FormData();
                    formData.append("file",image);
                    const response = await authAxios.post("/api/upload-image", formData,  
                    {
                        headers: { 'Content-Type': 'multipart/form-data' },
                        withCredentials: true
                    }
                    );
                    setImage(null);
                    setImgName(response?.data?.image);
                }
                
                const logedRole = localStorage.getItem('userData')?.role || null;
    
                const response2 = await authAxios.post("/api/users/user/edit",
                JSON.stringify({user:user?.username, imgName, firstName, lastName, username, email, code , "role":logedRole}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
                );

                if(response2.status===200){
                    setMsg("Changes have been made correctly");
                    const userData = JSON.parse( localStorage.getItem("userData"))
                    userData.username = response2.data.user.username;
                    userData.role = response2.data.user.role;
                    localStorage.setItem("userData", JSON.stringify(userData));
                }
      
            }

        }catch(err){
            if (!err?.response) {
                setErrMsg('No server response');
                console.log(err);
            }else{
                setErrMsg(err.response.data.message);
            }
        }
    };

    const changePassword = async()=>{
        try {
            if(validPwd && validMatch){
                const response2 = await authAxios.post("/api/users/edit/password",
                JSON.stringify({user:user.username,pwd}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                );

                if(response2.status===200){
                    setMsgPwd("Password changed");
                }
            }
        }catch(err){
            if (!err?.response) {
                setErrMsgPwd('No Server Response');
                console.log(err);
            }else{
                setErrMsgPwd(err.response.data.message);
            }
        }
    };

    useEffect(() => {
        setValidFirstName(regex.NAME_REG.test(firstName));
    }, [firstName])

    useEffect(() => {
        setValidLastName(regex.NAME_REG.test(lastName));
    }, [lastName])

    useEffect(() => {
        setValidEmail(regex.EMAIL_REG.test(email));
    }, [email])

    useEffect(() => {
        setValidUsername(regex.USER_REG.test(username));
    }, [username])

    useEffect(() => {
        setValidPwd(regex.PWD_REG.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, username, pwd, matchPwd, email])

    useEffect(() => {
        setErrMsg('');
    }, [code])

    useEffect(() => {
        setErrMsg('');
        setMsg('');
    }, [firstName, lastName, username, email])

    useEffect(()=>{
        if(user.role==="student"){
            setStudentCode(true);
        }else{
            setStudentCode(false);
            setCode(null);
        }
    },[user.role]);

    useEffect(()=>{
        getUser();
    },[]);

    return (
        <Container>
            <h2>Profile</h2>
            <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <p className={msg ? "msg" : "offscreen"} aria-live="assertive">{msg}</p>
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
                            { username && !validUsername ? <p id="nameNote" className="instructions">
                            <i className="fa-solid fa-circle-info"></i>&nbsp;
                                4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.
                            </p> : null}
                        </div>
                    </Col>
        
                    <Col>
                        <div className='input-container'>
                            <label htmlFor="file-ip-1">
                                Profile Image
                            </label>
                            <input 
                            type="file"
                            id="file-ip-1"
                            accept="image/*"
                            hidden
                            onChange={getFileInfo} />
                            <label htmlFor="file-ip-1"><img
                                    src = {imgName ?  SERVER_URL+"/userImages/"+imgName : profile}
                                    alt= 'profile picture'
                                    style={{ width: '80px', height: '80px', marginLeft: '20vh'}}
                        /></label>
                        </div>
                        
                    </Col> 

                    {studentCode && <Col>
                    <div className='input-container'>
                        <label htmlFor="classCode">Class Code</label>
                        <input
                            placeholder=" "
                            type="text"
                            id="classCode"
                            onChange={(e) => setCode(e.target.value)}
                            value={code}
                        />
                    </div> 
                    </Col>}

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
                        { firstName && !validFirstName ? <p id="firstNote" className="instructions">
                        <i className="fa-solid fa-circle-info"></i>&nbsp;
                        Must start with uppercase.
                    </p> : null }
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
                        onChange={(e) => setLastName(e.target.value)}
                        autoComplete="off"
                        required
                    />
                    { lastName && !validLastName ? <p id="firstNote" className="instructions">
                        <i className="fa-solid fa-circle-info"></i>&nbsp;
                        Must start with uppercase.
                    </p> : null }
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
                <div className='edit-actions'>           
                    <button type="button" className="btn btn-dark" onClick={saveUser}>Save</button> 
                    <button type="button" className="btn btn-dark" onClick={()=>navigate(-1)}>Cancel</button>
                </div>

                <h4>Change Password</h4>
                <p className={errMsgPwd ? "errmsg" : "offscreen"} aria-live="assertive">{errMsgPwd}</p>
                <p className={msgPwd ? "msg" : "offscreen"} aria-live="assertive">{msgPwd}</p>
                <Row>
                    <Col>
                    <div className='input-container'>
                    <label htmlFor="pwd">New password</label>
                    <input
                            placeholder=" " 
                            type="password"
                            id="pwd"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            autoComplete="off"
                        />
                        { pwd && !validPwd  ? <p id="pwdnote" className="instructions">
                            <i className="fa-solid fa-circle-info"></i>&nbsp;
                                8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character. Allowed special characters: ! @ # $ %
                        </p> : null }
                    </div>
                    
                    </Col>
                    <Col>
                    <div className='input-container'>
                    <label htmlFor="pwd2">Repeat password</label>
                    <input
                        placeholder=" " 
                        type="password"
                        id="pwd2"
                        value={matchPwd}
                        onChange={(e) => {setMatchPwd(e.target.value);}}
                        autoComplete="off"
                    />{ matchPwd && !validMatch ? <p id="confirmnote" className="instructions">
                    <i className="fa-solid fa-circle-info"></i>&nbsp;
                           It has to be the same as the first one.
                   </p> : null }
                    </div>
                    
                    </Col>

                </Row>

                <div className='edit-actions'>           
                    <button type="button" className="btn btn-dark" onClick={changePassword}>Change password</button> 
                </div>
        </Container>

    )
}

export default ProfilePage;