import React, { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { StringHelper } from '../../helpers/string-helper';
import { AppComponentSlice } from '../../store/reducers/app-components-reducer';
import { RootState, useAppDispatch } from '../../store/store';
import { NavigationSide } from './navigation-side';
import { NavigationTop } from './navigation-top';

type Props = PropsWithChildren<{
    title?: string;
    formatTitle?: boolean;

    addAction?: () => void;
}>

export const LayoutMain = (props: Props): JSX.Element => {
    const _history = useHistory();
    const _dispatch = useAppDispatch();
    const _appComponent = useSelector((state: RootState) => state.appComponent);
    const [pageTitle, setPageTitle] = useState('');    
    
    useEffect(()=> {
        var pathArr = _history.location.pathname.split('/');
        var title = props.title ?? 'App Name';        
        if(pathArr){
            if(props.title){

            }
            else{
                title = pathArr[pathArr.length - 1];
            }
        }

        title = StringHelper.capitalize(title);
        setPageTitle(title);
        document.title = title;
    });

    function handleNavToggle(){
        _dispatch(AppComponentSlice.actions.toggleSideNavigation());
    }

    return (        
        <div className="page">
            <NavigationTop></NavigationTop>
            <div className="layout">                    
                <div className={"navigation-side-container " + (_appComponent.isSideNavigationExpanded ? "expand" : "")}>
                    <NavigationSide />
                    <div className="navigation-side-toggle" onClick={handleNavToggle}>
                        <i className={_appComponent.isSideNavigationExpanded ? "fa-solid fa-angle-left" : "fa-solid fa-angle-right"}></i>
                    </div>
                </div>
                <div className="content-container">
                    <div className="title">
                        { pageTitle ?? '/ Home / Test / Another Page' }
                    </div>
                    <div className="content">
                        { props.children }
                    </div>
                </div>
            </div> 
        </div>
    );
}