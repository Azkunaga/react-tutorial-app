import React, { useEffect, useState } from 'react'
import {normalAxios} from '../api/axios'
import { Col, ProgressBar, Row  } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'

const TutorialMenu = () => {

    const navigate = useNavigate();

    const [menu, setMenu] = useState([]);

    const user = JSON.parse(localStorage.getItem('userData'));

    const getMenuInfo = async () => {
        try {
            const role = localStorage.getItem('userData')?.role || null;
            const response = await normalAxios.post("/api/tutorial/topic/menu",
            JSON.stringify({username:user?.username,role}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            console.log(response?.data.menu)
            setMenu(response?.data?.menu);
            
        }catch(err){
            if (!err?.response) {
                console.log(err);
            }else{
                console.log(err);
            }
        }
    }

    const changeActive = (topicId, active) =>{
        const menuCopy = [...menu];
        menuCopy.find(someobject => someobject.id === topicId).active = !active;
        setMenu(menuCopy);
    }

    useEffect(()=>{
        getMenuInfo();
    },[])

    return(
        <Col xs={0} sm={4} md={3} >
            <div className='tutorial-menu'>
                <div className='tutorial-menu-content'>
                    {menu.sort((a,b) => a.order - b.order).map((t)=>
                        <div key={t.id} className='topic'>
                            <div className='topic-info'>
                                <Row>
                                    <Col md={8}>
                                        <div className='topic-name'>{t.name}</div>
                                    </Col>
                                    <Col>
                                        <div className='part-info'>
                                            {t.count}/{t.partsInfo.length}
                                            <i className={t.active ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"} onClick={()=>changeActive(t.id, t.active)}></i>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className='pBar'>
                                <ProgressBar variant="warning" now={t.progress} label={`${t.progress}%`} visuallyHidden />
                            </div>
                            <div className={!t.active ? "hide" : "active parts"}>
                                {t.partsInfo.sort((a,b) => a.part - b.part).map(function(p){
                                    return <div className='pBar' key={p.id} onClick={()=>navigate("/student/tutorial/"+p.id)}>
                                                <div>{p.name}</div>
                                                <ProgressBar variant="warning" now={p.progress} label={`${p.progress}%`} visuallyHidden />
                                            </div>
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Col>
    )
}

export default TutorialMenu;