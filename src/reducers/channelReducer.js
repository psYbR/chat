const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_CHANNEL':
      return [
        ...state,
        action.channel
      ];
    case 'SELECT_CHANNEL_IN_PICKER':
      return state.map((channel) => {
        if (channel.channelId == action.channelId) {
          return {
            ...channel,
            isSelectedInPicker: true
          }
        } else {
          return channel
        }
      })
    case 'DESELECT_CHANNEL_IN_PICKER':
      return state.map((channel) => {
        if (channel.channelId == action.channelId) {
          return {
            ...channel,
            isSelectedInPicker: false
          }
        } else {
          return channel
        }
      })
    case 'RESET_CHANNEL_PICKER_SELECTION':
      return state.map(channel => {
        return {
          ...channel,
          isSelectedInPicker: false
        }
      })
    case 'SET_CHANNEL_PERMISSIONS':
      return state.map(channel => {
        if (channel.channelId == action.channelId) {
          return{
            ...channel,
            userIsOwner: action.permissions.userIsOwner,
            userIsOp: action.permissions.userIsOp,
            userIsMod: action.permissions.userIsMod,
            userIsVoice: action.permissions.userIsVoice,
            userIsImage: action.permissions.userIsImage
          }
        } else {
          return channel
        }
      })
    case 'SET_CHANNEL_HAS_MESSAGES':
      return state.map((channel) => {
        if (channel.channelId == action.channelId) {
          return {
            ...channel,
            hasMessages: true
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
            hasNotifs: true
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
            hasMention: true
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
            hasMessages: false,
            hasNotifs: false,
            hasMention: false
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
            wasJoinedBeforeDisconnect: false
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
            wasJoinedBeforeDisconnect: true
          }
        } else {
          return channel
        }
      })
    case 'LEAVE_CHANNEL':
      return state.map((channel) => {
        if (channel.channelId == action.channelId) {
          return {
            ...channel,
            isJoined: false
          }
        } else {
          return channel
        }
      });
    default:
      return state;
  }
};
