const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_UI_STATE':
      return action.userInterface;
    case 'SET_ACTIVE_CHANNEL':
      return {
        ...state,
        activeChannelId: action.activeChannelId
      }
    case 'UPDATE_USER_STATS':
      return {
        ...state,
        activeChannelNumberOfUsers: action.activeChannelNumberOfUsers,
        activeChannelNumberOfOps: action.activeChannelNumberOfOps
      }
    case 'UPDATE_PING':
      return {
        ...state,
        currentPing: action.currentPing
      }
    case 'SET_APP_ZOOM':
      return {
        ...state,
        appZoom: action.appZoom
      };
    case 'SET_INPUT_FIELD_TEXT':
      return {
        ...state,
        inputFieldText: action.inputFieldText
      };
    case 'SET_WINDOW_WIDTH':
      return {
        ...state,
        windowWidth: action.windowWidth
      };
    /*case 'SET_WINDOW_HEIGHT': //not used currently
      return {
        ...state,
        windowHeight: action.windowHeight
      };*/
    case 'SET_NUMBER_OF_USER_CHANNELS':
      return {
        ...state,
        numberOfUserChannels: action.numberOfUserChannels
      };
    case 'SET_DISCONNECTION_REASON':
      return {
        ...state,
        disconnectionReason: action.disconnectionReason
      };
    
    case 'START_RETRIEVE_USER_CHANNELS':
      return {
        ...state,
        retreivingUserChannels: true
      };
    case 'STOP_RETRIEVE_USER_CHANNELS':
      return {
        ...state,
        retreivingUserChannels: false
      };
    case 'SET_JOIN_USER_CHANNELS':
      return {
        ...state,
        userChannelsJoin: true
      };
    case 'UNSET_JOIN_USER_CHANNELS':
      return {
        ...state,
        userChannelsJoin: false
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
    case 'SET_DEFAULT_CHANNELS_RECEIVED':
      return {
        ...state,
        defaultChannelsReceived: true
      };
    case 'SET_CONNECTED':
      return {
        ...state,
        appIsConnected: true,
        reconnectionMessage: "Reconnecting"
      };  
    case 'SET_DISCONNECTED':
      return {
        ...state,
        appIsConnected: false
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
    case 'SHOW_CHANNEL_MODAL':
      return {
        ...state,
        channelPickerIsVisible: true
      };
    case 'HIDE_CHANNEL_MODAL':
      return {
        ...state,
        channelPickerIsVisible: false
      };
    case 'SHOW_STYLE_MODAL':
      return {
        ...state,
        styleSelectionIsVisible: true
      };
    case 'HIDE_STYLE_MODAL':
      return {
        ...state,
        styleSelectionIsVisible: false
      };
    case 'SHOW_CHANNEL_LIST':
      return {
        ...state,
        channelListVisible: true
      };
    case 'HIDE_CHANNEL_LIST':
      return {
        ...state,
        channelListVisible: false
      };
    case 'SHOW_USER_LIST':
      return {
        ...state,
        userListVisible: true
      };
    case 'HIDE_USER_LIST':
      return {
        ...state,
        userListVisible: false
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
    default:
      return state;
  }
};