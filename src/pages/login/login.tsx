import React, { ChangeEvent, Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { MetadataControlType } from '../../components/metadata/metadataControl';
import MetadataForm from '../../components/metadata/metadataForm';
import { IMetadataInput } from '../../components/metadata/metadataInput';
import { ICharacter } from '../../models/characters/ICharacter';
import { setPageLoader } from '../../store/appComponent/actions';
import { IAppState } from '../../store/store';

interface IRouteProps { }

interface IProps extends RouteComponentProps<IRouteProps> {
    characters: ICharacter[];
    dispatch: any;
}

interface IState {
    username: string;
    password: string;
}

class LoginPage extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.state = {
            username: '',
            password: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }
    
    componentDidMount() { }
    
    private handleInputChange(e: ChangeEvent<HTMLInputElement>) { //e is element
        this.setState({ ...this.state, [e.target.name]: e.target.value })
    }

    private onLogin(){
        this.props.dispatch(setPageLoader(true, 'verifying credentials...'));
    }

    render() {
		return (
			<Container className="vh-100">                
                <Row className="h-100 d-flex justify-content-center align-items-center">
                    <Col xs={11} md={8} lg={6} xl={4}>
                        <MetadataForm 
                            id='form-login'
                            header='Login'
                            onSubmit={this.onLogin}
                            btnSubmitText="Login"                    
                            metadata={[
                                {
                                    controlType: MetadataControlType.Input,
                                    control: {
                                        id: 'username',
                                        label: 'Username',
                                        value: this.state.username,
                                        name: 'username',
                                        required: true, 
                                        onChange: this.handleInputChange,                      
                                    } as IMetadataInput
                                },
                                {
                                    controlType: MetadataControlType.Input,
                                    control: {
                                        id: 'password',
                                        label: 'Password',
                                        value: this.state.password,
                                        name: 'password',
                                        required: true, 
                                        type: 'password',
                                        onChange: this.handleInputChange  
                                    } as IMetadataInput
                                }
                            ]}
                        />
                    </Col>
                </Row>
			</Container>
		);
	}
}

const mapStateToProps = (store: IAppState) => {
	return {
		characters: store.characterState.characters
	};
}

const mapDispatchToProps = (dispatch: any) => {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
