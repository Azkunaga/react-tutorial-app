import React from 'react'

import axios from '../../api/axios'
import {useRef,useState,useEffect} from 'react';
import regex from '../../utils/regex';

const Login = () => {
    const usernameRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        usernameRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username,pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = regex.USER_REG.test(username);
        const v2 = pwd!=="";
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post('/api/auth/login',
                JSON.stringify({ username, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);

            setPwd('');
            setUsername('');



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
                <div className="title">Log In</div>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                <div className='input-container ic1'>
                    <input 
                        placeholder="   "
                        type="text"
                        id="username"
                        ref={usernameRef}
                        autoComplete="off"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="cut"></div>
                    <label htmlFor='username' className="placeholder">Username</label>
                </div>

                <div className='input-container ic2'>
                    <input
                       placeholder=" "
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <div className="cut"></div>
                     <label htmlFor="password" className="placeholder" >Password</label>
                </div>

                <button disabled={(!username || !pwd) ? true : false}>Log In</button>
                <br/>
                <p className='login'>
                    Need an account?&nbsp;
                    <span className="line">
                        <a href="/register">Register</a>
                    </span>
                </p>
            </form>
        </section>
    )
}

export default Login;