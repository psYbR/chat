require('./globals');
var io = require('./server');

//
// sends a message (parameter 2) to a channel (parameter 1), excluding the sender if their socket is also supplied (parameter 3)
//

const sendSystemMessage = (channelId, messageText, socketIdToExclude = false) => {

  //create the message object to send
  +new Date;
  const message = {
    type: 'inbound',
    channelId: channelId,
    source: '*',
    receivedTimestamp: Date.now(),
    messageText: messageText
  }

  //filter users to only people in the target channel
  const usersInThisChannel = globals.usersInChannels.filter(record => (
    record.channelId == channelId
  ));

  //check there are users in the channel
  if (usersInThisChannel) {

    //send the message only to those users
    usersInThisChannel.map((user)=>{

      //exclude the sender if one was specified
      if (user.socketId != socketIdToExclude) {

        //send the message
        io.to(user.socketId).emit('chat message', message);

      }
      
    })
  }
};

module.exports = sendSystemMessage;