import React, { useEffect, useState } from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import MenuCard from '../../components/card';
import OL from '../../img/online-learning.png'
import R from '../../img/recommended.png'
import './style.css'
import { normalAxios } from '../../api/axios';

const StudentPage = () => {

    const [lastPartId, setLastPartId] = useState();

    const user = JSON.parse(localStorage.getItem('userData'));

    const getLastPartId = async()=>{
        const response = await normalAxios.post("/api/tutorial/last",
            JSON.stringify({username:user?.username, role:user?.role}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            console.log(response);
            setLastPartId(response?.data?.partId);
    }

    useEffect(()=>{
        getLastPartId();
    },[])

        const cardsInfo = 
    [
        {title:"React Tutorial",
         text:"Learn react by this tutorial and making different exercises",
         img: OL,
         redirect: "/student/tutorial/"+lastPartId
        },
        {title:"Recommended Questions",
        text:"Recommended questions taking your level into account",
        img:R,
        redirect: "/student/recommended"
        },
    ];
    return (
        <Container >
            <h3>Student Menu</h3>
            <div className='my-auto center-content'>
                <Row>
                    {cardsInfo.map((el,i) => <Col key={i}>
                        <MenuCard element={el}></MenuCard>
                    </Col>  ) }
                </Row>
            </div>
        </Container>
    )
}

export default StudentPage;