
//sort comparitor - sort by timestamp
const compare = (a,b) => {
  if (a.timestamp < b.timestamp)
    return -1;
  if (a.timestamp > b.timestamp)
    return 1;
  return 0;
}

//gets the messages currently visible to the user based on context. ie. current channel, current PM, etc
export default ( { messages, userInterface, loginState } ) => {

  //console.log(messages);
  //filter inbound messages by channel ID
  let filtered = messages.filter(message => message.channelId == userInterface.activeChannelId);

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