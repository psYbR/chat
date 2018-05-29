const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return [
            ...state,
            action.inboundMessage
            ];
        default:
            return state;
    }
};