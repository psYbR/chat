
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
    userIsVoice = false,
    userIsImage = false
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
    userIsVoice,
    userIsImage
  }

});

export const setChannelIsOwner = (channelId) => ({
  type: 'SET_CHANNEL_IS_OWNER',
  channelId
})
export const setChannelIsOp = (channelId) => ({
  type: 'SET_CHANNEL_IS_OP',
  channelId
})
export const setChannelIsMod = (channelId) => ({
  type: 'SET_CHANNEL_IS_MOD',
  channelId
})
export const setChannelIsVoice = (channelId) => ({
  type: 'SET_CHANNEL_IS_VOICE',
  channelId
})
export const setChannelIsImage = (channelId) => ({
  type: 'SET_CHANNEL_IS_IMAGE',
  channelId
})
export const setChannelHasNewMessages = (channelId) => ({
  type: 'SET_CHANNEL_HAS_NEW_MESSAGES',
  channelId
});
export const setChannelHasNotifs = (channelId) => ({
  type: 'SET_CHANNEL_HAS_NOTIFS',
  channelId
});
export const setChannelHasMention = (channelId) => ({
  type: 'SET_CHANNEL_HAS_MENTION',
  channelId
});
export const setChannelMessagesRead = (channelId) => ({
  type: 'SET_CHANNEL_MESSAGES_READ',
  channelId
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