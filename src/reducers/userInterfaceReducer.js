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

    case 'SET_DEFAULT_CHANNELS_RECEIVED':
      return {
        ...state,
        defaultChannelsReceived: true
      };

    case 'CHANNEL_PICKER_FIRST_TAB':
      return {
        ...state,
        channelPickerSecondTab: false
      };

    case 'CHANNEL_PICKER_SECOND_TAB':
      return {
        ...state,
        channelPickerSecondTab: true
      };

    case 'SET_JOIN_DEFAULT_CHANNELS':
      return {
        ...state,
        defaultChannelsJoin: true
      };

    case 'UNSET_JOIN_DEFAULT_CHANNELS':
      return {
        ...state,
        defaultChannelsJoin: false
      };

    case 'SET_TERMS_ACCEPTED':
      return {
        ...state,
        termsAccepted: true
      };

    case 'SET_TERMS_UNACCEPTED':
      return {
        ...state,
        termsAccepted: false
      };

    case 'SET_DISCONNECTED':
      return {
        ...state,
        appIsConnected: false
      };

    case 'HIDE_CHANNEL_MODAL':
      return {
        ...state,
        channelPickerIsVisible: false
      };

    case 'SHOW_CHANNEL_MODAL':
      return {
        ...state,
        channelPickerIsVisible: true
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