export const setLoginState = (
  {
    loggedIn = false,
    nick = ''
  } = {}
) => ({
  type: 'SET_LOGIN_STATE',
  loginState: {
    loggedIn,
    nick
  }
});
  
export const setLoggedIn = () => ({
  type: 'SET_LOGGED_IN'
});
export const setNick = (nick) => ({
  type: 'SET_NICK',
  nick
});
  