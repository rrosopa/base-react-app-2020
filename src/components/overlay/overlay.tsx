import React, { Component } from 'react';
import './overlay.scss';

class Overlay extends Component {
	render() {
		return (
			<div className="overlay">
				<div></div>
				<div className="content">
					{ this.props.children }
				</div>
			</div>
		);
	}
}

export default Overlay;
