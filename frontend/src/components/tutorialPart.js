import React from 'react'
import { Col } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import Markdown from 'react-markdown';
import SpinnerComponent from './spinnerComponent';

const TutorialPart = (params) => {

    const navigate = useNavigate();

    return(
            <Col>
                <div className='tutorial-div'>
                { !params.part ? 
                    <div className='center-div'>
                        <SpinnerComponent color="warning"></SpinnerComponent>
                    </div>
                    
                :

                <>
                <div className='part-div'>
                        <div className='part-title'>
                           {params.part?.name}
                        </div>
                    </div>
                    <div className='tutorial-content'>
                        <div className='content-text'>
                            <Markdown>{params.part?.text}</Markdown>
                        </div>
                    </div>
                    <div className='tutorial-actions-div'>
                        <div className='tutorial-actions'>
                            <div className="gs_button continue" id="gs_button">
                                <div className="slide"></div>
                                <a className="gs_a" onClick={params.complete}>Complete & Continue</a>
                            </div>
                        </div>
                    </div>
                    </>
                    
                    }
                    
                </div>
            </Col>
    )
}

export default TutorialPart;