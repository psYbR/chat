
export const addChannel = (    
  {
    channelId = 0,
    channelName = '',
    type = 'channel', //or 'user' for private message
    topic = '',
    isSelected = false,
    isCurrent = false,
    isJoined = false,
    hasNewMessages = false,
    hasNewNotifs = false,
    hasNewMention = false,
    amOwner = false,
    amOp = false,
    amMod = false,
    amVoice = false
  } = {}

) => ({ 
  
  type: 'ADD_CHANNEL',
  channel: {
    channelId,
    channelName,
    type,
    topic,
    isSelected,
    isCurrent,
    isJoined,
    hasNewMessages,
    hasNewNotifs,
    hasNewMention,
    amOwner,
    amOp,
    amMod,
    amVoice
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