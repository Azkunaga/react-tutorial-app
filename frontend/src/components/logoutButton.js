import React from "react";
import {useAuth} from '../hooks/useAuth';

const Logout = () =>{

    const {setAuth} = useAuth();

    const logoutAction = async () => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/auth/logout',
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            setAuth({});
        }catch(err){
            res.status(500).send({
                message: error.mesage, 
              })
        }

        navigate('/login');
    }

    return (
        <div>
            <button onClick={logoutAction}>Logout</button>
        </div>
    )

}

export default Logout;