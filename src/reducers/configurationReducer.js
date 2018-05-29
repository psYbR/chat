const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_CONFIGURATION':
      return action.configuration;
    default:
      return state;
  }
};