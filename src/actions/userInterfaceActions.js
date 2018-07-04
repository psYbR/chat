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
    channelListIsVisible = initialWindowState,
    userListIsVisible = initialWindowState,
    windowWidth = Math.round(window.innerWidth * 0.0625),
    windowHeight = Math.round(window.innerHeight * 0.0625),
    chatMessageInput = '',
    ping = '0',
    styleModalIsVisible = false, //use to hide/show the style modal
    appIsBlurred = true,
    appIsFocused = true,
    appIsConnected = false, //whether the socket reports it has been successfully opened
    termsAccepted = true,
    defaultChannelsReceived = false, //whether the list of default channels was received from the server
    waitingForUserChannels = false, //true while retrieval in progress
    numberOfUserChannels = 0, //the server will provide this value so that when the client requests a list, we know the progress of the list retrieval
    channelPickerIsVisible = false,
    channelPickerSecondTab = false, //false to show the first tab, true for the second
    reconnectionMessage = 'Connecting', //used by the ConnectingModal to show either Connecting or Re-connecting if the connection is being initially established or if it is lost
    waitingForNickAcceptance = false, //set true while waiting for the server to accept changes to the nickname
    nickSetFailedReason = '',
    disconnectionReason = '',
    leaveChannelModalIsVisible = false,
    waitingForLeaveChannelConfirmation = false,
    messagesSinceNotFocused = false
  } = {}
) => ({
  type: 'SET_UI_STATE',
  userInterface: {
    channelListIsVisible,
    userListIsVisible,
    windowWidth,
    windowHeight,
    chatMessageInput,
    ping,
    styleModalIsVisible,
    appIsBlurred,
    appIsFocused,
    appIsConnected,
    termsAccepted,
    defaultChannelsReceived,
    waitingForUserChannels,
    numberOfUserChannels,
    channelPickerIsVisible,
    channelPickerSecondTab,
    reconnectionMessage,
    waitingForNickAcceptance,
    nickSetFailedReason,
    disconnectionReason,
    leaveChannelModalIsVisible,
    waitingForLeaveChannelConfirmation,
    messagesSinceNotFocused
  }
});

export const setMessagesSinceNotFocused = () => ({
  type: 'SET_MESSAGES_SINCE_NOT_FOCUSED'
})
export const unsetMessagesSinceNotFocused = () => ({
  type: 'UNSET_MESSAGES_SINCE_NOT_FOCUSED'
})
export const setAppIsFocused = () => ({
  type: 'SET_APP_IS_FOCUSED'
})
export const unsetAppIsFocused = () => ({
  type: 'UNSET_APP_IS_FOCUSED'
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
export const setWaitingForNickAcceptance = () => ({
  type: 'SET_WAIT_FOR_NICK_ACCEPTANCE'
});
export const unsetWaitingForNickAcceptance = () => ({
  type: 'UNSET_WAIT_FOR_NICK_ACCEPTANCE'
});
export const setNickSetFailedReason = (nickSetFailedReason) => ({
  type: 'SET_NICK_SET_FAILED_REASON',
  nickSetFailedReason
});
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
export const setTermsAccepted = () => ({
  type: 'SET_TERMS_ACCEPTED'
});
export const unsetTermsAccepted = () => ({
  type: 'UNSET_TERMS_ACCEPTED'
});
export const showChannelModal = () => ({
  type: 'SHOW_CHANNEL_MODAL'
});
export const hideChannelModal = () => ({
  type: 'HIDE_CHANNEL_MODAL'
});
export const showStyleModal = () => ({
  type: 'SHOW_STYLE_MODAL'
});
export const hideStyleModal = () => ({
  type: 'HIDE_STYLE_MODAL'
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
export const showLeaveChannelModal = () => ({
  type: 'SHOW_LEAVE_CHANNEL_MODAL'
});
export const hideLeaveChannelModal = () => ({
  type: 'HIDE_LEAVE_CHANNEL_MODAL'
});
export const setWaitingForLeaveChannelConfirmation = () => ({
  type: 'SET_WAITING_FOR_LEAVE_CHANNEL_CONFIRMATION'
})
export const unsetWaitingForLeaveChannelConfirmation = () => ({
  type: 'UNSET_WAITING_FOR_LEAVE_CHANNEL_CONFIRMATION'
})

