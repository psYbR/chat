const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_LOGIN_STATE':
      return action.loginState;
    case 'LOGIN_SUCCESSFUL':
      return {
        ...state,
        loggedIn: action.loginState.loggedIn  
      };
    case 'SET_NICK':
      return {
        ...state,
        nick: action.loginState.nick  
      };
    default:
      return state;
  }
};