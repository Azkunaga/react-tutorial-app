import './style.css';
import {normalAxios} from '../../api/axios'
import { useNavigate } from "react-router-dom";
import {Container, Row, Col} from 'react-bootstrap';
import {useRef,useState,useEffect} from 'react';
import regex from '../../utils/regex';

const Register = () => {
    const usernameRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState("");
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState("");
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [role, setRole] = useState("");
    const [validRole, setValidRole] = useState(false);
    const [roleFocus, setRoleFocus] = useState(false);

    const [code, setCode] = useState("");
    const [codeFocus, setCodeFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        usernameRef.current.focus();
    }, [])

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
        if(role=="student"){
            setValidRole(true);
        }else{
            setValidRole(false);
        }
        setErrMsg('');
    }, [role])

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if(validUsername && validPwd && validMatch && validFirstName && validLastName && validEmail && role){

                await normalAxios.post('/api/auth/register',
                    JSON.stringify({ firstName, lastName, username, email, pwd, role, code }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );

                setPwd('');
                setMatchPwd('');
                setUsername('');
                setFirstName('');
                setLastName('');
                setEmail('');

                navigate('/login');
            }

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg(err.response.data.message);
            } else {
                setErrMsg(err.response.data.message);
            }
            errRef.current.focus();
        }
    }

    return (
        <Container className='reg-section'>
            <form onSubmit={handleSubmit} className='auth-form'>
                <div className="title">Register</div>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <Row>
                    <Col>
                        <div className='input-container'>
                            <label htmlFor='username'>Username*</label>
                            <input 
                                placeholder="   "
                                type="text"
                                id="username"
                                ref={usernameRef}
                                autoComplete="off"
                                value={username}
                                required
                                aria-invalid={validUsername ? "false" : "true"}
                                aria-describedby="nameNote"
                                onChange={(e) => setUsername(e.target.value)}
                                onFocus={() => setUsernameFocus(true)}
                                onBlur={() => setUsernameFocus(false)} 
                            />
                            { username && !validUsername ? <p id="nameNote" className="instructions">
                            <i className="fa-solid fa-circle-info"></i>&nbsp;
                                4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.
                            </p> : null}
                        </div>
                        
                    </Col>
                </Row>


                <Row>
                    <Col>
                    <div className='input-container'>
                    <label htmlFor="firstName">First Name*</label>
                    <input
                            placeholder=" " 
                            type="text"
                            id="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            autoComplete="off"
                            required
                            aria-invalid={validFirstName ? "false" : "true"}
                            aria-describedby="firstNote"
                            onFocus={() => setFirstNameFocus(true)}
                            onBlur={() => setFirstNameFocus(false)}
                        />
                        { firstName && !validFirstName ? <p id="firstNote" className="instructions">
                        <i className="fa-solid fa-circle-info"></i>&nbsp;
                        Must start with uppercase.
                    </p> : null }
                    </div>
                    
                    </Col>
                    <Col>
                    <div className='input-container'>
                    <label htmlFor="lastName">Last Name*</label>
                    <input
                        placeholder=" " 
                        type="text"
                        id="lastName"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        autoComplete="off"
                        required
                        aria-invalid={validLastName ? "false" : "true"}
                        aria-describedby="lastNote"
                        onFocus={() => setLastNameFocus(true)}
                        onBlur={() => setLastNameFocus(false)}
                    />
                    { lastName && !validLastName ? <p id="lastNote" className="instructions">
                    <i className="fa-solid fa-circle-info"></i>&nbsp;
                        Must start with uppercase.
                    </p> : null}
                    </div>
                    
                    </Col>

                </Row>
                
                <Row>
                    <Col>
                        <div className='input-container'>
                            <label htmlFor='email'>Email*</label>
                            <input 
                                placeholder=" "
                                type="email"
                                id="email"
                                autoComplete="off"
                                value={email}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                        </div>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <div className='input-container'>
                            <label htmlFor="password">Password*</label>
                            <input
                                placeholder=" "
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            { pwd && !validPwd  ? <p id="pwdnote" className="instructions">
                            <i className="fa-solid fa-circle-info"></i>&nbsp;
                                8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character. Allowed special characters: ! @ # $ %
                        </p> : null }
                        </div>
                        
                    </Col>
                    <Col>
                        <div className='input-container'>
                            <label htmlFor="confirm_pwd">Confirm Password*</label>
                            <input
                                placeholder=" "
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                        />
                         { matchPwd && !validMatch ? <p id="confirmnote" className="instructions">
                         <i className="fa-solid fa-circle-info"></i>&nbsp;
                                It has to be the same as the first one.
                        </p> : null }
                        </div>
                       
                    </Col>
                </Row>

                <Row>
                    <Col>
                    <div className='input-container'>
                        <label htmlFor="classRole">Role*</label>
                        <select 
                            name="role"
                            onFocus={() => setRoleFocus(true)}
                            onBlur={() => setRoleFocus(false)}
                            value={role}
                            required
                            onChange={(e) => setRole(e.target.value)}>
                                <option label=" "></option>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                        </select>
                    </div> 
                    </Col>
                    {validRole ? <Col>
                    <div className='input-container'>
                        <label htmlFor="classCode">Class Code</label>
                        <input
                            placeholder=" "
                            type="text"
                            id="classCode"
                            onChange={(e) => setCode(e.target.value)}
                            value={code}
                            aria-describedby="codeNote"
                            onFocus={() => setCodeFocus(true)}
                            onBlur={() => setCodeFocus(false)}
                        />
                        <p id="codeNote" className="notRequired">
                        <i className="fa-solid fa-circle-info"></i>&nbsp;
                            In case you have a class code to be monitored.
                        </p>
                    </div> 
                    
                    </Col> : <Col></Col>}
                </Row>

                <div className={(validUsername && validPwd && validMatch && validFirstName && validLastName && validEmail && role) ? "gs_button register":"gs_button register notSelectable"} onClick={handleSubmit} >
                    <div className="slide"></div>
                    <a className="gs_a" href="/register">Register</a>
                </div>

                <br/>
                <p className='reg'>
                    Already have an account?&nbsp;
                    <span className="line">
                        <a href="/login">Log In</a>
                    </span>
                </p>
            </form>

        
        </Container>
    )

}

export default Register;