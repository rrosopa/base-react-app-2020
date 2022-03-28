import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../store/store';

interface IProps {
    path: string;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    exact?: boolean;
}

export const SecuredRoute = (props: IProps): JSX.Element => {
    const _currentUser = useSelector((store: RootState) => store.currentUser);

    return (
        <> 
            {
                _currentUser && localStorage.getItem("authToken")
                    ? <Route path={props.path} exact={props.exact} component={props.component} /> 
                    : <Redirect to='login' />
            } 
        </>
    )
}
