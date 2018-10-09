config = require('../config');
globals = require('./globals');
io = require('./server');

//
// called when the client requests a list of the default channels they may join
//

const onRequestDefaultChannels = (socket) => { 

  globals.log("(onRequestChannels) Request for default channels from socket: " + socket.id)

  globals.defaultChannels.map((channel, i)=>{

    //we don't want to send the entire channel object, so here we set up a new one with the required values in it
    const outgoingChannel = {
      channelId: channel.channelId,
      name: channel.name,
      topic: channel.topic,
      isDefault: channel.isDefault,
      requireImage: channel.requireImage,
      requireVoice: channel.requireVoice,
      requireLogin: channel.requireLogin,
    };

    //send the channel object
    io.to(socket.id).emit('default channel', outgoingChannel);

    //if all the channels have been sent
    if (i == globals.defaultChannels.length - 1) {

      //inform the client we're finished sending channels
      io.to(socket.id).emit('default channels finished');
      globals.log("(onRequestChannels) Sent default channels to socket: " + socket.id)

    }

  });

};

//
// called when the client requests a list of the user channels they may join
//

const onRequestUserChannels = (socket) => {

  globals.log("(onRequestChannels) Request for user channels from socket: " + socket.id)

  globals.userChannels.map((channel, i)=>{

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
    if (i == userChannels.length - 1) {

      //inform the client we're finished sending channels
      io.to(socket.id).emit('user channels finished');
      globals.log("(onRequestChannels) Sent user channels to socket: " + socket.id)

    }

  });
};

const onConnect = (socket) => {
  socket.on('request user channels', () => {
    try {
      onRequestUserChannels(socket);
    } catch(err) {
      globals.log('(index) Failed to call onRequestChannels.onRequestUserChannels: "' +  err + '" for client: ' + socket.id, 2)
    }
  });
  socket.on('request default channels', () => {
    try {
      onRequestDefaultChannels(socket);
    } catch(err) {
      globals.log('(index) Failed to call onRequestChannels.onRequestDefaultChannels: "' +  err + '" for client: ' + socket.id, 2)
    }
  });
}

module.exports = {
  onConnect
}