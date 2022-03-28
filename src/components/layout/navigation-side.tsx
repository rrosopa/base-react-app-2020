import React from 'react';
import { ButtonGroup, Dropdown, Nav } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { PagePath } from '../../constants/page-path';

interface IPageNavs {
    path: string;
    title: string;
    iconClass: string;
}

const PageNavs: IPageNavs[] = [
    { path: PagePath.userProfile, title: 'User Profile', iconClass: 'fa-solid fa-circle-user' },
    { path: PagePath.userSecurity, title: 'User Security', iconClass: 'fa-solid fa-circle-user' },
]

export const NavigationSide = (): JSX.Element => {   
    const _history = useHistory();

    function renderMoreLinks() {
        if(PageNavs.length < 4)
            return;

        return (
            <Dropdown as={ButtonGroup} className='navigation-side d-md-none'>
                <Dropdown.Toggle className='d-flex flex-column justify-content-center align-items-center'><i className='bi bi-three-dots'></i><span>More</span></Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        PageNavs
                            .slice(3, PageNavs.length)
                            .map((l, i) =>
                                <Dropdown.Item key={i} as={Link} to={l.path}>
                                    <i className={l.iconClass}></i> <span className='ps-2'>{l.title}</span>
                                </Dropdown.Item> 
                            )
                    }
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    return (			
        <Nav className="navigation-side">
            {
                PageNavs.map((l, i) =>
                    <Link
                        to={l.path} 
                        className={
                            'nav-link' + 
                            (l.path === _history.location.pathname ? ' active' : '') +
                            (i > 2 && PageNavs.length > 4 ? ' d-none d-md-block' : '')
                        }
                        placeholder={l.title}
                        aria-label={l.title}
                    >
                        <i className={l.iconClass}></i> <span>{l.title}</span>
                    </Link>
                )
            }
            { renderMoreLinks() }
        </Nav>
    );
}
