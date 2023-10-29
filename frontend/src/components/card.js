import React from "react";
import {Card} from 'react-bootstrap'

const MenuCard = (props) => {

    return (  
        <a href={props.element.redirect}><Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.element.img} />
            <Card.Body>
                <Card.Title>{props.element.title}</Card.Title>
                <Card.Text>
                    {props.element.text}
                </Card.Text>
            </Card.Body>
        </Card></a>
    );
}

export default MenuCard;