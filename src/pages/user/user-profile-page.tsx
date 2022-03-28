import React from 'react';
import { useSelector } from 'react-redux';
import { LayoutMain } from '../../components/layout/main';
import { RootState } from '../../store/store';


export const UserProfilePage = (): JSX.Element => {
    const _currentUser = useSelector((state: RootState) => state.currentUser);

        return (
            <LayoutMain >
                <p>USER PROFILE PAGE</p>
                <p>Name: {_currentUser.fullName}</p>
                <p>Email: {_currentUser.email}</p>
            </LayoutMain>
        );
}
