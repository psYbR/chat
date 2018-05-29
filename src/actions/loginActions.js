
export const setLoginState = (
    {

      loggedIn = false,
      userid = 0,
      username = '',
      assignedGroup = 'guests',
      defaultChannelId = 1,

    } = {}
) => ({

    type: 'SET_LOGIN_STATE',
    loginState: {
      loggedIn,
      userid,
      username,
      assignedGroup,
      defaultChannelId,
    }

  });
  
export const setLoggedIn = () => ({
    type: 'LOG_IN_SUCCESSFUL',
    loginState: {
        loggedIn: true
    }
});

export const setUserNick = (username = '') => ({
    type: 'SET_NICK',
    loginState: {
        username
    }
});
  