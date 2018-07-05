import { systemNick } from '../config';
import getCurrentChannel from '../utils/getCurrentChannel';

//sort comparitor - sort by timestamp
const compare = (a,b) => {
  if (a.receivedTimestamp < b.receivedTimestamp)
    return -1;
  if (a.receivedTimestamp > b.receivedTimestamp)
    return 1;
  return 0;
}

//gets the messages currently visible to the user based on context. ie. current channel, current PM, etc
export default (state) => {

  //get the current channel ID or leave it as 0
  let curChannelId = getCurrentChannel();

  //filter inbound messages by the current channel ID and whether they originate from System or not
  let messagesToDisplay;
  if (state.configuration.showSystemMessages) {
    messagesToDisplay = state.messages.filter(message => message.channelId == curChannelId);
  } else {
    messagesToDisplay = state.messages.filter(message => message.channelId == curChannelId && message.source != systemNick); //filter messages from System
  }
  
  //set the current user's nickname on outbound messages
  messagesToDisplay = messagesToDisplay.map((message) => {
    if (message.type == 'outbound') {
      message.source = state.loginState.nick;
    }
    return message;
  });

  return messagesToDisplay.sort(compare);

};