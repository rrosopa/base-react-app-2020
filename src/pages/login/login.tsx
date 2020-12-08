import React, { Component, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../store/store';
import { ICharacter } from '../../models/characters/ICharacter';
import { addCharacter } from '../../store/character/actions';
import Modal from '../../components/modal/modal';
import { TodoService } from '../../api/todos/todoService';
import MetadataForm, { IMetadataForm } from '../../components/metadata/metadataForm';
import { MetadataControlType } from '../../components/metadata/metadataControl';
import MetadataInput, { IMetadataInput } from '../../components/metadata/metadataInput';
import { IMetadataSelect } from '../../components/metadata/metadataSelect';

interface ILoginPageProps {
    characters: ICharacter[];
    dispatch: any;
}

interface ILoginPageState {
    username: string;
    password: string;
}

class LoginPage extends Component<ILoginPageProps, ILoginPageState> {
    constructor(props: ILoginPageProps){
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    componentDidMount() { }
    
    private handleInputChange(e: ChangeEvent<HTMLInputElement>) { //e is element
        this.setState({ ...this.state, [e.target.name]: e.target.value })
    }

    render() {
		return (
			<div>
                <MetadataForm 
                    formdId='form-login'
                    metadata={[
                        {
                            controlType: MetadataControlType.Input,
                            id: 'username',
                            label: 'Username',
                            value: this.state.username,
                            name: 'username',
                            required: true, 
                            onChange: this.handleInputChange,                            
                        } as IMetadataInput,
                        {
                            controlType: MetadataControlType.Input,
                            id: 'password',
                            label: 'Password',
                            value: this.state.password,
                            name: 'password',
                            required: true, 
                            type: 'password',

                            onChange: this.handleInputChange
                        } as IMetadataInput,
                        {
                            controlType: MetadataControlType.Select,
                            id: 'password',
                            label: 'test',
                            value: 2,
                            name: 'password',
                            required: true, 
                            options: [
                                { key: 1, value: 1 },
                                { key: 2, value: 2 },
                                { key: 3, value: 3 },
                                { key: 3, value: 3 }
                            ]                            
                        } as IMetadataSelect
                    ]}
                />

                <p>username: {this.state.username}</p>
			</div>
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
