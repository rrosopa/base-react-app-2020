import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../store/store';
import { ICurrentUserDetails } from '../models/users/CurrentUserDetails';

interface IUserAvatarProp {
    size?: number;
    bgColor?: string;
    clickable?: boolean;
    
    currentUser: ICurrentUserDetails;
}

class UserAvatar extends Component<IUserAvatarProp> {
    
    constructor(props: IUserAvatarProp){
        super(props);
    }

    render() {
        var initials = 'UR';
        if(this.props.currentUser){
            if(this.props.currentUser.fullName){
                var names = this.props.currentUser.fullName.split(' ');
                if(names.length > 0){
                    initials = names[0].charAt(0) + names[names.length - 1].charAt(0);
                }
            }
        }

        var size: number = this.props.size ?? 45;
        var circleStyle: React.CSSProperties = {
            width: size,
            height: size,
            backgroundColor: this.props.bgColor ?? 'var(--bs-primary)',
            borderRadius: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: this.props.clickable ? 'pointer' : '',
        };

        var initialsStyle: React.CSSProperties = {
            fontSize: size / 2, /* 50% of parent */
            color: '#fff',
            fontFamily: 'Courier New, monospace'                        
        };

        return <> 
            <div style={circleStyle}>
                <span style={initialsStyle}>{initials}</span>
            </div>
        </>
	}
}

const mapStateToProps = (store: IAppState) => {
	return {
		currentUser: store.currentUserState.currentUser
	};
}

export default connect(mapStateToProps)(UserAvatar);
