import React, { Component, ChangeEvent } from 'react';

interface IForbiddenPageProps { }
interface IForbiddenPageState { }

class ForbiddenPage extends Component<IForbiddenPageProps, IForbiddenPageState> {
    constructor(props: IForbiddenPageProps){
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

export default ForbiddenPage;
