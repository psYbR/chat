import React from 'react';
import ConnectionStats from './ConnectionStats';
import UserWindowListItem from './UserWindowListItem';
import { connect } from 'react-redux';

const UserWindow = ({ configuration }) => {
    return (
        <div className={"userWindowContainer " + (!configuration.loggedIn ? " chatAppBlur" : '') /*Blur the app if the user isn't logged in*/}>
            <div className="userListContainer emphasised-container">
                <UserWindowListItem userName="PantelicGR" isAway={false} isSelected={false} isCurrentUser={false} userClass="op"/>
                <UserWindowListItem userName="Guest63523" isAway={false} isSelected={false} isCurrentUser={false} userClass="op"/>
                <UserWindowListItem userName="tangles" isAway={false} isSelected={true} isCurrentUser={false} userClass="voice"/>
                <UserWindowListItem userName="snafu" isAway={true} isSelected={false} isCurrentUser={false} userClass="voice"/>
                <UserWindowListItem userName="tanglesBurger" isAway={false} isSelected={false} isCurrentUser={true} userClass="voice"/>
                <UserWindowListItem userName="_abbenormal" isAway={false} isSelected={false} isCurrentUser={false}/>
                <UserWindowListItem userName="ASTRA-" isAway={false} isSelected={false} isCurrentUser={false}/>
                <UserWindowListItem userName="kitten-Meow" isAway={false} isSelected={false} isCurrentUser={false}/>
                <UserWindowListItem userName="Brain" isAway={true} isSelected={false} isCurrentUser={false}/>
                <UserWindowListItem userName="Pak" isAway={false} isSelected={false} isCurrentUser={false}/>
                <UserWindowListItem userName="Pak_" isAway={true} isSelected={false} isCurrentUser={false}/>
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