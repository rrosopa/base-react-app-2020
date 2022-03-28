import React, { ChangeEvent, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { MetadataControlType } from '../../components/metadata/metadata-control';
import { MetadataForm } from '../../components/metadata/metadata-form';
import { IMetadataInput } from '../../components/metadata/metadata-input';
import { AppComponentSlice } from '../../store/reducers/app-components-reducer';
import { useAppDispatch } from '../../store/store';


interface ILoginState {
    username: string;
    password: string;
}

export const LoginPage = (): JSX.Element => {
    const _dispatch = useAppDispatch();
    const [loginState, setLoginState] = useState({
        username: '', 
        password: ''
    } as ILoginState);
    
    function handleInputChange(e: ChangeEvent<HTMLInputElement>) { //e is element
        setLoginState({ ...loginState, [e.target.name]: e.target.value });        
    }

    function handleLoginSubmit(){
        _dispatch(AppComponentSlice.actions.setPageLoader({ show: true, message: 'Validating credentials...' }));
    }

    return (
        <Container className="vh-100">                
            <Row className="h-100 d-flex justify-content-center align-items-center">
                <Col xs={11} md={8} lg={6} xl={4}>
                    <MetadataForm 
                        id='form-login'
                        header='Login'
                        onSubmit={handleLoginSubmit}
                        btnSubmitText="Login"                    
                        metadata={[
                            {
                                controlType: MetadataControlType.Input,
                                control: {
                                    id: 'username',
                                    label: 'Username',
                                    value: loginState.username,
                                    name: 'username',
                                    required: true, 
                                    onChange: handleInputChange,                      
                                } as IMetadataInput
                            },
                            {
                                controlType: MetadataControlType.Input,
                                control: {
                                    id: 'password',
                                    label: 'Password',
                                    value: loginState.password,
                                    name: 'password',
                                    required: true, 
                                    type: 'password',
                                    onChange: handleInputChange  
                                } as IMetadataInput
                            }
                        ]}
                    />
                </Col>
            </Row>
        </Container>
    );
}