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
                    if (action.status == "success") {
                        return {
                            ...message,
                            messageSent: true
                        }
                    } else {
                        return {
                            ...message,
                            messageText: "^4[Message not sent: " + action.status + "] ^0" + message.messageText, //add an error in red to the start of the message
                            messageSent: true
                        }
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