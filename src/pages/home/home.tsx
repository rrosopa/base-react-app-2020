import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../store/store';
import { ICharacter } from '../../store/character/reducer';

interface IHomePageProps {
    characters: ICharacter[];
}

interface IHomePageState {

}

class HomePage extends Component<IHomePageProps, IHomePageState> {
	render() {
        console.log(this.props.characters);

		return (
			<div>
                "test"
			</div>
		);
	}
}

const mapStateToProps = (store: IAppState) => {
	return {
		characters: store.characterState.characters
	};
}

export default connect(mapStateToProps)(HomePage);
