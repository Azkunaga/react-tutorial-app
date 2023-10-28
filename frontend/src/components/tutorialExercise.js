import React, { useEffect, useState } from 'react'
import {normalAxios} from '../api/axios'
import { Button, Col, Row , Modal} from 'react-bootstrap';
import {useNavigate, useLocation} from 'react-router-dom'
import Markdown from 'react-markdown';
import SurveyExComponent from './surveyExComponent';
import HelpModal from './helpModal';
import HelpButton from './helpButton';
import SpinnerComponent from './spinnerComponent';
import EvaluateExComponent from './evaluateExComponent';

const TutorialExercise = (props) => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('userData'));

    const [exercise,setExercise] = useState();
    const [isNew,setIsNew] = useState(false);
    const [feedback,setFeedback] = useState();
    const [help, setHelp] = useState(false);
    const [helpText, setHelpText] = useState(false);
    const [pending, setPending] = useState(false);
    const [helpShow, setHelpShow] = useState(false);

    const [start,setStart] = useState();
    const { evalu } = useLocation();
    const [evaluate, setEvaluate] = useState(evalu);
    const [tryAgain, setTryAgain] = useState(false);

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
            setTryAgain(false);
            setExercise(response?.data?.quest);

        } catch (error) {
            console.log(error);
        }
    }

    const sendAnswer = async (answer) =>{
        try {
            setPending(true);
            const durationMs = Date.now() - start;
            const duration = Math.floor((durationMs/1000) % 60);
            const response = await normalAxios.post("/api/chatgpt/evaluate",
            JSON.stringify({user:user?.username, questionId:props.exId, answer:JSON.stringify(answer), help:help, duration}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            console.log(response);

            if(response.status===200){
                setPending(false);
                setExercise();
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

            if(response.status===200){
                navigate("/student/tutorial/"+response.data.next);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const newExercise = async () =>{
        try {
            console.log("new exercise");
            setPending(true);
            const response = await normalAxios.post("/api/chatgpt/create",
                JSON.stringify({username:user?.username,partId:props.partId}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response);

            if(response.status===200){
                setEvaluate(true);
                setPending(false);
                navigate("/student/tutorial/"+props.partId+"/exercises/"+response?.data?.next, {evalu:true});
            }
            
        } catch (error) {
            setTryAgain(true);
            setPending(false);
            console.log(error);
        }
    }

    const getHelp = async () =>{
        try {
            setHelpShow(true);

            if(!help){
                const response = await normalAxios.post("/api/chatgpt/help",
                JSON.stringify({questionId:props.exId}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                );
                console.log(response);
    
                if(response.status===200){
                    setHelp(true);
                    setHelpText(response?.data?.helpText);
                }
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const evaluateExercise = async (answer, comment) => {
        try {
            const role = localStorage.getItem('userData')?.role || null;
            const response = await normalAxios.post("/api/tutorial/question/valueQuestion",
            JSON.stringify({user:user?.username, questionId:props.exId, answer, comment, role}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )

            if(response.status===200){
                setEvaluate(false);
            }

        }catch(err){
            if (!err?.response) {
                console.log(err);
            }else{
                console.log(err);
            }
        }
            
       
    }

    useEffect(()=>{
        if(props.exId==="new"){
            setEvaluate(false);
            setIsNew(true);
            setExercise();
            setHelp(false);
            setHelpText();
            setPending(false);
            setFeedback();
        }else{
            setTryAgain(false);
            setIsNew(false);
            setPending(false);
            getExercise();
        }
    },[props.exId])

    useEffect(()=>{
        if(helpText){
            setHelp(true);
        }else{
            setHelp(false);
        }
    },[helpText])

    return(
            <Col>
                <div className='exercises-div'>
                    {pending ? 
                        <div className='center-div'>
                        <SpinnerComponent color="warning" ></SpinnerComponent>
                        </div>
                    : 

                    exercise ? 

                    <div className='tutorial-exercise'>
                        <HelpButton action={getHelp}></HelpButton>
                        <SurveyExComponent action={sendAnswer} exercise={exercise?.question}></SurveyExComponent>
                        <HelpModal help={helpText} show={helpShow} onHide={() => {setHelpShow(false); setHelp(true);}}></HelpModal>
                    </div>

                    : feedback ?
                        <div className='feedback content-text'>
                            <h3>Exercise Feedback <i className={feedback.correct ? "fa-solid fa-check correct" : "fa-solid fa-xmark incorrect"}></i></h3>
                            <Markdown>{feedback.text}</Markdown>
                            {evaluate ?
                                <EvaluateExComponent action={evaluateExercise} ></EvaluateExComponent>
                            :
                            <div className='feedback-actions'>
                                <Button variant={feedback.correct ? 'success' : 'danger'} onClick={nextEx}>Next Exercise</Button>
                                <Button variant={feedback.correct ? 'success' : 'danger'} onClick={nextPart}>Continue with next part</Button>
                            </div>
                            }
                            
                        </div>

                    : isNew && 
                        
                    <div className='newEx center-div text-center'>
                        {!tryAgain ?
                        <>
                            <h2>There are not more exercises in this part</h2>
                            <span>You have made all the exercises correctly! Well done!</span>
                            <div className='feedback-actions'>
                                <Button variant='warning' onClick={newExercise}>Obtain and Evaluate  New Exercise</Button>
                                <Button variant='warning' onClick={nextPart}>Continue with next part</Button>
                            </div>
                        </>
                        
                        :
                            <>
                                <h2>Exercise creation...</h2>
                                <span>Error when creating the exercise</span>
                                <div className='feedback-actions'>
                                    <Button variant='warning' onClick={newExercise}>Try Again</Button>
                                    <Button variant='warning' onClick={nextPart}>Continue with next part</Button>
                                </div>
                            </>
                        }
                    </div>

                    }


                    </div>
            </Col>
    )
}

export default TutorialExercise;