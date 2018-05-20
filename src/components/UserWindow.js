import React from 'react';
import ConnectionStats from './ConnectionStats';
import UserWindowListItem from './UserWindowListItem';

const UserWindow = () => {
    return (
        <div className="userWindowContainer">
            <div className="userListContainer">
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
            <div className="userStatsContainer">
                <p>2 ops, 11 total</p>
            </div>
            <ConnectionStats />
        </div>
    );
}

export default UserWindow;