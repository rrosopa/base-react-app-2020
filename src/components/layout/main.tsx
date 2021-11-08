import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { StringHelper } from '../../helpers/stringHelper';
import LayoutAppNav from './mainNav';
import PageNav, { ILayoutPageNavLink } from './pageNav';

interface IProps {
    currentPath: string;
    title?: string;
    formatTitle?: boolean;
    pageNavLinks?: ILayoutPageNavLink[];

    addAction?: () => void;    
}

interface IState {
    userMenu: boolean;
}

class LayoutMain extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.state = {
            userMenu: false
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

    renderPageNav() {
        if(this.props.pageNavLinks){
            return (
                <Col md={3} lg={2} className="page-nav-container bg-dark opacity-75 pt-lg-3 pe-lg-0">
                    <PageNav
                        currentPath={this.props.currentPath}
                        links={this.props.pageNavLinks}
                    />
                </Col>
            );
        }
    }

    renderTitle(){
        const pathArr = this.props.currentPath.split('/');
        var title = this.props.title ?? pathArr[pathArr.length - 1];

        if(title){
            if(this.props.formatTitle !== false)
                title = StringHelper.capitalize(title);

            document.title = `AppName | ${title}`;

            return (
                <Container className="mt-5 shadow" fluid>
                    <Container className="mt-3 pt-1">
                        <Row className="h-100">
                            <Col>
                                <h3 className="d-md-none mb-0">{title}</h3>
                                <h2 className="d-none d-md-block mb-0">{title}</h2>
                            </Col>
                            <Col className="d-flex justify-content-end align-items-center">
                                { this.renderAddAction() }
                                { this.renderAddAction() }
                                { this.renderAddAction() }
                                { this.renderAddAction() }
                                { this.renderAddAction() } 
                            </Col>
                        </Row>
                    </Container> 
                </Container>
            )
        }
    }

    renderAddAction(){
        if(this.props.addAction){
            return (
                <div className="title-bar-action">
                    <i className="bi bi-plus"></i><span> New</span>
                </div>
            )
        }
    }

    render() {
        

		return (
			<>
                <LayoutAppNav></LayoutAppNav>
                { this.renderTitle() }
                <Container className="page-container">                    
                    <Row>
                        { this.renderPageNav() }
                        <Col className="pt-3">
                            { this.props.children }
                        </Col>
                    </Row>
                </Container>          
			</>
		);
	}
}

export default LayoutMain;