const express = require('express');
const app = express();
var config = require('./config');
app.use(express.static(__dirname + '/public')); //specify that static content (bundle.js, images) lives in the 'public' folder
var http = require('http').Server(app);
var clone = require('lodash.clone');
var io = require('socket.io')(http, {
  pingTimeout: config.pingTimeout,
  pingInterval: config.pingInterval,
  maxHttpBufferSize: config.maxHttpBufferSize,
});
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html'); //send the index.html file
});

//contains users that are currently connected
var onlineUsers = [];
//contains which channels users have joined
var usersInChannels = [];
//contains user-created channels
var userChannels = []; //TO DO: save/load userChannels from disk

//the business end of the stick - event handlers for the client belong in here
io.on('connection', (socket) => {

  //get the user's IP address
  /*var ipaddress = socket.handshake.address.substr(7);
  require('dns').reverse(ipaddress, function(err, domains) {
    if (!domains) {
      console.log('connection from: ' + ipaddress);
    } else {
      console.log('connection from: ' + domains[0]);
    }
  });*/

  //when the client requests to join a channel
  socket.on('join channel', (channelId, callback) => {
    console.log("Request to join channel '" + channelId + "' from socket: " + socket.id);
    let response = "success"
    //check the channel ID was valid
    if (isNaN(channelId)) {
      response = "invalid channel ID";
    }
    //check if the ID is in the channel lists
    response = "channel not found";
    for (var i = 0; i < config.defaultChannels.length; i++) {
      if (config.defaultChannels[i].channelId == channelId) {
        response = "success";
      }
    };
    for (var i = 0; i < userChannels.length; i++) {
      if (userChannels[i].channelId == channelId) {
        response = "success";
      }
    };

    //check the permissions for the channel here

    //check if the user is already in the channel
    usersInChannels.map((channel)=>{
      if (channel.channelId == channelId && channel.socketId == socket.id) {
        response = "already in channel";
      }
    });
    //add the user to the channel
    if (response == "success") {
      usersInChannels.push({
        channelId: channelId,
        socketId: socket.id
      })
    }
    callback({ response, channelId });
  });

  //when the client requests a list of the default channels they may join
  socket.on('request default channels', () => {
    console.log("Request for default channels from socket: " + socket.id)
    for (var i = 0; i < config.defaultChannels.length; i++) {
      io.to(socket.id).emit('default channel', config.defaultChannels[i]);
      if (i == config.defaultChannels.length - 1) {
        io.to(socket.id).emit('default channels finished');
        console.log("Sent default channels to socket: " + socket.id)
      }
    };
  });

  //when the client requests a list of the user channels they may join
  socket.on('request user channels', () => {
    console.log("Request for user channels from socket: " + socket.id)
    for (var i = 0; i < userChannels.length; i++) {
      io.to(socket.id).emit('user channel', userChannels[i]);
      if (i == userChannels.length - 1) {
        io.to(socket.id).emit('user channels finished');
        console.log("sent user channels to socket: " + socket.id)
      }
    };
  });

  //when the client requests to set their nick
  socket.on('set nick', (nick, callback) => {
    console.log("Request to set nick '" + nick + "' from socket: " + socket.id)
    let error = "success";
    if (!nick) {
      error = "no nick supplied";
    } else {
      //check if another user has that nick already
      onlineUsers.map((user)=>{
        if (user.nick == nick) {
          error = "that nick is in use";
        }
      })
      //check the length of the nick
      if (nick.length > config.nickMaxLength) {
        error = "nick was too long";
      }
      if (nick.length < config.nickMinLength) {
        error = "nick was too short";
      }
    }
    //if there was no error
    if (error == "success") {
      console.log("Nick '" + nick + "' accepted for socket: " + socket.id)
      //check if the user is changing their nick (ie. they already have a nick) drop them from the array first
      let wasExistingUser = false;
      let existingNick = '';
      for (var i = 0; i < onlineUsers.length; i++) {
        if (onlineUsers[i].socketId == socket.id) {
          console.log('User "' + onlineUsers[i].nick + '" changed their nick to "' + nick + '".');
          wasExistingUser = true;
          existingNick = onlineUsers[i].nick;
          onlineUsers.splice(i,1);
        }
      }; 
      //add the user to the array of online users
      onlineUsers.push({
        nick: nick,
        socketId: socket.id
      })
      //set the text of the message that will get sent to the user's channels
      let messageText = nick + " joined the channel";
      if (wasExistingUser) {
        messageText = existingNick + ' changed their nick to ' + nick;
      }
      //get the channels this user is in
      const channelsToInform = usersInChannels.filter(user => (
        user.socketId == socket.id
      ));
      //send the message only to those users
      channelsToInform.map((channel)=>{
        //create the message object
        const message = {
          type: 'inbound',
          channelId: channel.channelId,
          source: '*',
          receivedTimestamp: Date.now(),
          messageText: messageText
        };
        //exclude the sender
        if (channel.socketId != socket.id) {
          io.to(user.socketId).emit('chat message', message);
        }
      })
    }
    //send the response
    callback(error);
  });

  //when the client sends a chat message
  socket.on('chat message', (msg, callback) => {
    //clone the incoming message object
    let outgoing = clone(msg); //this is so that we can mutate the object before sending without changing the original, which we need to reference
    let response = "nick not found";
    +new Date;
    outgoing.receivedTimestamp = Date.now();
    outgoing.sentTimestamp = "";
    //grab the nickname associated with the source socket ID and add it to the outgoing message (and also verify the user exists)
    onlineUsers.map((user) => {
      if (user.socketId == socket.id) {
        outgoing.source = user.nick;
        response = "success"
      }
    });
    //check the length of the message doesn't exceed the limit
    if (outgoing.messageText && outgoing.messageText.length > config.messageMaxLength) {
      response = "message exceeded maximum length";
    }
    //check the user is actually in the channel they're trying to send a message to
    const checkUser = usersInChannels.filter(user => (
      user.channelId == outgoing.channelId && user.socketId == socket.id
    ));
    if (checkUser.length < 1) {
      response = "user not found in target channel";
    }

    //check channel message permissions here

    //send the response
    const timestamp = msg.sentTimestamp;
    callback({ timestamp, response });
    //if there were no errors
    if (response == "success") {
      console.log("'" + outgoing.source + "' said: '" + outgoing.messageText + "'");
      //filter users to only people in the target channel
      const usersInChannel = usersInChannels.filter(user => (
        user.channelId == outgoing.channelId
      ));
      //send the message only to those users
      usersInChannel.map((user)=>{
        //exclude the sender
        if (user.socketId != socket.id) {
          io.to(user.socketId).emit('chat message', outgoing);
        }
      })
    }
  });

  //when the client disconnects
  socket.on('disconnect', (reason) => {
    //remove the user from the users array and send a notification to channels
    for (var i = 0; i < onlineUsers.length; i++) {
      if (onlineUsers[i].socketId == socket.id) {
        io.emit('chat message', {
          type: 'inbound', //or 'outbound'
          channelId: 1, //the channel the message was said in
          source: '*', //the nickname of the person who sent the message
          receivedTimestamp: Date.now(), //when the server distributed the message
          messageText: onlineUsers[i].nick + " left the channel (" + (reason == "transport close" ? "connection closed" : reason) + ")"
        });
        console.log('User "' + onlineUsers[i].nick + '" disconnected: ' + reason);
        onlineUsers.splice(i,1);
      }
    };    
  });

});

//listen on port 3000.
//NOTE: blazebox is set up to map port 80 to 3000 so this doesn't need to be changed for production
http.listen(3000, () => {
  console.log('listening on *:3000');
});