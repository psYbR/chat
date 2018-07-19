const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_ADMIN_CHANNEL':
      return [
        ...state,
        action.channel
      ];
    case 'REMOVE_ADMIN_CHANNELS':
      return reducerDefaultState;
    default:
      return state;
  }
};
