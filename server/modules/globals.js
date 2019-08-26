config = require('../config')

let databaseConnected = false

//stores active sessions
let sessions = []

//contains a list of users that are currently connected
let onlineUsers = []

const checkIfNickIsInUse = (nick) => {
  return onlineUsers.filter(user=>user.nick == nick).length > 0
}

const addToOnlineUsers = (socketId, nick) => {
  if (globals.onlineUsers.filter(user=>user.socketId == socketId).length < 1) {
    globals.onlineUsers.push({socketId, nick})
  } else {
    console.log("(globals - addToOnlineUsers) didn't add user:" + socketId, nick)
  }
}


//contains a list of which channels online users have joined
let usersInChannels = []

//contains user-created channels
let channels = []

//contains chat message timestamps from users (used to track message frequency for anti-flood)
let userMessages = []

const log = (message, logImportance = 1) => {
  if (logImportance >= config.logLevel) {
    console.log(message)
  }
}

//returns friendly date string from a timestamp eg. '2018-06-24 10:37:21'
const getSQLDate = (timestamp) => {
  var a = new Date(timestamp)
  var year = a.getFullYear()
  var month = (a.getMonth() + 1)  < 10 ? '0' + (a.getMonth() + 1) : (a.getMonth() + 1)
  var date = a.getDate() < 10 ? '0' + a.getDate() : a.getDate()
  var hour = a.getHours()
  var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes()
  var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds()
  var time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec
  return time
}

module.exports = {
  sessions,
  userMessages,
  log,
  onlineUsers,
  usersInChannels,
  channels,
  checkIfNickIsInUse,
  getSQLDate,
  addToOnlineUsers,
  databaseConnected
}