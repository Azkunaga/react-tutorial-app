import React from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import Card from '../../components/card';
import './style.css'

const AdminPage = () => {
    const cardsInfo = [{},{},{}];
    return (
        <Container className='center-content'>
            <Row>
            <Col>
                <Card></Card>
            </Col>
        </Row>
        </Container>
    )
}

export default AdminPage;