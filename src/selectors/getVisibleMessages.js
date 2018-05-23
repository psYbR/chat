
//sort comparitor - sort by timestamp
const compare = (a,b) => {
  if (a.timestamp < b.timestamp)
    return -1;
  if (a.timestamp > b.timestamp)
    return 1;
  return 0;
}

//gets the messages currently visible to the user based on context. ie. current channel, current PM, etc
export default ( { inboundMessages, outboundMessages, activeChannel, configuration } ) => {

  //filter inbound messages by channel ID
  let filterIn = inboundMessages.filter(inboundMessage => inboundMessage.channelId == activeChannel.id);

  //perform transform on the object
  filterIn = filterIn.map((message) => {
    
    return message;
  });

  //filter outbound messages by channel ID
  let filterOut = outboundMessages.filter(outboundMessage => outboundMessage.channelId == activeChannel.id);

  //perform transform on the object
  filterOut = filterOut.map((message) => {
    message.source = configuration.username;
    return message;
  });

  //join the arrays together
  const concatMsg = filterIn.concat(filterOut);

  //console.log(concatMsg.sort(compare));

  //sort by timestamp and return
  return concatMsg.sort(compare);

};