import React from "react";
import {useAuth} from '../hooks/useAuth';

const Logout = () =>{

    const {setAuth} = useAuth();

    const logoutAction = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/login');
    }

    return (
        <div>
            <button onClick={logoutAction}>Logout</button>
        </div>
    )

}

export default Logout;