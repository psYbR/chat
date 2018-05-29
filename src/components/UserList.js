import React from 'react';
import ConnectionStats from './ConnectionStats';
import UserListItem from './UserListItem';
import { connect } from 'react-redux';

const UserWindow = ({ configuration, loginState }) => {
    return (
        <div className={"userWindowContainer " + (!loginState.loggedIn ? " chatAppBlur" : '') /*Blur the app if the user isn't logged in*/}>
            <div className="userListContainer emphasised-container">
                <UserListItem userName="PantelicGR" isAway={false} isSelected={false} isCurrentUser={false} userClass="op"/>
                <UserListItem userName="Guest63523" isAway={false} isSelected={false} isCurrentUser={false} userClass="op"/>
                <UserListItem userName="tangles" isAway={false} isSelected={true} isCurrentUser={false} userClass="voice"/>
                <UserListItem userName="snafu" isAway={true} isSelected={false} isCurrentUser={false} userClass="voice"/>
                <UserListItem userName="tanglesBurger" isAway={false} isSelected={false} isCurrentUser={true} userClass="voice"/>
                <UserListItem userName="_abbenormal" isAway={false} isSelected={false} isCurrentUser={false}/>
                <UserListItem userName="ASTRA-" isAway={false} isSelected={false} isCurrentUser={false}/>
                <UserListItem userName="kitten-Meow" isAway={false} isSelected={false} isCurrentUser={false}/>
                <UserListItem userName="Brain" isAway={true} isSelected={false} isCurrentUser={false}/>
                <UserListItem userName="Pak" isAway={false} isSelected={false} isCurrentUser={false}/>
                <UserListItem userName="Pak_" isAway={true} isSelected={false} isCurrentUser={false}/>
            </div>
            <div className="userStatsContainer emphasised-container">
                <p>2 ops, 11 total</p>
            </div>
            <ConnectionStats />
        </div>
    );
}

const mapStateToProps = (state) => {
    return state;
};
export default connect(mapStateToProps)(UserWindow);