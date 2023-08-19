import React from "react";
import {Container,Row,Col,Button } from 'react-bootstrap';

const HomeText = () => {
    return(
        <Container flex>
            <div className='home-text'>
                <Row>
                    <Col><img
                        src = "logo_large_gris.png"
                        width="auto"
                        height="60"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    /></Col>
                </Row>
                <Row>
                    <Col>
                        <div class="button" id="gs_button">
                            <div id="slide"></div>
                            <a id="gs_a" href="/register">Get started</a>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
        
    )
}

export default HomeText;