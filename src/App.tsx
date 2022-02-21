import React, { Component } from 'react';
import { Bars } from 'react-loader-spinner';
import { connect } from 'react-redux';
import {
	BrowserRouter as Router,
	Redirect, Route,
	Switch
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Overlay from './components/overlay/overlay';
import { PagePath } from './constants/pagePath';
import ForbiddenPage from './pages/errors/forbidden';
import NotFoundPage from './pages/errors/notFound';
import HomePage from './pages/home/home';
import LoginPage from './pages/login/login';
import UserProfilePage from './pages/user/profile';
import UserSecurityPage from './pages/user/security';
import { IPageLoader } from './store/appComponent/actions';
import { IAppState } from './store/store';
import './styles/index.scss';

interface IProps  {
    pageLoader: IPageLoader;
    dispatch: any;
}

interface IState {
}

class App extends Component<IProps, IState> {
	
	renderPageLoader(){
		if(this.props.pageLoader?.isVisible){
			return (
				<Overlay>
					<Bars color="#00BFFF" height={80} width={80} />
					<p className="p-3">{ this.props.pageLoader.message }</p>
				</Overlay>
			);
		}
	}

    render() {
		return (
			<div className="App">
				<ToastContainer/>
				{ this.renderPageLoader() }
				<Router>
					<Switch>
						<Route exact path="/login" component={LoginPage} />
						<Route exact path="/not-found" component={NotFoundPage} />
						<Route exact path="/fobidden" component={ForbiddenPage} />						
						<Route exact path={PagePath.home} component={HomePage} />
						<Route exact path={PagePath.userProfile} component={UserProfilePage} />
						<Route exact path={PagePath.userSecurity} component={UserSecurityPage} />
						{/* <SecuredRoute exact={true} path="/" component={HomePage} /> */}
						<Redirect to={PagePath.home} />
					</Switch>
				</Router>
			</div>
		);
	}
}

const mapStateToProps = (store: IAppState) => {
	return {
		pageLoader: store.componentState.pageLoader
	};
}

const mapDispatchToProps = (dispatch: any) => {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
