import React from "react";
import {Container, Navbar, Nav} from 'react-bootstrap';
import './style.css';

const Header = () => {

    return (  
         <Navbar className="color-nav" expand="lg" variant="light">
            <Container>
                <Navbar.Brand href="/">
                    <img
                    src = "logo_small.png"
                    width="auto"
                    height="40"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="ml-auto">
                    <Nav.Link href="/profile"><i className="fa-regular fa-user" /> User</Nav.Link>
                    <Nav.Link ><i className="fa-solid fa-arrow-right-from-bracket" /> Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
 
export default Header;