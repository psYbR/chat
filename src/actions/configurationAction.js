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

export const configurationAction = (
  {
    loggedIn = false,
    userid = 0,
    username = 'Guest1337',
    defaultFont = 'Inconsolata',
    defaultColor = '-1',
    assignedGroup = 'guests',
    defaultChannelId = 1,
    isAway = false,
    showSystemMessages = true,
    channelListIsHidden = false,
    userListIsHidden = false
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
    channelListIsHidden,
    userListIsHidden
  }
});

export const setTypingMessage = (typingMessage= '') => ({
  type: 'SET_TYPING_MESSAGE',
  configuration: {
    typingMessage
  }
});
