// inboundMessages: [{
//     id: 0,
//     source: '*',
//     timestamp: '',
//     message: '',
//     appliedFont: '',
//     appliedColor: -1
// }],

export const inboundMsgAction = (
    
    //deconstruct the value passed in, and apply default values
    {
        id = 1,
        type = 'inbound',
        channelId = 0,
        source = '*',
        timestamp = Math.round((new Date()).getTime() / 1000),
        message = "Hello world!",
        appliedFont = "Inconsolata",
        appliedColor = "-1"
    } = {}

) => ({ 
    
    type: 'MESSAGE_INBOUND',
    inboundMessage: { //as the outgoing value will be applied to an arr
        id,
        type,
        channelId,
        source,
        timestamp,
        message,
        appliedFont,
        appliedColor
    }

});
