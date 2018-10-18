//
// the express server and socket.io library are imported and set up here
//

const config = require('../config');
const express = require('express');
const app = express();

//the helmet library configures the express server in a secure way
var helmet = require('helmet')
app.use(helmet())

//set the directory for static content (eg.: bundle.js, images) 
app.use(express.static(config.rootDirectory + '/public'));

//add the handler for the domain root /
app.get('/', function(req, res){
  res.sendFile(config.rootDirectory + '/index.html');
});

//create the HTTP request handler
var http = require('http').Server(app);

//attach socket.io to the HTTP handler
var io = require('socket.io')(http, {
  pingTimeout: config.pingTimeout,
  pingInterval: config.pingInterval,
  maxHttpBufferSize: config.maxHttpBufferSize,
});

//set the handler to listen on port 3000.
// NOTE: blazebox is set up with nginx as a reverse proxy to listen on port 80 / 443 and forward connections
// therefore this does not need to be changed for production
http.listen(3000, () => {  // do some neat ASCII ;)
  // console.log("")
  // console.log("> Initializing BlazeChat.......")
  // console.log("")
  // console.log("__________ .__                                   .__               __   ")
  // console.log("\\______   \\|  |  _____   ________  ____    ____  |  |__  _____   _/  |_ ")
  // console.log(" |    |  _/|  |  \\__  \\  \\___   /_/ <> \\ _/ ___\\ |  |  \\ \\__  \\  \\   __\\")
  // console.log(" |    |   \\|  |__ / <> \\_ /  __/ \\  ___/ \\  \\___ |   \\  \\ / <> \\_ |  |  ")
  // console.log(" |______  /|____/(____  //_____ \\ \\___  \\ \\___  ||___|__/(______/ |__|  ")
  // console.log("        \\/            \\/       \\/     \\/      \\/   (C) BlazeChat 2018")
  // console.log("")
  console.log("> blazechat running!")
  // console.log("")
});

module.exports = io;