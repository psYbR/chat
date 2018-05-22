const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_CHANNEL':
            return action.activeChannel
        default:
            return state;
    }
};