import React, { Component } from 'react';
import HomePage from './pages/home/home';
import LoginPage from './pages/login/login';
import NotFoundPage from './pages/errors/notFound';
import ForbiddenPage from './pages/errors/forbidden';
import {
	BrowserRouter as Router, 
	Route,
	Redirect,
	Switch
} from 'react-router-dom';
import SecuredRoute from './components/securedRoute';
import './App.module.scss';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route exact path="/login" component={LoginPage} />
						<Route exact path="/not-found" component={NotFoundPage} />
						<Route exact path="/fobidden" component={ForbiddenPage} />
						<SecuredRoute exact={true} path="/" component={HomePage} />
						<Redirect to="/not-found" />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
