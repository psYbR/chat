utils = require('./utils');
globals = require('./globals');
config = require('../config');
io = require('./server');

const onRequestChannels = (socket) => {
  config.defaultChannels.map((channel, i)=>{

    //we don't want to send the entire channel object, so here we set up a new one with the required values in it
    const outgoingChannel = {
      channelId: channel.channelId,
      channelName: channel.channelName,
      topic: channel.topic,
      isDefault: true
    };

    //send the channel object
    io.to(socket.id).emit('admin channel', outgoingChannel);

  });
};

module.exports = { 
  onRequestChannels
}