export const addAdminChannel = (    
  {
    channelId = 0,
    channelName = '',
    topic = '',
    isDefault = false,
    isVisible = false,
    creatorId = 0,
    creatorNick = '',
    requiresVoice = false,
    requiresRegistration = false
  } = {}

) => ({ 
  
  type: 'ADD_ADMIN_CHANNEL',
  channel: {
    channelId,
    channelName,
    topic,
    isDefault,
    isVisible,
    creatorId,
    creatorNick,
    requiresVoice,
    requiresRegistration
  }

});

export const removeAdminChannels = () => ({
  type: 'REMOVE_ADMIN_CHANNELS'
})