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

var onlineUsers = [{
  nick: "Overwatch",
  socketId: '',
  ipaddress: 'x.x.x.x'
}];

//TO DO: should be saved/loaded from disk
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
    for (var i = 0; i < onlineUsers.length; i++) {
      if (onlineUsers[i].nick == nick) {
        error = "that nick is in use";
      }
    };
    if (nick.length > config.nickMaxLength) {
      error = "nick was too long";
    }
    if (nick.length < config.nickMinLength) {
      error = "nick was too short";
    }
    if (error == "success") {
      users.push({
        nick: nick,
        socketId: socket.id
      })
    }
    callback(error);
  });

  //remove eventually - sends a welcome message in channel 1 to newly joined users
  +new Date;
  io.to(socket.id).emit('chat message', {
    type: 'inbound', //or 'outbound'
    channelId: 1, //the channel the message was said in
    source: '*', //the nickname of the person who sent the message
    receivedTimestamp: Date.now(), //when the server distributed the message
    messageText: "Welcome to the server"
  });

  //when the client sends a chat message
  socket.on('chat message', function(msg, callback){
    let outgoing = clone(msg);
    +new Date;
    outgoing.receivedTimestamp = Date.now();
    outgoing.sentTimestamp = "";
    //outgoing.source = socket.id; //the username needs to be grabbed by matching the socket id to the user array
    callback(msg.sentTimestamp);
    socket.broadcast.emit('chat message', outgoing); //change this to send to the relevant channel users
  });

  //when the client disconnects
  socket.on('disconnect', function(reason){
    console.log('User disconnected: ' + reason);
    io.emit('chat message', {
      type: 'inbound', //or 'outbound'
      channelId: 1, //the channel the message was said in
      source: '*', //the nickname of the person who sent the message
      receivedTimestamp: Date.now(), //when the server distributed the message
      messageText: "user left the channel (" + (reason == "transport close" ? "connection closed" : reason) + ")"
    });
  });

});

//listen on port 3000.
//NOTE: blazebox is set up to map port 80 to 3000 so this doesn't need to be changed for production
http.listen(3000, function(){
  console.log('listening on *:3000');
});