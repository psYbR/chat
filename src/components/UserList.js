import React from 'react';
import ConnectionStats from './ConnectionStats';
import UserListItem from './UserListItem';
import { connect } from 'react-redux';
import { getVisibleUsers } from '../utils/utils';

const UserWindow = (state) => {
  return (
    <div className={"userWindowContainer " + (state.userInterface.appIsBlurred ? " chatAppBlur" : '') /*Blur the app if the flag is set*/}>
      <div className="userListContainer emphasised-container">
        {state.users.map((user) => {
          if (user.channels.includes(state.userInterface.activeChannelId)) {
            return <UserListItem userName={user.nick} isAway={user.isAway} isSelected={user.isSelected} userGroup={user.group} />
          }
        })}
        {/* <UserListItem userName="?" isAway={false} isSelected={false} isCurrentUser={false} userClass="voice"/> */}
      </div>
      <div className="userStatsContainer emphasised-container">
        <p>0 ops, {state.users.filter((user) => {
          return user.channels.includes(state.userInterface.activeChannelId)
        }).length} total</p>
      </div>
      <ConnectionStats />
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(UserWindow);