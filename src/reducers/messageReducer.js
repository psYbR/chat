const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return [
            ...state,
            action.message
            ];
        case 'SET_MESSAGE_SENT':
            return state.map((message) => {
                if (message.sentTimestamp === action.sentTimestamp) {
                    return {
                        ...message,
                        messageSent: true
                    }
                } else {
                    return {
                        ...message
                    }
                }
            })
        default:
            return state;
    }
};