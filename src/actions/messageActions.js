export const addMessage = (

    {
        messageId = 0, //message ID should be assigned by the server, or is the timestamp adequate?
        type = 'inbound', //or 'outbound'
        channelId = 0,
        source = '*', 
        timestamp = Math.round((new Date()).getTime() / 1000),
        messageText = "",
        appliedFont = "default", //'default' uses the UI default, or the user's chosen override
        appliedColor = "-1" //-1 uses the UI default, or the user's chosen override
    } = {}

) => ({ 
    
    type: 'ADD_MESSAGE',
    message: { //as the outgoing value will be applied to an array
        messageId,
        type,
        channelId,
        source,
        timestamp,
        messageText,
        appliedFont,
        appliedColor
    }

});
