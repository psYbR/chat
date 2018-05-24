const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_CONFIG':
      return action.configuration;
    case 'SET_TYPING_MESSAGE':
      return {
        ...state,
        typingMessage: action.configuration.typingMessage
      };
    default:
      return state;
  }
};