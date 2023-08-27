import React from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import MenuCard from '../../components/card';
import OL from '../../img/online-learning.png'
import users from '../../img/users.png'
import './style.css'

const AdminPage = () => {
    const cardsInfo = 
    [
        {title:"Edit Tutorial",
         text:"You will be able to edit tutorial parts and exercises",
         img: OL,
         redirect: "/admin/tutorial"
        },
        {title:"Manage Users",
        text:"You will be able to create/bloq/edit users",
        img: users,
        redirect: "/admin/users"
        },
    ];
    return (
        <Container >
            <h3>Admin Menu</h3>
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

export default AdminPage;