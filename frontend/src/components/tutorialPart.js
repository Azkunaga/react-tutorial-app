import React, { useEffect, useState } from 'react'
import {normalAxios} from '../api/axios'
import { Col } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import Markdown from 'react-markdown';
import { MDBSpinner } from 'mdb-react-ui-kit';

const TutorialPart = (params) => {

    const navigate = useNavigate();

    return(
            <Col>
                <div className='tutorial-div'>
                { !params.part ? 
                    <div className='tutorial-exercise-center text-center'>
                        <MDBSpinner className='me-2' color="warning" style={{ width: '3rem', height: '3rem' }}>
                            <span className='visually-hidden'>Loading...</span>
                        </MDBSpinner>
                    </div> 
                    
                :

                <>
                <div className='part-div'>
                        <div className='part-title'>
                           {params.part?.name}
                        </div>
                    </div>
                    <div className='tutorial-content'>
                        {/* <div className='content-text' dangerouslySetInnerHTML={{__html: part?.text}} > */}
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