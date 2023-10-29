import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import ParticlesBackground from '../../components/particlesBackgorund';
import HomeText from '../../components/homeText';


const Home = () => {

    const user = localStorage.getItem('userData');

    console.log(JSON.parse(user));

    const navigate = useNavigate();

    useEffect(()=>{
        if(user){
            navigate("/"+JSON.parse(user)?.role, {replace:true})
        }
    },[])
    return (
        <div>
            <ParticlesBackground/>
            <HomeText/>
        </div>
    )
}

export default Home;