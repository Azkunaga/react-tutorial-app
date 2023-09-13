import React from "react";
import {Container, Navbar, Nav} from 'react-bootstrap';
import './style.css';
import logo from '../../img/logo_small.png'

const Header = () => {

    const user = JSON.parse(localStorage.getItem('userData'));

    const handleLogout = () => {
        localStorage.removeItem('userData');
    }

    const link = user?.role || " ";

    return (  
        <header>
         <Navbar className="color-nav" expand="lg" variant="light">
            <Container>
                <Navbar.Brand href={"/"+ link}>
                    <img
                    src = {logo}
                    width="auto"
                    height="40"
                    className="d-inline-block align-top"
                    alt="React Learn logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {user &&
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="ml-auto">
                        <Nav.Link href="/profile"><i className="fa-solid fa-regular fa-user" /> {user?.username}</Nav.Link>
                        <Nav.Link href="/login" onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket" /> Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                }
            </Container>
        </Navbar>
        </header>
    );
}
 
export default Header;