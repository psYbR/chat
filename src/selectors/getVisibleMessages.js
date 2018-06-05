
//sort comparitor - sort by timestamp
const compare = (a,b) => {
  if (a.timestamp < b.timestamp)
    return -1;
  if (a.timestamp > b.timestamp)
    return 1;
  return 0;
}

//gets the messages currently visible to the user based on context. ie. current channel, current PM, etc
export default ( { messages, userInterface, loginState, configuration } ) => {

  //filter inbound messages by channel ID and whether they originate from System or not
  let filtered;
  if (configuration.showSystemMessages) {
    filtered = messages.filter(message => message.channelId == userInterface.activeChannelId);
  } else {
    filtered = messages.filter(message => message.channelId == userInterface.activeChannelId && message.source != '*'); //filter messages from System
  }
  

  //perform transform on the object
  filtered = filtered.map((message) => {
    if (message.type == 'outbound') {
      message.source = loginState.username;
    }
    return message;
  });

  //sort by timestamp and return
  return filtered.sort(compare);

};