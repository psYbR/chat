
export const addChannel = (    
  {
    channelId = 0,
    channelName = '',
    type = 'channel', //or 'user' for private message
    topic = '',
    isCurrent = false,
    isJoined = false,
    wasJoined = false,
    joinFailed = false,
    hasNewMessages = false,
    hasNewNotifs = false,
    hasNewMention = false,
    userIsOwner = false,
    userIsOp = false,
    userIsMod = false,
    userIsVoice = false
  } = {}

) => ({ 
  
  type: 'ADD_CHANNEL',
  channel: {
    channelId,
    channelName,
    type,
    topic,
    isCurrent,
    isJoined,
    wasJoined,
    joinFailed,
    hasNewMessages,
    hasNewNotifs,
    hasNewMention,
    userIsOwner,
    userIsOp,
    userIsMod,
    userIsVoice
  }

});

export const setCurrentChannel = (channelId) => ({ 
  type: 'SET_CURRENT_CHANNEL',
  channelId
});
export const joinChannel = (channelId) => ({ 
  type: 'JOIN_CHANNEL',
  channelId
});
export const setChannelJoinFailed = (channelId) => ({ 
  type: 'SET_CHANNEL_JOIN_FAILED',
  channelId
});
export const setAllChannelsWasJoined = () => ({
  type: 'SET_ALL_CHANNELS_WAS_JOINED'
});
export const leaveChannel = (channelId) => ({
  type: 'LEAVE_CHANNEL',
  channelId
});