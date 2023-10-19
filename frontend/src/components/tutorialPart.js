import React, { useEffect, useState } from 'react'
import {normalAxios} from '../api/axios'
import { Col } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import Markdown from 'react-markdown';

const TutorialPart = (props) => {

    const navigate = useNavigate();

    const [part,setPart] = useState();

    const user = JSON.parse(localStorage.getItem('userData'));

    const getPartInfo = async (partId) => {
        try {
            const role = localStorage.getItem('userData')?.role || null;
            const response = await normalAxios.post("/api/tutorial/"+partId,
            JSON.stringify({role:user?.role}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            console.log(response)
            setPart(response?.data?.part);
            
        }catch(err){
            if (!err?.response) {
                console.log(err);
            }else{
                console.log(err);
            }
        }
    }

    const completeAndContinue = async () => {
        try {
            //make stats
            //return exercise id
            //navigate to /exercises/ where there is the list of exercises
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getPartInfo(props.partId);
    },[props.partId])

    return(
            <Col>
                <div className='tutorial-div'>
                    <div className='part-div'>
                        <div className='part-title'>
                           {part?.name}
                        </div>
                    </div>
                    <div className='tutorial-content'>
                        {/* <div className='content-text' dangerouslySetInnerHTML={{__html: part?.text}} > */}
                        <div className='content-text'>
                            <Markdown>{part?.text}</Markdown>
                        </div>
                    </div>
                    <div className='tutorial-actions-div'>
                        <div className='tutorial-actions'>
                            <div className="gs_button continue" id="gs_button">
                                <div className="slide"></div>
                                <a className="gs_a" href="/">Complete & Continue</a>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
    )
}

export default TutorialPart;