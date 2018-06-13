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

//send the index.html file
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//the business end of the stick
io.on('connection', function(socket){

  socket.on('chat message', function(msg, callback){
    let outgoing = clone(msg);
    +new Date;
    outgoing.receivedTimestamp = Date.now();
    outgoing.sentTimestamp = "";
    //outgoing.source = socket.id;
    callback(msg.sentTimestamp);
    socket.broadcast.emit('chat message', outgoing); //change this to send to the relevant channel users
  });

  socket.on('disconnect', function(reason){
    console.log('user disconnected: ' + reason);
    io.emit('chat message', "A user left: " + reason);
  });
  
  socket.on('ping', function () {
    console.log("Ping received from " + socket.id);
    socket.emit('pong');
  });

});

//listen on port 3000.
//NOTE: blazebox is set up to map port 80 to 3000 so this doesn't need to be changed for production
http.listen(3000, function(){
  console.log('listening on *:3000');
});