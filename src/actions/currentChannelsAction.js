// currentChannels: [{
//     id: 0,
//     channelName: '',
//     type: 'channel', // 'user'
//     isSelected: false,
//     isCurrent: false,
//     isJoined: false,
//     hasNewMessages: false,
//     hasNewNotifs: false,
//     amOp: false,
//     amMod: false,
//     amVoice: false
//   }],

export const currentChannelsAction = (
    
  {
    id = 0,
    channelName = '',
    type = 'channel',
    topic = '',
    isSelected = false,
    isCurrent = false,
    isJoined = false,
    hasNewMessages = false,
    hasNewNotifs = false,
    amOp = false,
    amMod = false,
    amVoice = false
  } = {}

) => ({ 
  
  type: 'ADD_CHANNEL',
  channel: {
      id,
      channelName,
      type,
      topic,
      isSelected,
      isCurrent,
      isJoined,
      hasNewMessages,
      hasNewNotifs,
      amOp,
      amMod,
      amVoice
  }

});