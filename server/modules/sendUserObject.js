const utils = require('./utils');
var io = require('./server');

//
// sends a user object to a user
//

//
// parameter 1: destination (the user to send the object to),
// parameter 2: user (the user object to send),
// parameter 3: the channel ID to include on the object
//

const sendUserObject = (destinationSocketID, userSocketID, channelId) => {

  let outgoingUser = {
    userId: userSocketID,
    isAway: false, //lol
    isBlocked: false, //lol
    isCurrentUser: false,
    group: 'user' //lol
  };

  outgoingUser.nick = utils.socketToNick(userSocketID);

  //if the requesting user is themself
  if (destinationSocketID == userSocketID) {
    outgoingUser.isCurrentUser = true;
  }

  console.log("(sendUserObject) Sending user: ");
  console.log(outgoingUser);
  console.log("(sendUserObject) ... in channel: " + channelId)

  //send the user item to the client
  io.to(destinationSocketID).emit('user', { user: outgoingUser, channel: channelId} );

}

module.exports = sendUserObject;