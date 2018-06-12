
export const addUserChannel = (    
  {
      channelId = 0,
      channelName = '',
      topic = '',
      isSelected = false
  } = {}

) => ({ 

type: 'ADD_USER_CHANNEL',
channel: {
  channelId,
  channelName,
  topic,
  isSelected
}
});

export const selectUserChannel = (channelId) => ({ 
type: 'SELECT_USER_CHANNEL',
channelId
});

export const deselectUserChannel = (channelId) => ({ 
type: 'DESELECT_USER_CHANNEL',
channelId
});


