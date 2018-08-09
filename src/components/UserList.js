import React from 'react';
import ConnectionStats from './ConnectionStats';
import UserListItem from './UserListItem';
import { connect } from 'react-redux';
import { getVisibleUsers } from '../selectors/getVisibleUsers';

const UserWindow = (state) => {
  return (
    <div className="userWindowContainer">
      <div className={state.configuration.lightTheme ? "userListContainer emphasised-container-light" : "userListContainer emphasised-container"}>
        {getVisibleUsers(state).map((user)=>{
          return <UserListItem key={user.userId} userName={user.nick} isAway={user.isAway} isSelected={user.isSelected} isCurrentUser={user.isCurrentUser} userGroup={user.group} />
        })}
      </div>
      <div className={state.configuration.lightTheme ? "userStatsContainer emphasised-container-light" : "userStatsContainer emphasised-container"}>
        <p>{state.users.filter(user => user.group == "op").length + " op(s)"}, {state.users.length + " user(s)"}</p>
      </div>
      <ConnectionStats />
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(UserWindow);