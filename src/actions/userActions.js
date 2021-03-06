
//user scope is "channel" however nicknames must be unique across all channels
export const addUser = (    
  {
    userId = 0,
    group = 'user', //'voice', 'op', 'system'
    nick = '',
    isSelected = false,
    isCurrentUser = false,
    isAway = false,
    isBlocked = false
  } = {}
) => ({ 
  type: 'ADD_USER',
  user: {
    userId,
    group,
    nick,
    isSelected,
    isCurrentUser,
    isAway,
    isBlocked
  }
});

export const removeUser = (userId) => ({ 
  type: 'REMOVE_USER',
  userId
});
export const setGroupOfUser = (userId, group) => ({
  type: 'SET_GROUP_OF_USER',
  userId,
  group
});
export const setNickOfUser = (userId, nick) => ({
  type: 'SET_NICK_OF_USER',
  userId,
  nick
});
export const setSelectedUser = (userId) => ({
  type: 'SET_SELECTED_USER',
  userId
});
export const setUserIsAway = (userId) => ({ 
  type: 'SET_USER_IS_AWAY',
  userId
});
export const unsetUserIsAway = (userId) => ({ 
  type: 'UNSET_USER_IS_AWAY',
  userId
});
export const setUserIsBlocked = (userId) => ({ 
  type: 'SET_USER_IS_BLOCKED',
  userId
});
export const unsetUserIsBlocked = (userId) => ({ 
  type: 'UNSET_USER_IS_BLOCKED',
  userId
});
export const flushUserList = () => ({
  type: 'FLUSH_USER_LIST'
});
