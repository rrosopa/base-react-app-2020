import React from 'react';
import { ICurrentUserDetails } from '../models/users/current-user-details';

interface IProps {
    size?: number;
    bgColor?: string;
    clickable?: boolean;
    
    currentUser: ICurrentUserDetails;
}

export const UserAvatar = (props: IProps): JSX.Element => {

    var initials = 'UR';
    if(props.currentUser){
        if(props.currentUser.fullName){
            var names = props.currentUser.fullName.split(' ');
            if(names.length > 0){
                initials = names[0].charAt(0) + names[names.length - 1].charAt(0);
            }
        }
    }

    var size: number = props.size ?? 45;
    var circleStyle: React.CSSProperties = {
        width: size,
        height: size,
        backgroundColor: props.bgColor ?? 'var(--bs-primary)',
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: props.clickable ? 'pointer' : '',
    };

    var initialsStyle: React.CSSProperties = {
        fontSize: size / 2, /* 50% of parent */
        color: '#fff',
        fontFamily: 'Courier New, monospace'                        
    };

    return (
        <> 
            <div style={circleStyle}>
                <span style={initialsStyle}>{initials}</span>
            </div>
        </>
    )
}
