//NOTE - breakpoints are also defined in ./styles/base/settings.scss  and  ./components/windowResize.js
const horizontalBreakPoint = 50; //rem

// the initial window state needs to be set here so it is correct on page load
let initialWindowState = true;
if (Math.round(window.innerWidth * 0.0625) < horizontalBreakPoint) {
  initialWindowState = false;
}

//the default/initial state
export const setUIState = (
  {

    loginModalVisible = false,
    adminModalVisible = false,

    channelListVisible = initialWindowState,
    userListVisible = initialWindowState,
    styleModalVisible = false, //use to hide/show the style modal
    leaveChannelModalVisible = false,
    channelPickerVisible = false,

    windowWidth = Math.round(window.innerWidth * 0.0625),
    windowHeight = Math.round(window.innerHeight * 0.0625),
    chatMessageInput = '',
    ping = '0',
    
    appIsBlurred = true,
    appIsFocused = true,
    appIsConnected = false, //whether the socket reports it has been successfully opened
    defaultChannelsReceived = false, //whether the list of default channels was received from the server
    waitingForUserChannels = false, //true while retrieval in progress
    numberOfUserChannels = 0, //the server will provide this value so that when the client requests a list, we know the progress of the list retrieval
    
    channelPickerSecondTab = false, //false to show the first tab, true for the second
    reconnectionMessage = 'Connecting', //used by the ConnectingModal to show either Connecting or Re-connecting if the connection is being initially established or if it is lost
    disconnectionReason = '',
    
    waitingForLeaveChannelConfirmation = false,
    messagesSinceNotFocused = false,
    
    pastedImageSize = 0
  } = {}
) => ({
  type: 'SET_UI_STATE',
  userInterface: {

    loginModalVisible,
    adminModalVisible,

    channelListVisible,
    userListVisible,
    windowWidth,
    windowHeight,
    chatMessageInput,
    ping,
    styleModalVisible,
    appIsBlurred,
    appIsFocused,
    appIsConnected,
    defaultChannelsReceived,
    waitingForUserChannels,
    numberOfUserChannels,
    channelPickerVisible,
    channelPickerSecondTab,
    reconnectionMessage,
    disconnectionReason,
    leaveChannelModalVisible,
    waitingForLeaveChannelConfirmation,
    messagesSinceNotFocused,
    pastedImageSize
  }
});

export const unsetAdminModalVisible = () => ({
  type: 'UNSET_ADMIN_MODAL_VISIBLE'
})
export const setAdminModalVisible = () => ({
  type: 'SET_ADMIN_MODAL_VISIBLE'
})
export const unsetLoginModalVisible = () => ({
  type: 'UNSET_LOGIN_MODAL_VISIBLE'
})
export const setLoginModalVisible = () => ({
  type: 'SET_LOGIN_MODAL_VISIBLE'
})


export const setPastedImageSize = (size) => ({
  type: 'SET_PASTED_IMAGE_SIZE',
  size
})

export const setMessagesSinceNotFocused = () => ({
  type: 'SET_MESSAGES_SINCE_NOT_FOCUSED'
})
export const unsetMessagesSinceNotFocused = () => ({
  type: 'UNSET_MESSAGES_SINCE_NOT_FOCUSED'
})
export const setAppIsFocused = () => ({
  type: 'SET_APP_FOCUSED'
})
export const unsetAppIsFocused = () => ({
  type: 'UNSET_APP_FOCUSED'
})
export const setPing = (ping) => ({
  type: 'UPDATE_PING',
  ping
});
export const setChatMessageInput = (inputValue = '') => ({
  type: 'SET_CHAT_MESSAGE_INPUT',
  inputValue
});
export const setWindowWidth = (windowWidth) => ({
  type: 'SET_WINDOW_WIDTH',
  windowWidth
});
/* export const setWindowHeight = (windowHeight) => ({
  type: 'SET_WINDOW_HEIGHT', //not used currently
  windowHeight
}); */

export const setNumberOfUserChannels = (numberOfUserChannels) => ({
  type: 'SET_NUMBER_OF_USER_CHANNELS',
  numberOfUserChannels
});
export const setWaitingForUserChannels = () => ({
  type: 'SET_WAITING_FOR_USER_CHANNELS'
});
export const unsetWaitingForUserChannels = () => ({
  type: 'UNSET_WAITING_FOR_USER_CHANNELS'
});
export const setDefaultChannelsReceived = () => ({
  type: 'SET_DEFAULT_CHANNELS_RECEIVED'
});
export const setConnected = () => ({
  type: 'SET_CONNECTED'
});
export const setDisconnected = () => ({
  type: 'SET_DISCONNECTED'
});
export const setDisconnectionReason = (disconnectionReason) => ({
  type: 'SET_DISCONNECTION_REASON',
  disconnectionReason
});
export const channelPickerShowFirstTab = () => ({
  type: 'CHANNEL_PICKER_SHOW_FIRST_TAB'
});
export const channelPickerShowSecondTab = () => ({
  type: 'CHANNEL_PICKER_SHOW_SECOND_TAB'
});
export const setChannelModalVisible = () => ({
  type: 'SET_CHANNEL_MODAL_VISIBLE'
});
export const unsetChannelModalVisible = () => ({
  type: 'UNSET_CHANNEL_MODAL_VISIBLE'
});
export const setStyleModalVisible = () => ({
  type: 'SET_STYLE_MODAL_VISIBLE'
});
export const unsetStyleModalVisible = () => ({
  type: 'UNSET_STYLE_MODAL_VISIBLE'
});
export const showChannelList = () => ({
  type: 'SHOW_CHANNEL_LIST'
});
export const hideChannelList = () => ({
  type: 'HIDE_CHANNEL_LIST'
});
export const showUserList = () => ({
  type: 'SHOW_USER_LIST'
});
export const hideUserList = () => ({
  type: 'HIDE_USER_LIST'
});
export const blurApp = () => ({
  type: 'BLUR_APP'
});
export const unblurApp = () => ({
  type: 'UNBLUR_APP'
});
export const setLeaveChannelModalVisible = () => ({
  type: 'SET_LEAVE_CHANNEL_MODAL_VISBLE'
});
export const unsetLeaveChannelModalVisible = () => ({
  type: 'UNSET_LEAVE_CHANNEL_MODAL_VISBLE'
});
export const setWaitingForLeaveChannelConfirmation = () => ({
  type: 'SET_WAITING_FOR_LEAVE_CHANNEL_CONFIRMATION'
})
export const unsetWaitingForLeaveChannelConfirmation = () => ({
  type: 'UNSET_WAITING_FOR_LEAVE_CHANNEL_CONFIRMATION'
})

