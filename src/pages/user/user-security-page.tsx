import React from 'react';
import { useSelector } from 'react-redux';
import { LayoutMain } from '../../components/layout/main';
import { RootState } from '../../store/store';


export const UserSecurityPage = (): JSX.Element => {
    const _currentUser = useSelector((state: RootState) => state.currentUser);

        return (
            <LayoutMain >
                <p>USER SECURITY PAGE</p>
            </LayoutMain>
        );
}

