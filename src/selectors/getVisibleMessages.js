//sort comparitor - sort by timestamp
const compare = (a,b) => {
  if (a.timestamp < b.timestamp)
    return -1;
  if (a.timestamp > b.timestamp)
    return 1;
  return 0;
}

//gets the messages currently visible to the user based on context. ie. current channel, current PM, etc
export default ( { messages, userInterface, loginState, configuration, channels } ) => {

  let channelJoined = false;

  //prevent messages in the channel from being displayed if the channel isn't joined
  channels.filter((channel) => {
    if(channel.channelId == userInterface.activeChannelId && channel.isJoined)
    { channelJoined = true; }
  })

  //filter inbound messages by the current channel ID and whether they originate from System or not
  let filtered;
  if (configuration.showSystemMessages) {
    filtered = messages.filter(message => message.channelId == userInterface.activeChannelId);
  } else {
    filtered = messages.filter(message => message.channelId == userInterface.activeChannelId && message.source != '*'); //filter messages from System
  }
  
  //set the current user's nickname on outbound messages
  filtered = filtered.map((message) => {
    if (message.type == 'outbound') {
      message.source = loginState.username;
    }
    return message;
  });

  // if (channelJoined) {
  //   //sort by timestamp and return
  return filtered.sort(compare);
  // } else {
  //   //if the channel isn't joined yet, only show a default system message in that channel
  //   return [{ type: 'inbound', channelId: userInterface.activeChannelId, timestamp:  0, source: '*', messageText: "Trying to join channel...", messageSent: false }];
  // }


};