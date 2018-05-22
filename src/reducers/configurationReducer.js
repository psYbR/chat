const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_CONFIG':
            return action.configuration;
        default:
            return state;
    }
};