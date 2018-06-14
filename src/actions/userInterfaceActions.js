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
    channelListVisible = initialWindowState,
    userListVisible = initialWindowState,
    windowWidth = Math.round(window.innerWidth * 0.0625),
    windowHeight = Math.round(window.innerHeight * 0.0625),
    inputFieldText = '',
    activeChannelId = 1,
    activeChannelNumberOfUsers = 0,
    activeChannelNumberOfOps = 0,
    currentPing = '0',
    styleSelectionIsVisible = false, //use to hide/show the style modal
    appIsBlurred = true,
    appZoom = 1, //multiply the scale of visual elements by this amount
    appIsConnected = false, //whether the socket reports it has been successfully opened
    termsAccepted = true,
    defaultChannelsReceived = false, //whether the list of default channels was received from the server
    defaultChannelsJoin = false, //whether the app should attempt to join the selected default channels (see app.js and utils/initialChannelRequestJoins.js)
    retreivingUserChannels = false, //true while retrieval in progress
    numberOfUserChannels = 0, //the server will provide this value so that when the client requests a list, we know the progress of the list retrieval
    userChannelsJoin = false, //whether the app should attempt to join the user channels
    channelPickerIsVisible = false,
    channelPickerSecondTab = false, //false to show the first tab, true for the second
    reconnectionMessage = 'Connecting' //used by the ConnectingModal to show either Connecting or Re-connecting if the connection is being initially established or if it is lost
  } = {}
) => ({
  type: 'SET_UI_STATE',
  userInterface: {
    channelListVisible,
    userListVisible,
    windowWidth,
    windowHeight,
    inputFieldText,
    activeChannelId,
    activeChannelNumberOfUsers,
    activeChannelNumberOfOps,
    currentPing,
    styleSelectionIsVisible,
    appIsBlurred,
    appZoom,
    appIsConnected,
    termsAccepted,
    defaultChannelsReceived,
    defaultChannelsJoin,
    retreivingUserChannels,
    numberOfUserChannels,
    userChannelsJoin,
    channelPickerIsVisible,
    channelPickerSecondTab,
    reconnectionMessage
  }
});

//the current channel the user is in
export const setActiveChannel = (activeChannelId) => ({
  type: 'SET_ACTIVE_CHANNEL',
  activeChannelId
});
//the current channel the user is in
export const updateUserStats = (activeChannelNumberOfUsers, activeChannelNumberOfOps) => ({
  type: 'UPDATE_USER_STATS',
  activeChannelNumberOfUsers,
  activeChannelNumberOfOps
});
//the current channel the user is in
export const updatePing = (currentPing) => ({
  type: 'UPDATE_PING',
  currentPing
});
export const setAppZoom = (appZoom = 1) => ({
  type: 'SET_APP_ZOOM',
  appZoom
});
export const setInputFieldText = (inputFieldText = '') => ({
  type: 'SET_INPUT_FIELD_TEXT',
  inputFieldText
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
export const setDisconnectionReason = (disconnectionReason) => ({
  type: 'SET_DISCONNECTION_REASON',
  disconnectionReason
});

export const startRetrieveUserChannels = () => ({
  type: 'START_RETRIEVE_USER_CHANNELS'
});
export const stopRetrieveUserChannels = () => ({
  type: 'STOP_RETRIEVE_USER_CHANNELS'
});
export const setJoinUserChannels = () => ({
  type: 'SET_JOIN_USER_CHANNELS'
});
export const unsetJoinUserChannels = () => ({
  type: 'UNSET_JOIN_USER_CHANNELS'
});
export const setJoinDefaultChannels = () => ({
  type: 'SET_JOIN_DEFAULT_CHANNELS'
});
export const unsetJoinDefaultChannels = () => ({
  type: 'UNSET_JOIN_DEFAULT_CHANNELS'
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

export const channelPickerFirstTab = () => ({
  type: 'CHANNEL_PICKER_FIRST_TAB'
});
export const channelPickerSecondTab = () => ({
  type: 'CHANNEL_PICKER_SECOND_TAB'
});
export const setTermsAccepted = () => ({
  type: 'SET_TERMS_ACCEPTED'
});
export const setTermsUnaccepted = () => ({
  type: 'SET_TERMS_UNACCEPTED'
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
