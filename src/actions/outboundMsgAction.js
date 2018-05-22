// outboundMessages: [{
//     id: 0,
//     timstamp: '',
//     message: '',
//     appliedFont: '',
//     appliedColor: -1
//   }],

export const outboundMsgAction = (
    
  //deconstruct the value passed in, and apply default values
  {
      id = 1,
      type = 'outbound',
      channelId = 0,
      timestamp = Math.round((new Date()).getTime() / 1000),
      message = "Hello world!",
      appliedFont = "Inconsolata",
      appliedColor = "-1"
  } = {}

) => ({ 
  
  type: 'MESSAGE_OUTBOUND',
  outboundMessage: { //as the outgoing value will be applied to an arr
      id,
      type,
      channelId,
      timestamp,
      message,
      appliedFont,
      appliedColor
  }

});