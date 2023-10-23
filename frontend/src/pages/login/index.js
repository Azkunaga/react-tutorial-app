import React from 'react'
import './style.css'
import {useRef,useState,useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {normalAxios} from '../../api/axios'

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
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
        try {
            const response = await normalAxios.post('/api/auth/login',
                JSON.stringify({ username, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const role = response?.data?.role;
            const accesToken = response?.data?.accesToken;

            localStorage.setItem('userData',JSON.stringify({username,role,accesToken}));
            localStorage.setItem("menuState",JSON.stringify([]));

            console.log(JSON.parse(localStorage.getItem('userData')).role);

            setPwd('');
            setUsername('');
            
            const from = location.state?.from?.pathname || "/" + JSON.parse(localStorage.getItem('userData'))?.role;
            navigate(from, {replace:true});

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg(err.response.data.message);
            } else if (err.response?.status === 401) {
                setErrMsg(err.response.data.message);
            }else{
                setErrMsg(err.response.data.message);
            }
            errRef.current.focus();
        }
    }

    return (
        <section className='form-section'>
            <form className='auth-form' onSubmit={handleSubmit}>
                <div className="title">Sign In</div>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <div className='center-cont'>
                <div className='input-container'>
                    <label htmlFor='username'>Username</label>
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
                </div>

                <div className='input-container'>
                    <label htmlFor="password">Password</label>
                    <input
                       placeholder=" "
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                </div>

                <div className={(username && pwd) ? "gs_button login": "gs_button login notSelectable"} onClick={handleSubmit} disabled={(!username || !pwd) ? true : false}>
                    <div className="slide"></div>
                    <a className="gs_a" href="/register">Sign In</a>
                </div>
                
                <p className='reg'>
                    Need an account?&nbsp;
                    <span className="line">
                        <a href="/register">Register</a>
                    </span>
                </p>
                </div>
                
            </form>
        </section>
    )
}

export default Login;