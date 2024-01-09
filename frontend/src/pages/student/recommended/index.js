import React, { useEffect, useState } from 'react'
import {Row, Col} from 'react-bootstrap';
import './style.css'
import { authAxios } from '../../../api/axios';
import SpinnerComponent from '../../../components/spinnerComponent';
import Markdown from 'react-markdown';

const RecommendPage = () => {
    const [questions, setQuestions] = useState([]);

    const [question, setQuestion] = useState();
    const [answer, setAnswer] = useState();

    const [pendingRec, setPendingRec] = useState(true);
    const [pending,setPending] = useState();

    const user = JSON.parse(localStorage.getItem('userData'));

    const getRecommendations = async () => {
        try {
            const role = user?.role || null;
            await authAxios.post("/api/chatgpt/recommend",
            JSON.stringify({username:user?.username,role}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            ).then(response => {
                console.log(response);
                setPendingRec(false);
                setQuestions(response?.data?.questionList);
            })

        }catch(err){
            if (!err?.response) {
                console.log(err);
            }else{
                console.log(err);
            }
        }
    }

    const makeQuest = async (quest) =>{
        try {
            setPending(true);
            setQuestion(quest);
            const role = user?.role || null;
            await authAxios.post("/api/chatgpt/ask",
            JSON.stringify({username:user?.username, question:quest, role}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            ).then(response => {
                console.log(response)
                setPending(false);
                setAnswer(response?.data?.answer);
            })

        }catch(err){
            if (!err?.response) {
                console.log(err);
            }else{
                console.log(err);
            }
        }
    }

    useEffect(()=>{
        if(questions.length===0){
            getRecommendations();
        }
    },[])


    return (
        <div className='tutorial'>
                <Row>
                <Col xs={0} sm={5} md={4} >
                    <div className='tutorial-menu'>
                        <div className='tutorial-menu-content'>
                            <div>
                               <strong>RECOMMENDED QUESTIONS:</strong> 
                            </div>

                            { pendingRec ?

                                <div className='rec center-div'>
                                    <SpinnerComponent color="warning"></SpinnerComponent>
                                </div>

                                : questions.length>0 &&

                                <div className='recQuestions'>

                                    {questions.map((q)=>
                                        <p className='quest' onClick={()=>makeQuest(q)}>{q}</p>
                                    )}

                                </div>
                                
                            }
                            
                        </div>
                    </div>
                </Col>

                <Col>
                    <div className='tutorial-div recommend-div'>
                    { pending ? 
                        <div className='center-div'>
                            <SpinnerComponent color="warning"></SpinnerComponent>
                        </div>
                        
                    : answer ?
                    
                        <div className='recommend-content'>
                            <div className='content-text'>
                                <h4>{question}</h4>
                                <hr></hr>
                                <Markdown>{answer}</Markdown>
                            </div>
                        </div>
                    :
                        <div className='norec center-div text-center'>
                            <h4>Select a question that will be answered by ChatGPT</h4>
                        </div>
                    }
                    </div>
                </Col>
                
                </Row>
        </div>
    )
}

export default RecommendPage;