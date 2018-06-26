const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_LOGIN_STATE':
      return action.loginState;
    case 'SET_LOGGED_IN':
      return {
        ...state,
        loggedIn: true 
      };
    case 'SET_NICK':
      return {
        ...state,
        nick: action.nick  
      };
    default:
      return state;
  }
};