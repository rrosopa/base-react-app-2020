import React, { Component } from 'react';
import styles from './modal.scss';

interface IModalProps {
}

class Modal extends Component<IModalProps> {
    constructor(props: IModalProps){
        super(props);
    }

    render() {
		return (
			<div className={styles.overlay}>
                <div className={styles.alert}> 
                    {this.props.children}
                </div>
			</div>
		);
	}
}

export default (Modal);
