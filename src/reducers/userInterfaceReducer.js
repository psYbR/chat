const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_UI_STATE':
      return action.userInterface;
    case 'SET_MESSAGES_SINCE_NOT_FOCUSED':
      return {
        ...state,
        messagesSinceNotFocused: true
      }
    case 'UNSET_MESSAGES_SINCE_NOT_FOCUSED':
      return {
        ...state,
        messagesSinceNotFocused: false
      }
    case 'SET_APP_IS_FOCUSED':
      return {
        ...state,
        appIsFocused: true
      }
    case 'UNSET_APP_IS_FOCUSED':
      return {
        ...state,
        appIsFocused: false
      }
    case 'SET_ACTIVE_CHANNEL':
      return {
        ...state,
        currentChannelId: action.channelId
      }
    case 'UPDATE_PING':
      return {
        ...state,
        ping: action.ping
      }
    case 'SET_CHAT_MESSAGE_INPUT':
      return {
        ...state,
        chatMessageInput: action.inputValue
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
    case 'SET_WAIT_FOR_NICK_ACCEPTANCE':
      return {
        ...state,
        waitingForNickAcceptance: true
      };
    case 'UNSET_WAIT_FOR_NICK_ACCEPTANCE':
      return {
        ...state,
        waitingForNickAcceptance: false
      };
    case 'SET_NICK_SET_FAILED_REASON':
      return {
        ...state,
        nickSetFailedReason: action.nickSetFailedReason
      };
    case 'SET_NUMBER_OF_USER_CHANNELS':
      return {
        ...state,
        numberOfUserChannels: action.numberOfUserChannels
      };
    case 'SET_WAITING_FOR_USER_CHANNELS':
      return {
        ...state,
        waitingForUserChannels: true
      };
    case 'UNSET_WAITING_FOR_USER_CHANNELS':
      return {
        ...state,
        waitingForUserChannels: false
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
    case 'SET_DISCONNECTION_REASON':
      return {
        ...state,
        disconnectionReason: action.disconnectionReason
      };
    case 'CHANNEL_PICKER_SHOW_FIRST_TAB':
      return {
        ...state,
        channelPickerSecondTab: false
      };
    case 'CHANNEL_PICKER_SHOW_SECOND_TAB':
      return {
        ...state,
        channelPickerSecondTab: true
      };
    case 'SET_TERMS_ACCEPTED':
      return {
        ...state,
        termsAccepted: true
      };
    case 'UNSET_TERMS_ACCEPTED':
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
        channelListIsVisible: true
      };
    case 'HIDE_CHANNEL_LIST':
      return {
        ...state,
        channelListIsVisible: false
      };
    case 'SHOW_USER_LIST':
      return {
        ...state,
        userListIsVisible: true
      };
    case 'HIDE_USER_LIST':
      return {
        ...state,
        userListIsVisible: false
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
    case 'SHOW_LEAVE_CHANNEL_MODAL':
      return {
        ...state,
        leaveChannelModalIsVisible: true
      }
    case 'HIDE_LEAVE_CHANNEL_MODAL':
      return {
        ...state,
        leaveChannelModalIsVisible: false
      }
    case 'SET_WAITING_FOR_LEAVE_CHANNEL_CONFIRMATION':
      return {
        ...state,
        waitingForLeaveChannelConfirmation: true
      }
    case 'UNSET_WAITING_FOR_LEAVE_CHANNEL_CONFIRMATION':
      return {
        ...state,
        waitingForLeaveChannelConfirmation: false
      }
    default:
      return state;
  }
};