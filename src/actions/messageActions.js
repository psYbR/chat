import { getNowTimestamp } from '../utils/dateUtils';

export const addMessage = (
  {
    type = 'inbound', //or 'outbound'
    channelId = 0, //the channel the message was said in
    source = '', //the nickname of the person who sent the message
    receivedTimestamp = getNowTimestamp(), //when the server distributed the message
    messageText = "",
    appliedFont = "Source Sans Pro", //uses the UI default, or the user's chosen override
    appliedColor = "default", //uses the UI default, or the user's chosen override
    messageSent = false, //if the message was sent to the server yet or not
    sentTimestamp = getNowTimestamp() //when the message was sent to the server (save it a second time because the server will apply a different timestamp)
  } = {}
) => ({
  type: 'ADD_MESSAGE',
  message: { //as the outgoing value will be applied to an array
    type,
    channelId,
    source,
    receivedTimestamp,
    messageText,
    appliedFont,
    appliedColor,
    messageSent,
    sentTimestamp
  }
});

export const setMessageSent = (sentTimestamp, response) => ({
  type: 'SET_MESSAGE_SENT',
  response,
  sentTimestamp
});
