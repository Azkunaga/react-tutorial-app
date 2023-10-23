import React, { useEffect, useState } from 'react'
import {normalAxios} from '../api/axios'
import { Button, Col, Row } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import Markdown from 'react-markdown';
import SurveyExComponent from './surveyExComponent';
import { MDBSpinner } from 'mdb-react-ui-kit';

const TutorialExercise = (props) => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('userData'));

    const [exercise,setExercise] = useState();
    const [isNew,setIsNew] = useState(false);
    const [feedback,setFeedback] = useState();
    const [help, setHelp] = useState(false);

    const [pending, setPending] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [start,setStart] = useState();

    const getExercise = async() =>{
        try {
            const role = user?.role || null;
            const response = await normalAxios.post("/api/tutorial/question/"+props.exId,
            JSON.stringify({role}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            setStart(Date.now());
            setExercise(response?.data?.quest);

        } catch (error) {
            console.log(error);
        }
    }

    const sendAnswer = async (answer) =>{
        try {
            console.log("sending answer:",answer);
            setPending(true);
            const durationMs = Date.now() - start;
            const duration = Math.floor((durationMs/1000) % 60);
            const response = await normalAxios.post("/api/chatgpt/evaluate",
            JSON.stringify({user:user?.username, questionId:props.exId, answer, help, duration}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            console.log(response);

            if(response){
                setExercise(null);
                setHelp(false);
                setPending(false);
                setFeedback(response?.data?.feedback)
            }
            
        } catch (error) {
            console.log(error);
        }
    } 

    const nextEx = async () =>{
        try {
            const response = await normalAxios.post("/api/tutorial/question/next",
            JSON.stringify({user:user?.username, partId: props.partId, questId:props.exId}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            console.log(response);

            if(response){
                
                if(response.data.next===props.exId){
                    getExercise()
                }else{
                    navigate("/student/tutorial/"+props.partId+"/exercises/"+response.data.next);
                }
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const nextPart = async () =>{
        try {
            const response = await normalAxios.post("/api/tutorial/topic/next",
            JSON.stringify({partId:props.partId}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            console.log(response);

            if(response){
                navigate("/student/tutorial/"+response.data.next);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const newExercise = async () =>{
        try {
           console.log("new exercise");
        } catch (error) {
            console.log(error);
        }
    }

    const getHelp = async () =>{
        try {
            console.log("get help");
            setHelp(true);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(props.exId==="new"){
            console.log("is new page")
            setIsNew(true);
            setExercise();
            setHelp(false);
            setPending(false);
            setFeedback();
        }else{
            setIsNew(false);
            getExercise();
        }
    },[props.exId])

    return(
            <Col>
                <div className='tutorial-div'>
                <div className='tutorial-exercise-center'>
                    {pending ? 
                    <div className='text-center'>
                        <MDBSpinner className='me-2' color="warning" style={{ width: '3rem', height: '3rem' }}>
                            <span className='visually-hidden'>Loading...</span>
                        </MDBSpinner>
                    </div>
                    
                    : 

                    exercise ? 

                    <>
                        <Button onClick={getHelp} disabled={help}>Help</Button>
                        <SurveyExComponent action={sendAnswer} exercise={exercise?.question}></SurveyExComponent>
                        {help && <>help</>}
                    </>


                    : feedback ?
                        <div className='feedback content-text'>
                            <h3>Exercise Feedback <i className={feedback.correct ? "fa-solid fa-check correct" : "fa-solid fa-xmark incorrect"}></i></h3>
                            <Markdown>{feedback.text}</Markdown>
                            {isNew && <>Evaluate</>}
                            <div className='feedback-actions'>
                                <Button variant={feedback.correct ? 'success' : 'danger'} onClick={nextEx}>Next Exercise</Button>
                                <Button variant={feedback.correct ? 'success' : 'danger'} onClick={nextPart}>Continue with next part</Button>
                            </div>
                        </div>

                    : isNew &&
                    
                    <div className='text-center'>
                        <div className='newEx'>
                            <h2>There are NOT more exercises in this part</h2>
                            <span>You have made all the exercises correctly! Well done!</span>
                            <div className='feedback-actions'>
                                <Button variant='warning' onClick={newExercise}>Obtain and Evaluate  New Exercise</Button>
                                <Button variant='warning' onClick={nextPart}>Continue with next part</Button>
                            </div>
                        </div>
                    </div>

                    }

                    </div>
                    
                </div>
            </Col>
    )
}

export default TutorialExercise;