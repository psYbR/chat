const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_UI_STATE':
      return action.userInterface;
    case 'HIDE_STYLE_MODAL':
      return {
        ...state,
        styleSelectionIsVisible: false
      };
    case 'SHOW_STYLE_MODAL':
      return {
        ...state,
        styleSelectionIsVisible: true
      };
    case 'BLUR_APP':
      return {
        ...state,
        appIsBlurred: true
      };
    case 'UNBLUR_APP':
      return {
        ...state,
        appIsBlurred: false
      };
    case 'SET_INPUT_FIELD_TEXT':
      return {
        ...state,
        inputFieldText: action.userInterface.inputFieldText
      };
    case 'SET_APP_ZOOM':
      return {
        ...state,
        appZoom: action.userInterface.appZoom
      };
    case 'SET_WINDOW_WIDTH':
      return {
        ...state,
        windowWidth: action.windowWidth
      };
      
    case 'SET_ACTIVE_CHANNEL':
      return {
        ...state,
        activeChannelId: action.userInterface.activeChannelId
      }

    case 'UPDATE_USER_STATS':
      return {
        ...state,
        activeChannelNumberOfUsers: action.userInterface.activeChannelNumberOfUsers,
        activeChannelNumberOfOps: action.userInterface.activeChannelNumberOfOps
      }

    case 'UPDATE_PING':
      return {
        ...state,
        currentPing: action.userInterface.currentPing
      }

    case 'SET_CONNECTED':
      return {
        ...state,
        appIsConnected: true
      };

    case 'HIDE_CHANNEL_LIST':
      return {
        ...state,
        channelListVisible: false
      };

    case 'SHOW_CHANNEL_LIST':
        return {
          ...state,
          channelListVisible: true
        };

    case 'HIDE_USER_LIST':
      return {
        ...state,
        userListVisible: false
      };

    case 'SHOW_USER_LIST':
      return {
        ...state,
        userListVisible: true
      };

    default:
      return state;
  }
};