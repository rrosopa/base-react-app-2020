import DropdownMenu from '@restart/ui/esm/DropdownMenu';
import React, { Component } from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export interface ILayoutPageNavLink {
    path: string;
    title: string;
    iconClass?: string;
}

interface IProp {
    links: ILayoutPageNavLink[]; 
    currentPath: string;   
}

class PageNav extends Component<IProp> {   

    constructor(props: IProp){
        super(props);
    }

    renderIcon(link:ILayoutPageNavLink){
        if(link.iconClass){
            return <i className={link.iconClass + ' pe-md-2'}></i>
        }
    }

    renderLinks() {
        return this.props.links.map((l, i) =>
            <Link
                to={l.path} 
                className={
                    'page-nav-link nav-link rounded-start' + 
                    (l.path === this.props.currentPath ? ' active' : '') +
                    (i > 2 && this.props.links.length > 4 ? ' d-none d-md-block' : '')
                }
            >
                { this.renderIcon(l) } <span>{l.title}</span>
            </Link>
        );
    }

    renderMoreLinks() {
        if(this.props.links.length < 4)
            return;

        // return (
        //     <Nav.Link className='page-nav-link'>
        //         <i className='bi bi-three-dots-vertical'></i> <span>More</span>
        //     </Nav.Link>
        // )

        return (
            <Dropdown as={ButtonGroup} className='page-nav d-md-none'>
                <Dropdown.Toggle className='d-flex flex-column justify-content-center align-items-center'><i className='bi bi-three-dots'></i><span>More</span></Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        this.props.links
                            .slice(3, this.props.links.length)
                            .map((l, i) =>
                                <Dropdown.Item key={i} as={Link} to={l.path}>
                                    { this.renderIcon(l) } <span className='ps-2'>{l.title}</span>
                                </Dropdown.Item> 
                            )
                    }
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    render() {
		return (			
            <Nav className="page-nav">
                { this.renderLinks() }
                { this.renderMoreLinks() }
            </Nav>
		);
	}
}

export default PageNav;
