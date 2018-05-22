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
    defaultChannel = 'welcome',
    isAway = false,
    showSystemMessages = true
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
    defaultChannel,
    isAway,
    showSystemMessages
  }
});