import React from "react";

const Logout = () =>{

    const logoutAction = async () => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/logout',
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            localStorage.removeItem('userData');
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