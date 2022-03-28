import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PagePath } from '../../constants/page-path';
import { RootState } from '../../store/store';
import { UserAvatar } from '../user-avatar';

export const NavigationTop = (): JSX.Element => {

    const _currentUser = useSelector((store: RootState) => store.currentUser);
    const [showUserMenu, setShowUserMenu] = useState(false);

    function onUserMenuClick() {
        setShowUserMenu(!showUserMenu);
    }

    return (
        <>
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark" className="navigation-top">                    
                <Container fluid>
                    <Navbar.Toggle />
                    <Nav>                         
                        <Navbar.Brand>App.</Navbar.Brand>   
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={onUserMenuClick} className="pe-2 pe-md-0">
                            <UserAvatar size={35} bgColor="green" clickable={true} currentUser={_currentUser}/>
                        </Nav.Link>
                    </Nav>
                    <Navbar.Offcanvas>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>App.</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="#action1">Home</Nav.Link>
                                <Nav.Link href="#action2">Link</Nav.Link>
                                <NavDropdown title="Dropdown">
                                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">
                                    Something else here
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <Offcanvas show={showUserMenu} onHide={onUserMenuClick} placement="end">
                <Offcanvas.Header>
                    <Offcanvas.Title>User Name</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Link to={PagePath.userProfile} className='nav-link'>Profile</Link>
                        <Nav.Link>Sign Out</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

