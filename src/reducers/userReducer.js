const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [
        ...state,
        action.user
      ];
    case 'SET_SELECTED_USER':
      return state.map((user) => {
        if (user.userId === action.userId) {
          return {
            ...user,
            isSelected: true
          }
        } else {
          return {
            ...user,
            isSelected: false //return false here because we only want one user to be selected at any time
          }
        }
      })
    default:
      return state;
  }
};