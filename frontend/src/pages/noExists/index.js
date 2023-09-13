import React from 'react'
import './style.css'
import { Container } from 'react-bootstrap';

const NoExists = () => {

    return (
        <div className='e404-background'>
            <Container>
                <div className='center e404'>
                    <h1>404</h1>
                    <h2>PAGE NOT FOUND</h2>
                    <div className="gs_button" >
                        <div className="slide"></div>
                        <a className="gs_a" href="/">Go back home</a>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default NoExists;