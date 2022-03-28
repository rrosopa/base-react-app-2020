import React from 'react';
import { Bars } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import {
	BrowserRouter as Router,
	Redirect, Route,
	Switch
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Overlay } from './components/overlay/overlay';
import { PagePath } from './constants/page-path';
import { ForbiddenPage } from './pages/errors/forbidden-page';
import { NotFoundPage } from './pages/errors/not-found-page';
import { HomePage } from './pages/home/home-page';
import { LoginPage } from './pages/login/login-page';
import {UserProfilePage} from './pages/user/user-profile-page';
import {UserSecurityPage} from './pages/user/user-security-page';
import { RootState } from './store/store';
import './styles/index.scss';

export const App = (): JSX.Element => {
	const _pageLoader = useSelector((state: RootState) => state.appComponent.pageLoader);
	
	function renderPageLoader() {
		if(_pageLoader.show){
			return (
				<Overlay>
					<Bars color="#00BFFF" height={80} width={80} />
					<p className="p-3">{ _pageLoader.message }</p>
				</Overlay>
			);
		}
	}

    return (
		<div className="app">
			<ToastContainer/>
			{ renderPageLoader() }
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

export default App;