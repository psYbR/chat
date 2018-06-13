import React from 'react';
import ConnectionStats from './ConnectionStats';
import UserListItem from './UserListItem';
import { connect } from 'react-redux';

const UserWindow = ({ configuration, userInterface }) => {
    return (
        <div className={"userWindowContainer " + (userInterface.appIsBlurred ? " chatAppBlur" : '') /*Blur the app if the flag is set*/}>
            <div className="userListContainer emphasised-container">
            {/* User class can be nothing, voice, or op */}
                <UserListItem userName="?" isAway={false} isSelected={false} isCurrentUser={false} userClass="voice"/>
            </div>
            <div className="userStatsContainer emphasised-container">
                <p>? ops, ? total</p>
            </div>
            <ConnectionStats />
        </div>
    );
}

const mapStateToProps = (state) => {
    return state;
};
export default connect(mapStateToProps)(UserWindow);