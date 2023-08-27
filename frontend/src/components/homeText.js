import React from "react";
import {Container,Row,Col} from 'react-bootstrap';
import logo from "../img/logo_large_gris.png"
const HomeText = () => {
    return(
        <Container>
            <div className='home-text'>
                <Row>
                    <Col><img
                        src = {logo}
                        width="auto"
                        height="60"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    /></Col>
                </Row>
                <Row>
                    <Col>
                        <div className="gs_button" id="gs_button">
                            <div className="slide"></div>
                            <a className="gs_a" href="/login">Get started</a>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
        
    )
}

export default HomeText;