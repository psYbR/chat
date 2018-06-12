const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_DEFAULT_CHANNEL':
            return [
            ...state,
            action.channel
            ];
        case 'RESET_DEFAULT_CHANNEL_SELECTIONS':
            return state.map((channel) => {
                return {
                    ...channel,
                    isSelected: false
                }
            })
        case 'SELECT_DEFAULT_CHANNEL':
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
        case 'DESELECT_DEFAULT_CHANNEL':
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
