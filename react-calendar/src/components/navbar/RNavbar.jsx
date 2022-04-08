import React from 'react';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import {Link, NavLink, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signInAction, singOutAction} from "../../store/auth/authReducer";

const RNavbar = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);
    const authReducer = useSelector(state => state.authReducer);

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to={"/"}>React web app</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {isAuthenticated && <Nav.Link as={NavLink} to={"/calendar"}>Calendar</Nav.Link>}
                        </Nav>
                        <Nav>
                            {isAuthenticated
                                ? <NavDropdown title="User" id="collasible-nav-dropdown">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => dispatch(singOutAction(authReducer))}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                                : <Nav.Link onClick={() => dispatch(signInAction())}>Login</Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet/>
        </>
    );
};

export default RNavbar;