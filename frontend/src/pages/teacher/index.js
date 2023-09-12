import React from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import MenuCard from '../../components/card';
import OL from '../../img/online-learning.png'
import users from '../../img/users.png'
import valid from '../../img/circle-check-regular.svg'
import './style.css'

const TeacherPage = () => {
    const cardsInfo = 
    [
        {title:"Edit Tutorial Exercises",
         text:"You will be able to edit tutorial exercises optimal answers",
         img: OL,
         redirect: "/teacher/questions"
        },
        {title:"Valid New Exercises",
        text:"You will be able to create/bloq/edit users",
        img: valid,
        redirect: "/teacher/valid"
        },
        {title:"Monitor Students",
        text:"You will be able to see your students progress",
        img: users,
        redirect: "/teacher/monitoring"
        },
    ];
    return (
        <Container >
            <h3>Teacher Menu</h3>
            <div className='my-auto center-content'>
                <Row>
                    {cardsInfo.map((el) => <Col>
                        <MenuCard element={el}></MenuCard>
                    </Col>  ) }
                </Row>
            </div>
        </Container>
    )
}

export default TeacherPage;