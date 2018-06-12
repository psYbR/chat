const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_USER_CHANNEL':
            return [
            ...state,
            action.channel
            ];
        case 'SELECT_USER_CHANNEL':
            return state.map((channel) => {
                if (channel.channelId === action.channelId) {
                    return {
                        ...channel,
                        isSelected: true
                    }
                } else {
                    return {
                        ...channel
                    }
                }
            })
        case 'DESELECT_USER_CHANNEL':
            return state.map((channel) => {
                if (channel.channelId === action.channelId) {
                    return {
                        ...channel,
                        isSelected: false
                    }
                } else {
                    return {
                        ...channel
                    }
                }
            })
        default:
            return state;
    }
};
