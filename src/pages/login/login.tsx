import React, { Component, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../store/store';
import { ICharacter } from '../../models/characters/ICharacter';
import { addCharacter } from '../../store/character/actions';
import Modal from '../../components/modal/modal';
import { TodoService } from '../../api/todos/todoService';

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

        this.resetState();
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    componentDidMount() { }

    private resetState(){
        this.state = {
            username: '',
            password: ''
        }
    }
    
    private handleInputChange(e: ChangeEvent<HTMLInputElement>) { //e is element
        this.setState({ ...this.state, [e.target.name]: e.target.value })
    }

    render() {
		return (
			<div>
                <p>login</p>
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
