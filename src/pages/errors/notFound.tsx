import React, { Component, ChangeEvent } from 'react';

interface INotFoundPageProps { }
interface INotFoundPageState { }

class NotFoundPage extends Component<INotFoundPageProps, INotFoundPageState> {
    constructor(props: INotFoundPageProps){
        super(props);

        this.resetState();
    }
    
    componentDidMount() { }

    private resetState(){
        this.state = { }
    }

    render() {
		return (
			<div>
                <p>Page not found</p>
			</div>
		);
	}
}

export default NotFoundPage;
