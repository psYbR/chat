const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_CHANNEL':
      return [
        ...state,
        action.channel
      ];
    case 'SET_CHANNEL_HAS_NEW_MESSAGES':
      return state.map((channel) => {
        if (channel.channelId == action.channelId) {
          return {
            ...channel,
            hasNewMessages: true
          }
        } else {
          return channel
        }
      })
    case 'SET_CHANNEL_HAS_NOTIFS':
      return state.map((channel) => {
        if (channel.channelId == action.channelId) {
          return {
            ...channel,
            hasNewNotifs: true
          }
        } else {
          return channel
        }
      })
    case 'SET_CHANNEL_HAS_MENTION':
      return state.map((channel) => {
        if (channel.channelId == action.channelId) {
          return {
            ...channel,
            hasNewMention: true
          }
        } else {
          return channel
        }
      })
    case 'SET_CHANNEL_MESSAGES_READ':
      return state.map((channel) => {
        if (channel.channelId == action.channelId) {
          return {
            ...channel,
            hasNewMessages: false,
            hasNewNotifs: false,
            hasNewMention: false
          }
        } else {
          return channel
        }
      })
    case 'SET_CURRENT_CHANNEL':
      return state.map((channel) => {
        if (channel.channelId === action.channelId) {
          return {
            ...channel,
            isCurrent: true
          }
        } else {
          return {
            ...channel,
            isCurrent: false //return false here because we only want one channel to be current at any time
          }
        }
      })
    case 'JOIN_CHANNEL':
      return state.map((channel) => {
        if (channel.channelId === action.channelId) {
          return {
            ...channel,
            isJoined: true,
            wasJoined: false
          }
        } else {
          return channel
        }
      })
    case 'SET_ALL_CHANNELS_WAS_JOINED':
      return state.map((channel)=>{
        if (channel.isJoined) {
          return {
            ...channel,
            isJoined: false,
            wasJoined: true
          }
        } else {
          return channel
        }
      })
    case 'LEAVE_CHANNEL':
      return state.filter(channel => channel.channelId != action.channelId);
    default:
      return state;
  }
};
