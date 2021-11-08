import React, { Component } from 'react';
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { connect } from 'react-redux';
import UserAvatar from '../userAvatar';
import { ICurrentUserDetails } from '../../models/users/CurrentUserDetails';
import { IAppState } from '../../store/store';
import { Link } from 'react-router-dom';
import { PagePath } from '../../constants/pagePath';

interface ILayoutAppNavProps {
    currentUser: ICurrentUserDetails;
    dispatch: any;
}

interface ILayoutAppNavState {
    userMenu: boolean;
}

class LayoutAppNav extends Component<ILayoutAppNavProps, ILayoutAppNavState> {
    constructor(props: ILayoutAppNavProps){
        super(props);

        this.state = {
            userMenu: false,
        };

        this.onUserNavOpenClick = this.onUserNavOpenClick.bind(this);
        this.onUserNavCloseClick = this.onUserNavCloseClick.bind(this);
    }

    private onUserNavOpenClick() {        
        this.setState({userMenu: true});
    }

    private onUserNavCloseClick() {
        this.setState({userMenu: false});
    }

    render() {
		return (
			<>
                <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">                    
                    <Container>
                        <Navbar.Toggle />
                        <Nav>                         
                            <Navbar.Brand>App.</Navbar.Brand>                         
                            <Link className="d-none d-lg-flex nav-link" to={PagePath.home} >Home</Link>
                            <Nav.Link className="d-none d-lg-flex" href="#action2">Link</Nav.Link>
                            <NavDropdown className="d-none d-lg-flex" title="Dropdown" id="offcanvasNavbarDropdown">                                
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={this.onUserNavOpenClick} className="pe-2 pe-md-0">
                                <UserAvatar size={35} bgColor="green" clickable={true}/>
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
                <Offcanvas show={this.state.userMenu} onHide={this.onUserNavCloseClick} placement="end">
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
}

const mapStateToProps = (store: IAppState) => {
	return {
		currentUser: store.currentUserState.currentUser
	};
}

const mapDispatchToProps = (dispatch: any) => {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutAppNav);
