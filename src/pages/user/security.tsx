import React, { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import LayoutMain from '../../components/layout/main';
import { PageNavLink } from '../../constants/pageNavLinks';
import { PagePath } from '../../constants/pagePath';
import { IAppState } from '../../store/store';

interface IRouteProps { }

interface IProps extends RouteComponentProps<IRouteProps> {
    dispatch: any;
}

interface IState {
}

class UserSecurityPage extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.state = {
        };
    }

    render() {
		return (
			<LayoutMain 
                currentPath={this.props.location.pathname}
                pageNavLinks={PageNavLink.user}
            >
                <p>security</p>
            </LayoutMain>
		);
	}
}

const mapStateToProps = (store: IAppState) => {
	return {
	};
}

const mapDispatchToProps = (dispatch: any) => {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSecurityPage);
