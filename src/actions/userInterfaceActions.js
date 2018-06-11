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
    currentPing = 0,
    styleSelectionIsVisible = false,
    appIsBlurred = true,
    appZoom = 1,
    appIsConnected = false, //whether the socket reports it has been successfully opened
    termsAccepted = false,
    defaultChannelsReceived = false //whether the list of default channels was received from the server
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
    defaultChannelsReceived
  }
});


//the current channel the user is in
export const setActiveChannel = ( activeChannelId = 1 ) => {
  return({
    type: 'SET_ACTIVE_CHANNEL',
    userInterface: {
      activeChannelId
    }
  })
};


export const setDefaultChannelsReceived = () => {
  return({
    type: 'SET_DEFAULT_CHANNELS_RECEIVED'
  })
};

export const setTermsAccepted = () => {
  return({
    type: 'SET_TERMS_ACCEPTED'
  })
};

export const setTermsUnaccepted = () => {
  return({
    type: 'SET_TERMS_UNACCEPTED'
  })
};

//the current channel the user is in
export const updateUserStats = (
  {
    activeChannelNumberOfUsers = 0,
    activeChannelNumberOfOps = 0
  } = {}
) => ({
  type: 'UPDATE_USER_STATS',
  userInterface: {
    activeChannelNumberOfUsers,
    activeChannelNumberOfOps
  }
});

//the current channel the user is in
export const updatePing = (
  {
    currentPing = 0
  } = {}
) => ({
  type: 'UPDATE_PING',
  userInterface: {
    currentPing
  }
});
export const setConnected = () => ({
  type: 'SET_CONNECTED'
});
export const setDisconnected = () => ({
  type: 'SET_DISCONNECTED'
});

export const setAppZoom = (appZoom = 1) => ({
  type: 'SET_APP_ZOOM',
  userInterface: {
    appZoom
  }
});
export const setInputFieldText = (inputFieldText = '') => ({
  type: 'SET_INPUT_FIELD_TEXT',
  userInterface: {
    inputFieldText
  }
});
export const setWindowWidth = (windowWidth) => ({
  type: 'SET_WINDOW_WIDTH',
  UIState: {
    windowWidth
  }
});
export const setWindowHeight = (windowHeight) => ({
  type: 'SET_WINDOW_HEIGHT',
  UIState: {
    windowHeight
  }
});

export const hideStyleModal = () => ({
  type: 'HIDE_STYLE_MODAL'
});
export const showStyleModal = () => ({
  type: 'SHOW_STYLE_MODAL'
});
export const hideChannelList = () => ({
  type: 'HIDE_CHANNEL_LIST'
});
export const showChannelList = () => ({
  type: 'SHOW_CHANNEL_LIST'
});
export const hideUserList = () => ({
  type: 'HIDE_USER_LIST'
});
export const showUserList = () => ({
  type: 'SHOW_USER_LIST'
});
export const blurApp = () => ({
  type: 'BLUR_APP'
});
export const unblurApp = () => ({
  type: 'UNBLUR_APP'
});

