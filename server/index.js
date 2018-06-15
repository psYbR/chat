const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public')); //specify that static content (bundle.js, images) lives in the 'public' folder
var http = require('http').Server(app);
var clone = require('lodash.clone');
var io = require('socket.io')(http, {
  pingTimeout: 90000, //ms
  pingInterval: 5000, //ms
  maxHttpBufferSize: 50000, //50kb
});
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html'); //send the index.html file
});

var config = require('./config');

//users that are currently connected
var onlineUsers = [{
  nick: "Overwatch",
  socketId: '',
  ipaddress: 'x.x.x.x'
}];

//holds users that have joined channels
var channelsJoined = [];

//TO DO: custom-made channels that should be saved/loaded from disk
var userChannels = []; 

//the business end of the stick - event handlers for the client belong in here
io.on('connection', function(socket){

  /*var ipaddress = socket.handshake.address.substr(7);
  require('dns').reverse(ipaddress, function(err, domains) {
    if (!domains) {
      console.log('connection from: ' + ipaddress);
    } else {
      console.log('connection from: ' + domains[0]);
    }
  });*/

  //when the client requests to join a channel
  socket.on('join channel', function(channelId, callback){
    let response = "success"
    //check the channel ID was valid
    if (IsNaN(channelId)) {
      response = "invalid channel ID";
    }

    //check if the ID is in the channel lists
    response = "channel not found";
    for (var i = 0; i < config.defaultChannels.length; i++) {
      if (config.defaultChannels[i].channelId == channelId) {
        response = "success";
      }
    };
    for (var i = 0; i < config.userChannels.length; i++) {
      if (config.userChannels[i].channelId == channelId) {
        response = "success";
      }
    };

    //check the permissions for the channel here

    //add the user to the channel
    if (response == "success") {
      channelsJoined.push({
        channelId: channelId,
        userId: socket.id
      })
    }
    callback(response);
  });

  //when the client requests a list of the default channels they may join
  socket.on('request default channels', function(){
    for (var i = 0; i < config.defaultChannels.length; i++) {
      io.to(socket.id).emit('default channel', config.defaultChannels[i]);
      if (i == config.defaultChannels.length - 1) {
        io.to(socket.id).emit('default channels finished');
        console.log("sent default channels to socket: " + socket.id)
      }
    };
  });

  //when the client requests a list of the user channels they may join
  socket.on('request user channels', function(){
    for (var i = 0; i < userChannels.length; i++) {
      io.to(socket.id).emit('user channel', userChannels[i]);
      if (i == userChannels.length - 1) {
        io.to(socket.id).emit('user channels finished');
        console.log("sent user channels to socket: " + socket.id)
      }
    };
  });

  //when the client requests to set their nick
  socket.on('set nick', function(nick, callback){
    let error = "success";
    if (!nick) {
      error = "no nick supplied";
    } else {
      console.log(onlineUsers);
      //check if another user has that nick already
      for (var i = 0; i < onlineUsers.length; i++) {
        if (onlineUsers[i].nick == nick) {
          error = "that nick is in use";
        }
      };
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
      //add the user to the array of online users
      onlineUsers.push({
        nick: nick,
        socketId: socket.id
        //ip address
      })
      //send a message to channels
      socket.broadcast.emit('chat message', {
        type: 'inbound', //or 'outbound'
        channelId: 1, //the channel the message was said in
        source: '*', //the nickname of the person who sent the message
        receivedTimestamp: Date.now(), //when the server distributed the message
        messageText: nick + " joined the channel"
      });
    }
    //send the response
    callback(error);
  });

  //remove eventually - sends a welcome message in channel 1 to newly joined users
  +new Date;
  io.to(socket.id).emit('chat message', {
    type: 'inbound', //or 'outbound'
    channelId: 1, //the channel the message was said in
    source: '*', //the nickname of the person who sent the message
    receivedTimestamp: Date.now(), //when the server distributed the message
    messageText: "Welcome to the channel!"
  });

  //when the client sends a chat message
  socket.on('chat message', function(msg, callback){
    let outgoing = clone(msg);
    +new Date;
    outgoing.receivedTimestamp = Date.now();
    outgoing.sentTimestamp = "";
    //grab the nickname associated with the source socket ID
    for (var i = 0; i < onlineUsers.length; i++) {
      if (onlineUsers[i].socketId == socket.id) {
        outgoing.source = onlineUsers[i].nick;
      }
    };
    callback(msg.sentTimestamp);
    socket.broadcast.emit('chat message', outgoing); //change this to send to the relevant channel users
  });

  //when the client disconnects
  socket.on('disconnect', function(reason){
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
http.listen(3000, function(){
  console.log('listening on *:3000');
});