import React from 'react';
import ConnectionStats from './ConnectionStats';
import UserListItem from './UserListItem';
import { connect } from 'react-redux';
import { getVisibleUsers } from '../selectors/getVisibleUsers';

const UserWindow = (state) => {
  return (
    <div className={"userWindowContainer " + (state.userInterface.appIsBlurred ? " chatAppBlur" : '') /*Blur the app if the flag is set*/}>
      <div className="userListContainer emphasised-container">
        {getVisibleUsers(state).map((user)=>{
          return <UserListItem key={user.userId} userName={user.nick} isAway={user.isAway} isSelected={user.isSelected} isCurrentUser={user.isCurrentUser} userGroup={user.group} />
        })}
      </div>
      <div className="userStatsContainer emphasised-container">
        <p>{state.users.filter(user => user.group == "op").length} ops, {state.users.length} total</p>
      </div>
      <ConnectionStats />
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(UserWindow);