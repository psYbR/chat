const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_UI_STATE':
      return action.userInterface;
    case 'SET_ADMIN_MODAL_VISIBLE':
      return {
        ...state,
        adminModalVisible: true
      }
    case 'UNSET_ADMIN_MODAL_VISIBLE':
      return {
        ...state,
        adminModalVisible: false
      }
    case 'UNSET_LOGIN_MODAL_VISIBLE':
      return {
        ...state,
        loginModalVisible: false
      }
    case 'SET_LOGIN_MODAL_VISIBLE':
      return {
        ...state,
        loginModalVisible: true
      }
    


    case 'SET_PASTED_IMAGE_SIZE':
      return {
        ...state,
        pastedImageSize: action.size
      }
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
    case 'SET_APP_FOCUSED':
      return {
        ...state,
        appIsFocused: true
      }
    case 'UNSET_APP_FOCUSED':
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
    case 'SET_CHANNEL_MODAL_VISIBLE':
      return {
        ...state,
        channelPickerVisible: true
      };
    case 'UNSET_CHANNEL_MODAL_VISIBLE':
      return {
        ...state,
        channelPickerVisible: false
      };
    case 'SET_STYLE_MODAL_VISIBLE':
      return {
        ...state,
        styleModalVisible: true
      };
    case 'UNSET_STYLE_MODAL_VISIBLE':
      return {
        ...state,
        styleModalVisible: false
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
    case 'SET_LEAVE_CHANNEL_MODAL_VISBLE':
      return {
        ...state,
        leaveChannelModalVisible: true
      }
    case 'UNSET_LEAVE_CHANNEL_MODAL_VISBLE':
      return {
        ...state,
        leaveChannelModalVisible: false
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