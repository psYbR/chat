const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_LOGIN_STATE':
      return action.loginState;
    case 'UNSET_USERNAME_IS_VALID_EMAIL':
      return {
        ...state,
        usernameIsValidEmail: false 
      };
    case 'UNSET_USERNAME_IS_VALID_NICK':
      return {
        ...state,
        usernameIsValidNick: false 
      };
    case 'SET_USERNAME_IS_VALID_EMAIL':
      return {
        ...state,
        usernameIsValidEmail: true 
      };
    case 'SET_USERNAME_IS_VALID_NICK':
      return {
        ...state,
        usernameIsValidNick: true 
      };
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.username  
      };
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