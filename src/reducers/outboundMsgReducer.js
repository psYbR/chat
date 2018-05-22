const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
    switch (action.type) {
        case 'MESSAGE_OUTBOUND':
            return [
            ...state,
            action.outboundMessage
            ];
        default:
            return state;
    }
};