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
                    if (action.response == "success") {
                        return {
                            ...message,
                            messageSent: true
                        }
                    } else {
                        return {
                            ...message,
                            messageText: "^4[Message not sent: " + action.response + "] ^0" + message.messageText, //add an error in red to the start of the message
                            appliedFont: "Source Sans Pro", //and override the formatting so it doesn't look silly
                            appliedColor: "default",
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