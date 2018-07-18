const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_ADMIN_CHANNEL':
      return [
        ...state,
        action.channel
      ];
    default:
      return state;
  }
};
