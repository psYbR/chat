
export const setLoginState = (
    {

      loggedIn = true,
      userid = 0,
      nick = '',
      assignedGroup = 'guests',
      defaultChannelId = 1,

    } = {}
) => ({

    type: 'SET_LOGIN_STATE',
    loginState: {
      loggedIn,
      userid,
      nick,
      assignedGroup,
      defaultChannelId,
    }

  });
  
export const setLoggedIn = () => ({
    type: 'LOGIN_SUCCESSFUL',
    loginState: {
        loggedIn: true
    }
});

export const setUserNick = (nick = '') => ({
    type: 'SET_NICK',
    loginState: {
        nick
    }
});
  