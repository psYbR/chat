export const addAdminChannel = (    
  {
    channelId = 0,
    channelName = '',
    topic = '',
    isDefault = false
  } = {}

) => ({ 
  
  type: 'ADD_ADMIN_CHANNEL',
  channel: {
    channelId,
    channelName,
    topic,
    isDefault
  }

});