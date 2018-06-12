
export const addDefaultChannel = (    
        {
            channelId = 0,
            channelName = '',
            topic = '',
            isSelected = false
        } = {}

    ) => ({ 

    type: 'ADD_DEFAULT_CHANNEL',
    channel: {
        channelId,
        channelName,
        topic,
        isSelected
    }
});

export const selectDefaultChannel = (channelId) => ({ 
    type: 'SELECT_DEFAULT_CHANNEL',
    channelId
    });

export const deselectDefaultChannel = (channelId) => ({ 
    type: 'DESELECT_DEFAULT_CHANNEL',
    channelId
    });
    
export const resetDefaultChannelSelections = () => ({ 
    type: 'RESET_DEFAULT_CHANNEL_SELECTIONS'
    });
        
