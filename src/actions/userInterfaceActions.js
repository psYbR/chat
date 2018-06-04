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
      styleSelectionIsVisible = false
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
      styleSelectionIsVisible
    }
  });

export const hideStyleModal = () => ({
  type: 'HIDE_STYLE_MODAL'
});
export const showStyleModal = () => ({
  type: 'SHOW_STYLE_MODAL'
});

//the current channel the user is in
export const setActiveChannel = (
  {
    activeChannelId = 1,
    activeChannelNumberOfUsers = 0,
    activeChannelNumberOfOps = 0
  } = {}
) => ({
  type: 'SET_ACTIVE_CHANNEL',
  userInterface: {
    activeChannelId,
    activeChannelNumberOfUsers,
    activeChannelNumberOfOps
  }
});

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

export const setInputFieldText = (inputFieldText = '') => ({
  type: 'SET_INPUT_FIELD_TEXT',
  UIState: {
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
export const toggleChannelList = () => ({
  type: 'TOGGLE_CHANNEL_LIST'
});
export const toggleUserList = () => ({
  type: 'TOGGLE_USER_LIST'
});
export const hideChannelList = () => ({
  type: 'HIDE_CHANNEL_LIST'
});
export const hideUserList = () => ({
  type: 'HIDE_USER_LIST'
});
export const showChannelList = () => ({
  type: 'SHOW_CHANNEL_LIST'
});
export const showUserList = () => ({
  type: 'SHOW_USER_LIST'
});
