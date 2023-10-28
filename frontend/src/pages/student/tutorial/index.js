import React, { useEffect, useState } from 'react'
import {Row, Col} from 'react-bootstrap';
import TutorialMenu from '../../../components/tutorialMenu';
import TutorialPart from '../../../components/tutorialPart';
import './style.css'
import { useParams } from 'react-router-dom';
import StartEx from '../../../components/startEx';
import TutorialExercise from '../../../components/tutorialExercise'
import { normalAxios, authAxios } from '../../../api/axios';
import {useNavigate} from 'react-router-dom'

const StudentTutorial = () => {

    const navigate = useNavigate();

    const {id, exId} = useParams();

    const [start,setStart] = useState(false);
    const [menu, setMenu] = useState([]);
    const [part,setPart] = useState();

    const [time, setTime] = useState();

    const user = JSON.parse(localStorage.getItem('userData'));

    const getMenuInfo = async () => {
        try {
            const role = user?.role || null;
            await authAxios.post("/api/tutorial/topic/menu",
            JSON.stringify({username:user?.username,role}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            ).then(response => {
                console.log(response?.data?.menu);
                setMenu(response?.data?.menu);
            })

        }catch(err){
            if (!err?.response) {
                console.log(err);
            }else{
                console.log(err);
            }
        }
    }

    const getPartInfo = async (partId) => {
        try {
            const role = user?.role || null;
            const response = await authAxios.post("/api/tutorial/"+partId,
            JSON.stringify({role:user?.role}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );

            setTime(Date.now());
            setPart(response?.data?.part);
            
        }catch(err){
            if (!err?.response) {
                console.log(err);
            }else{
                console.log(err);
            }
        }
    }

    const completeAndContinue = async (e) => {
        try {
            e.preventDefault();
            const role = user?.role || null;
            const durationMs = Date.now() - time;
            const duration = Math.floor((durationMs/1000) % 60);
            const response = await authAxios.post("/api/tutorial/complete",
            JSON.stringify({username:user?.username, part:id, duration, role}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            console.log(response);

            if(response.status===200){
                navigate("/student/tutorial/"+id+"/exercises/"+response.data.exercise); //exercise id or "new" where the user can ask for a new exercise
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if (id==="start") {
            setStart(true);
        }else{
            setStart(false);
        }
      },[id]);

    useEffect(()=>{
        getMenuInfo(); 
    },[id,exId])

    useEffect( () => {
        try {
            if(!start){
                getPartInfo(id);
            }
        } catch (error) {
            console.log(error);
        }
    },[id])

    return (
        <div className='tutorial'>
                <Row>
                    <TutorialMenu partId={id} menu={menu.menu} totalProgress={menu.totalProgress}></TutorialMenu>
                    { start ? <StartEx></StartEx>
                    : exId ? <TutorialExercise partId={id} exId={exId}></TutorialExercise>
                    : <TutorialPart complete={completeAndContinue} part={part}></TutorialPart>
                    }
                    
                </Row>
        </div>
    )
}

export default StudentTutorial;