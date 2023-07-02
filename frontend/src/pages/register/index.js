import './style.css';
import axios from '../../api/axios'
import {useRef,useState,useEffect} from 'react';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'  


const USER_REG = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NAME_REG = /^[A-Z][a-z]*$/;
const EMAIL_REG = /^[A-z0-9-_][A-z0-9-_]*\@[a-z][a-z]*\.[a-z]{2,3}$/;

const Register = () => {
    const userRef = useRef(); 
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

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

    const [code, setCode] = useState("");
    const [codeFocus, setCodeFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidFirstName(NAME_REG.test(firstName));
    }, [firstName])

    useEffect(() => {
        setValidLastName(NAME_REG.test(lastName));
    }, [lastName])

    useEffect(() => {
        setValidEmail(EMAIL_REG.test(email));
    }, [email])

    useEffect(() => {
        setValidUser(USER_REG.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REG.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, user, pwd, matchPwd, email])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REG.test(user);
        const v2 = PWD_REG.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post('/api/auth/register',
                JSON.stringify({ firstName, lastName, username:user, email, pwd, code }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))

            setPwd('');
            setMatchPwd('');
            setUser('');
            setFirstName('');
            setLastName('');
            setEmail('');

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                console.log(err);
                setErrMsg(err.response.data.message);
            } else {
                setErrMsg(err.response.data.message);
            }
            errRef.current.focus();
        }
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <div class="title">Register</div>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                <div className='input-container ic1'>
                    <input 
                        placeholder="   "
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        value={user}
                        required
                        aria-invalid={validUser ? "false" : "true"}
                        aria-describedby="nameNote"
                        onChange={(e) => setUser(e.target.value)}
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)} 
                    />
                    <div class="cut"></div>
                    <label htmlFor='username' className={ (user && validUser ? "placeholder valid" : "placeholder") }>Username*</label>
                </div>
                <p id="nameNote" className={userFocus && user && !validUser ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                </p>

                <div className='input-container ic2'>
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
                    <div class="cut"></div>
                    <label htmlFor="firstName" className={ (firstName && validFirstName ? "placeholder valid" : "placeholder") }>First Name*</label>
                </div>
                <p id="firstNote" className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must start with uppercase.
                </p>
                
                <div className='input-container ic2'>
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
                <div class="cut"></div>
                <label htmlFor="lastName" className={ (lastName && validLastName ? "placeholder valid" : "placeholder") } >Last Name*</label>
                </div>
                <p id="lastNote" className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must start with uppercase.
                </p>
                
                <div className='input-container ic2'>
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
                    <div class="cut cut-short"></div>
                    <label htmlFor='email'  className={ (email && validEmail ? "placeholder valid" : "placeholder") }>
                        Email*
                    </label>
                </div>
                
                <div className='input-container ic2'>
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
                    <div class="cut"></div>
                     <label htmlFor="password" className={ (pwd && validPwd ? "placeholder valid" : "placeholder") }>
                        Password*
                    </label>
                </div>
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: ! @ # $ %
                </p>
                

                <div className='input-container ic2'>
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
                     <div class="cut cut-long"></div>
                    <label htmlFor="confirm_pwd"  className={ (matchPwd && validMatch ? "placeholder valid" : "placeholder") }>
                        Confirm Password*
                    </label>
                </div>
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        It has to be the same as the first one.
                </p>
               
                <div className='input-container ic2'>
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
                    <div class="cut"></div> 
                     <label htmlFor="classCode" className='placeholder normal'>
                        Class Code
                    </label>
                </div> 
                <p id="codeNote" className={codeFocus ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        In case you have a class code to be monitored.
                </p>
                <button disabled={(!validUser || !validPwd || !validMatch || !validFirstName || !validLastName || !validEmail) ? true : false}>Register</button>
                <br/>
                <p className='login'>
                    Already have an account?&nbsp;
                    <span className="line">
                        <a href="/login">Log In</a>
                    </span>
                </p>
            </form>

           

        </section>
    )

}

export default Register;