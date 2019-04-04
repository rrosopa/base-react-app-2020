import React, { Component } from 'react';
import './modal.scss';

interface IModalProps {
}

class Modal extends Component<IModalProps> {
    constructor(props: IModalProps){
        super(props);
    }

    render() {
		return (
			<div className="overlay">
                <div className="alert"> 
                    {this.props.children}
                </div>
			</div>
		);
	}
}

export default (Modal);
