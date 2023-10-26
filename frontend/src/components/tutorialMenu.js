import React, { useEffect, useState, useRef } from 'react'
import {normalAxios} from '../api/axios'
import { Col, ProgressBar, Row  } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'

const TutorialMenu = (params) => {

    const navigate = useNavigate();
    const [activeArray,setActiveArray] = useState(JSON.parse(localStorage.getItem("menuState")));

    const changeActive = (topicId) => {
        if(activeArray.filter(tid => tid===topicId).length > 0){
            setActiveArray(activeArray.filter(tid => tid!==topicId));
        }else{
            setActiveArray([...activeArray, topicId]);
        }

        // const menuCopy = [...menu];
        // menuCopy.find(someobject => someobject.id === topicId).active = !active;
        // setMenu(menuCopy);
    }

    // const activeId = () => {
    //     const t = menu.filter(topic => topic.partsInfo.some(part => part.id == params.partId));
    //     if(t.length>0){
    //         changeActive(t[0].id,false);
    //     }
    // }

    useEffect(()=>{
        console.log("save")
        localStorage.setItem("menuState",JSON.stringify(activeArray))
    },[activeArray]);

    return(
        <Col xs={0} sm={4} md={3} >
            <div className='tutorial-menu'>
                <div className='tutorial-menu-content'>
                    <div className='totalProgress'>
                        <h4>React tutorial from scratch</h4>
                        <span className='tP'>{params?.totalProgress}%</span><span className='comp'> Completed</span>
                    </div>
                    {params.menu?.sort((a,b) => a.order - b.order).map((t)=>
                        <div key={t.id} className='topic'>
                            <div className='topic-info'  onClick={()=>changeActive(t.id)}>
                                <Row>
                                    <Col md={8}>
                                        <div className='topic-name'>{t.name}</div>
                                    </Col>
                                    <Col>
                                        <div className='part-info'>
                                            {t.count}/{t.partsInfo.length}
                                            <i className={activeArray.filter(tid => tid===t.id).length > 0 ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"} ></i>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className='pBar'>
                                <ProgressBar variant="warning" now={t.progress} label={`${t.progress}%`} visuallyHidden />
                            </div>
                            <div className={activeArray.filter(tid => tid===t.id).length === 0 ? "hide" : "active parts"}>
                                {t.partsInfo.sort((a,b) => a.part - b.part).map((p)=>
                                     <div className='pBar' key={p.id} onClick={()=>navigate("/student/tutorial/"+p.id)}>
                                        <div>{p.name}</div>
                                        <ProgressBar variant="warning" now={p.progress} label={`${p.progress}%`} visuallyHidden />
                                    </div>
                                )}
                            </div>
                        </div>
                )}
                </div>
            </div>
        </Col>
    )
}

export default TutorialMenu;