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
      isVisible: true,
      isDefault: true,
      requiresVoice: false,
      requiresRegistration: false,
      creatorId: 123456789,
      creatorNick: '*'
    };

    //send the channel object
    io.to(socket.id).emit('admin channel', outgoingChannel);

  });
};

const onCreateChannel = (socket, channel) => {
  console.log("Create channel:");
  console.log(channel);
}

module.exports = { 
  onCreateChannel,
  onRequestChannels
}