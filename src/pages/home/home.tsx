import React, { Component, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../store/store';
import { ICharacter } from '../../models/characters/ICharacter';
import { addCharacter } from '../../store/character/actions';
import Modal from '../../components/modal/modal';
import { TodoService } from '../../api/books/booksService';

interface IHomePageProps {
    characters: ICharacter[];
    dispatch: any;
}

interface IHomePageState {
    name: string;
}

class HomePage extends Component<IHomePageProps, IHomePageState> {
    constructor(props: IHomePageProps){
        super(props);

        this.resetState();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }
    
    componentDidMount(){
        let service1 = new TodoService();
        service1.getBooks();
    }

    private resetState(){
        this.state = {
            name: ''
        }
    }
    
    private handleInputChange(e: ChangeEvent<HTMLInputElement>) { //e is element
        this.setState({ ...this.state, [e.target.name]: e.target.value })
    }

    private handleOnSubmit() {
        this.props.dispatch(addCharacter(this.state.name));
    }

    render() {
		return (
			<div>
                <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                <button onClick={this.handleOnSubmit}>Submit</button>

                {/* <Modal> */}
                    {this.props.characters.map((character: ICharacter, index: number) => {
                        return <div key={index}>{character.name}</div>
                    })}
                {/* </Modal> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
