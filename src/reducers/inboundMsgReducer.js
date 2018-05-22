const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
    switch (action.type) {
        case 'MESSAGE_INBOUND':
            return [
            ...state,
            action.inboundMessage
            ];
        default:
            return state;
    }
};