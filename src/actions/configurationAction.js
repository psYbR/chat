// configuration: {
//     loggedIn: false,
//     userid: 0,
//     username: 'Guest',
//     defaultFont: 'Inconsolata',
//     defaultColor: -1,
//     assignedGroup: 'guests',
//     defaultChannel: 'welcome',
//     isAway: false,
//     showSystemMessages: true
//   }, 

//NOTE - the breakpoints are also defined in ./styles/base/settings.scss
//                                      and  ./components/windowResize.js
const horizontalBreakPoint = 50; //rem

// the initial window state needs to be set here so it is correct on page load
let initialWindowState = true;
if (Math.round(window.innerWidth * 0.0625) < horizontalBreakPoint) {
  initialWindowState = false;
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementsByClassName("userWindowContainer")[0].style.display = "none";
    document.getElementsByClassName("leftSideContainer")[0].style.display = "none";
  }, false); 
  
}

export const configurationAction = (
  {
    loggedIn = true,
    userid = 0,
    username = '',//'Guest' + Math.floor(Math.random() * 10000),
    defaultFont = 'Inconsolata',
    defaultColor = '-1',
    assignedGroup = 'guests',
    defaultChannelId = 1,
    isAway = false,
    showSystemMessages = true,
    channelListOpen = initialWindowState,
    userListOpen = initialWindowState,
    windowWidth = Math.round(window.innerWidth * 0.0625),
    windowHeight = Math.round(window.innerHeight * 0.0625)
  } = {}
) => ({
  type: 'SET_CONFIG',
  configuration: {
    loggedIn,
    userid,
    username,
    defaultFont,
    defaultColor,
    assignedGroup,
    defaultChannelId,
    isAway,
    showSystemMessages,
    channelListOpen,
    userListOpen,
    windowWidth,
    windowHeight
  }
});

export const setLoggedIn = () => ({
  type: 'SET_LOGGED_IN',
  configuration: {
    loggedIn: true
  }
});

export const setUserNick = (username = '') => ({
  type: 'SET_NICK',
  configuration: {
    username
  }
});

export const setTypingMessage = (typingMessage= '') => ({
  type: 'SET_TYPING_MESSAGE',
  configuration: {
    typingMessage
  }
});

export const setWindowWidth = (windowWidth) => ({
  type: 'SET_WINDOW_WIDTH',
  configuration: {
    windowWidth
  }
});
export const setWindowHeight = (windowHeight) => ({
  type: 'SET_WINDOW_HEIGHT',
  configuration: {
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

