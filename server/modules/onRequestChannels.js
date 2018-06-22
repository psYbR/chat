const config = require('../config');
const utils = require('./utils');
var io = require('./server');

//
// called when the client requests a list of the default channels they may join
//

const defaultChannels = (socket) => {

  console.log("Request for default channels from socket: " + socket.id)

  config.defaultChannels.map((channel, i)=>{

    //we don't want to send the entire channel object, so here we set up a new one with the required values in it
    const outgoingChannel = {
      channelId: channel.channelId,
      channelName: channel.channelName,
      topic: channel.topic,
      isSelected: channel.isSelected
    };

    //send the channel object
    io.to(socket.id).emit('default channel', outgoingChannel);

    //if all the channels have been sent
    if (i == config.defaultChannels.length - 1) {

      //inform the client we're finished sending channels
      io.to(socket.id).emit('default channels finished');
      console.log("Sent default channels to socket: " + socket.id)

    }

  });

};

//
// called when the client requests a list of the user channels they may join
//

const userChannels = (socket) => {

  console.log("Request for user channels from socket: " + socket.id)

  utils.userChannels.map((channel, i)=>{

    //we don't want to send the entire channel object, so here we set up a new one with the required values in it
    const outgoingChannel = {
      channelId: channel.channelId,
      channelName: channel.channelName,
      topic: channel.topic,
      isSelected: channel.isSelected
    };

    //check the channel is publicly listed
    if (channel.isVisible) {

      //send the channel object
      io.to(socket.id).emit('user channel', outgoingChannel);

    }

    //if all the channels have been sent
    if (i == utils.userChannels.length - 1) {

      //inform the client we're finished sending channels
      io.to(socket.id).emit('user channels finished');
      console.log("sent user channels to socket: " + socket.id)

    }

  });
};

module.exports = {
  defaultChannels: defaultChannels,
  userChannels: userChannels
}