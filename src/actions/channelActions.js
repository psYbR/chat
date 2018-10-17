
export const addChannel = (    
  {
    channelId = 0,
    channelName = '',
    isDefault = false,
    topic = '',
    isSelectedInPicker = false,
    isCurrent = false,
    isJoined = false,
    wasJoinedBeforeDisconnect = false,
    joinFailed = false,
    hasMessages = false,
    hasNotifs = false,
    hasMention = false,
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
    isDefault,
    topic,
    isSelectedInPicker,
    isCurrent,
    isJoined,
    wasJoinedBeforeDisconnect,
    joinFailed,
    hasMessages,
    hasNotifs,
    hasMention,
    userIsOwner,
    userIsOp,
    userIsMod,
    userIsVoice,
    userIsImage
  }

});


export const selectChannelInPicker = (channelId) => ({ 
  type: 'SELECT_CHANNEL_IN_PICKER',
  channelId
});
export const deselectChannelInPicker = (channelId) => ({ 
  type: 'DESELECT_CHANNEL_IN_PICKER',
  channelId
});
export const resetChannelPickerSelection = () => ({ 
  type: 'RESET_CHANNEL_PICKER_SELECTION'
});
export const setChannelPermissions = (channelId, permissions) => ({
  type: 'SET_CHANNEL_PERMISSIONS',
  channelId,
  permissions
})
export const setChannelHasMessages = (channelId) => ({
  type: 'SET_CHANNEL_HAS_MESSAGES',
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