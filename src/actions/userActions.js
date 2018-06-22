
//user scope is "channel" however nicknames must be unique across all channels
export const addUser = (    
  {
    channels = [],
    userId = 0,
    group = 'user', //'voice', 'op', 'system'
    nick = '',
    isSelected = false,
    isCurrentUser = false,
    isAway = false,
    isBlocked = false
  } = {}, channel = 0

) => ({ 
  
  type: 'ADD_USER',
  user: {
    channels,
    userId,
    group,
    nick,
    isSelected,
    isCurrentUser,
    isAway,
    isBlocked
  },
  channel

});

export const removeUser = (userId, channel) => ({ 
  type: 'REMOVE_USER',
  userId,
  channel
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

export const setUserIsNotAway = (userId) => ({ 
  type: 'SET_USER_IS_NOT_AWAY',
  userId
});

export const setUserIsBlocked = (userId) => ({ 
  type: 'SET_USER_IS_BLOCKED',
  userId
});

export const setUserIsNotBlocked = (userId) => ({ 
  type: 'SET_USER_IS_NOT_BLOCKED',
  userId
});

export const addUserToChannel = (userId, channelId) => ({ 
  type: 'ADD_USER_TO_CHANNEL',
  userId,
  channelId
});

export const removeUserFromChannel = (userId, channelId) => ({ 
  type: 'REMOVE_USER_FROM_CHANNEL',
  userId,
  channelId
});

export const flushUserList = () => ({
  type: 'FLUSH_USER_LIST'
});