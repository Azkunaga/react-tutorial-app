import React from "react";
import {Row, Col} from 'react-bootstrap';
import './style.css';

const Footer = () => {

    return (  
        <footer>
            <Row>
                <Col className="text-center py-3">
                    Copyright &copy; ReactLearn 
                </Col>
            </Row>
        </footer>
       
    );
}
 
export default Footer;