export const addMessage = (

    {
        //messageId = 0, //message ID should be assigned by the server, or is the timestamp adequate?
        type = 'inbound', //or 'outbound'
        channelId = 0, //the channel the message was said in
        source = '', //the nickname of the person who sent the message
        timestamp = Math.round((new Date()).getTime() / 1000),
        messageText = "",
        appliedFont = "Source Sans Pro", //uses the UI default, or the user's chosen override
        appliedColor = "default", //uses the UI default, or the user's chosen override
        messageSent = false
    } = {}

) => ({ 
    
    type: 'ADD_MESSAGE',
    message: { //as the outgoing value will be applied to an array
        //messageId,
        type,
        channelId,
        source,
        timestamp,
        messageText,
        appliedFont,
        appliedColor,
        messageSent
    }

});
