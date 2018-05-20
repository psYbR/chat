import React from 'react';

const UserWindowListItem = (props) => (
    <div className= {"userListUserName " +
        (props.isSelected ? 'active-selection ' : ' ') +
        (props.isCurrentUser ? 'userListCurrentUser ' : ' ') }>
        <i className={"fa fa-user " + (props.userClass ? props.userClass : '')}></i>
        <p className={(props.isAway && 'awayUser')}>
            {props.userName}
        </p>
    </div>
);

export default UserWindowListItem;