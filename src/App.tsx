import React, { Component } from 'react';
import HomePage from './pages/home/home';
import LoginPage from './pages/login/login';
import NotFoundPage from './pages/errors/notFound';
import ForbiddenPage from './pages/errors/forbidden';
import UserProfilePage from './pages/user/profile';
import UserSecurityPage from './pages/user/security';
import {
	BrowserRouter as Router, 
	Route,
	Redirect,
	Switch
} from 'react-router-dom';
import SecuredRoute from './components/securedRoute';
import './styles/index.scss';
import { PagePath } from './constants/pagePath';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

class App extends Component {
	render() {
		return (
			<div className="App">
				<ToastContainer/>
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

export default App;
