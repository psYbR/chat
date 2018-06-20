import io from 'socket.io-client';
export const socket = io();
import { maxTimestamp, maxMessageLength, minNickLength, maxNickLength } from '../config';
import { store } from '../stores/store';
import {
  addMessage,
  setMessageSent,
  addDefaultChannel,
  setConnected,
  setDisconnected,
  setDisconnectionReason,
  setDefaultChannelsReceived,
  updatePing,
  unblurApp,
  setLoggedIn,
  setJoinDefaultChannels,
  stopWaitForNickAcceptance,
  startWaitForNickAcceptance,
  setNickSetFailedReason,
  joinChannel,
  setCurrentChannel,
  setActiveChannel,
  addUser,
  removeUser,
  setAllChannelsWasJoined,
  flushUserList
} from '../actions/actions';
import { getNowTimestamp } from '../utils/utils';

//send request to join a channel
export const requestJoinChannel = (channelId) => {
  
  //check ID is a number
  if (isNaN(channelId)) {
    //tell the UI joining the channel failed
    console.log("requesting to join channel ID failed: not a valid ID");
    store.dispatch(addMessage({source: "*", channelId: channelId, messageSent: true, receivedTimestamp: getNowTimestamp(), messageText: "Could not join channel: invalid ID" }));
  }
  //if there was no error
  else {
    console.log("requesting to join channel ID: " + channelId);
    socket.emit('join channel', channelId, ({ response, channelId }) => { //send the nick to the server
      //handle the response (a string; either "success" or the reason the channel wasn't joined eg. in use)
      if (response == "success") {
        console.log("request to join channel ID " + channelId + " succeeded!");
        store.dispatch(joinChannel(channelId)); //set the UI to show the channel as joined
        store.dispatch(setCurrentChannel(channelId));
        store.dispatch(setActiveChannel(channelId));
        getUserList();
      } else if (response == "already in channel") {
        console.log("no need to join channel ID " + channelId + " - already there!");
        store.dispatch(joinChannel(channelId)); //set the UI to show the channel as joined
        store.dispatch(setCurrentChannel(channelId));
        store.dispatch(setActiveChannel(channelId));
        getUserList();
      } else {
        console.log("request to join channel ID " + channelId + " failed: " + response);
        //show an error
        store.dispatch(addMessage({source: "*", channelId: channelId, messageSent: true, receivedTimestamp: getNowTimestamp(), messageText: "Could not join channel: " + response }));
      }      
    });
  }
}

//send chat messages to the server and handle the response on success or failure
export const sendMessage = (outboundMsg) => {
  if (outboundMsg.channelId == store.getState().userInterface.activeChannelId) {
    $('.chatMessageContainer').stop().animate({
      scrollTop: $('.chatMessageContainer')[0].scrollHeight
    }, 800);
  }
  let wasError = false;
  let errorMsg = '';
  //sanity check the timestamp
  if (isNaN(outboundMsg.sentTimestamp) || outboundMsg.sentTimestamp < 1528932507000 || outboundMsg.sentTimestamp > maxTimestamp) {
    wasError = true;
    errorMsg = 'malformed timestamp';
  };
  //sanity check the message length
  if (outboundMsg.messageText.length > maxMessageLength || outboundMsg.messageText.length < 1) {
    wasError = true;
    errorMsg = 'length out of bounds';
  }
  //if there was an error
  if (wasError) {
    store.dispatch(setMessageSent(outboundMsg.sentTimestamp, errorMsg)); //display the message in the client but show a not-sent error on it
  }
  //if there wasn't an error, send the message
  else {
    socket.emit('chat message', outboundMsg, ({ timestamp, response }) => {
      // handle the response
      if (response == "success") {
        console.log("Message " + timestamp + " sent successfully!");
        store.dispatch(setMessageSent(timestamp, "success"));
      } else {
        console.log("Message " + timestamp + " not sent: " + response);
        store.dispatch(setMessageSent(timestamp, response));
      }
    });
  }
}

//send the request to set the user's nickname, and handle the response on success or failure
export const setNick = (nick) => {
  let wasError = false;
  let errorMsg = '';
  //sanity check the nick length
  if (nick.length > maxNickLength || nick.length < minNickLength) { 
    wasError = true;
    errorMsg = 'nick was either too long or too short';
  }
  //if there was an error
  if (wasError) {
    console.log("setting nick failed: " + errorMsg);
    store.dispatch(nickSetFailed(errorMsg)); //tell the UI setting of the nick failed
  }
  //if there was no error
  else {
    socket.emit('set nick', nick, (response) => { //send the nick to the server
      //handle the response (a string; either "success" or the reason the nick wasn't accepted eg. in use)
      if (response == "success") {
        console.log("setting nick succeeded!");
        store.dispatch(unblurApp());
        store.dispatch(setLoggedIn());
        store.dispatch(setJoinDefaultChannels()); //trigger the joining of any of the default channels they selected
        store.dispatch(stopWaitForNickAcceptance());
        store.dispatch(setNickSetFailedReason('')); //update the UI and set the nick
      } else {
        console.log("setting nick failed: " + response);
        store.dispatch(stopWaitForNickAcceptance());
        store.dispatch(setNickSetFailedReason(response)); //tell the UI that setting the nick failed
      }      
    });
  }
}

//requests a list of users for the current channel
export const getUserList = () => {
  //check the user is in a channel before sending a server request
  if (store.getState().channels.filter(channel => channel.isJoined).length > 0) {
    //get the ID of the current channel
    const currentChannelId = store.getState().userInterface.activeChannelId;
    //send the request to the server
    socket.emit('get user list', currentChannelId, (response) => {
      //handle the response
      if (response == "success") {
        console.log("user list request accepted");
      } else {
        console.log("user list request failed: " + response);
      }
    });
  } else {
    console.log("Skipping user channel request, no channels joined.");
  }
}

//handle receiving a single user
socket.on('remove user', (userId) => {
  if (userId) {
    console.log("Remove user request received: " + userId)
    store.dispatch(removeUser(userId));
  } else {
    console.log("invalid user ID received for removing a user: ");
    console.log(userId);
  }  
});

//handle receiving a single user
socket.on('single user', (user) => {
  if (typeof(user) == 'object') {
    console.log("user received (single): " + user.nick)
    store.dispatch(addUser(user));
  } else {
    console.log("invalid (single) user received:");
    console.log(user);
  }  
});

//handle receiving a user list
socket.on('user list', (userList) => {
  if (typeof(userList) == 'object') {
    store.dispatch(flushUserList());
    userList.map((user) => {
      console.log("user received (list): " + user.nick)
      store.dispatch(addUser(user));
    })
  } else {
    console.log("invalid user list received:");
    console.log(userList);
  }  
});

//handle receiving default channels from the server
socket.on('default channel', (channel) => {
  if (!store.getState().userInterface.defaultChannelsReceived) {
    store.dispatch(addDefaultChannel(channel)); //only do this if channels haven't already been received
  }
});

//handle finish sending of default channels
socket.on('default channels finished', () => {
  store.dispatch(setDefaultChannelsReceived());
});

//handle incoming chat messages
socket.on('chat message', (msg) => {
  store.dispatch(addMessage({...msg, messageSent: true}));
  // setTimeout(()=>{
    if (msg.channelId == store.getState().userInterface.activeChannelId) {
      $('.chatMessageContainer').stop().animate({
        scrollTop: $('.chatMessageContainer')[0].scrollHeight
      }, 800);
    }
  // }, 0)
});

//handle connection
const handleConnect = (socket, reconnect) => {

  store.dispatch(setConnected()); //set UI state to show connected
  if (!store.getState().userInterface.defaultChannelsReceived) { 
    socket.emit('request default channels'); //send a request for default channel list only if we don't have one
  }

  if (reconnect) {
    console.log("socket connection re-established");

    //get the user list for the current channel
    getUserList();

    //set the nick again (server ignores if it's already set)
    setNick(store.getState().loginState.nick);

    //request to re-join channels
    store.getState().channels.map((channel) => {
      if (channel.wasJoined) { //this flag is used to track channels that the user was disconnected from
        requestJoinChannel(channel.channelId);
      }
    });

  } else {
    console.log("socket connection established");
  }

}

//handle successful connections
socket.on('connect', () => {
  socket.removeListener('connect'); //we only want to do this once - otherwise on 'reconnect' this will also be called
  handleConnect(socket, false);
});
socket.on('reconnect', () => {
  handleConnect(socket, true);
});

//handle disconnections and error states
const handleDisconnect = (reason) => {
  store.dispatch(updatePing('--'));
  store.dispatch(setDisconnected());
  store.dispatch(setDisconnectionReason(reason));
  store.dispatch(startWaitForNickAcceptance());
  store.dispatch(setAllChannelsWasJoined());
}
socket.on('disconnect', (reason) => {
  if (reason == "transport close") {
    reason = "socket closed by server"; //niceify some of the known errors
  }
  handleDisconnect(reason);
});
socket.on('connect_timeout', () => {
  handleDisconnect("connection timed out");
});
socket.on('connect_error', () => {
  handleDisconnect("error establishing connection");
});
socket.on('error', (error) => {
  store.dispatch(setDisconnectionReason("error: " + error)); //don't trigger a disconnected state in the UI because this may not actually result in disconnection
});
socket.on('reconnect_attempt', (number) => {
  store.dispatch(setDisconnectionReason("reconnecting, attempt " + number + "..."));
});
socket.on('reconnecting', (number) => { //what's the difference between this and reconnect_attempt? apparently nothing
  store.dispatch(setDisconnectionReason("reconnecting, attempt " + number + "..."));
});
socket.on('reconnect_error', (error) => {
  if (error == "Error: xhr poll error") {
    error = "could not find connection to server";
  }
  handleDisconnect("reconnect error: " + error);
});
socket.on('reconnect_failed', () => {
  handleDisconnect("could not reconnect");
});

//handle pongs from the server
socket.on('pong', (ms) => { //the pong event automatically has the ping in ms passed in by socket.io
  store.dispatch(updatePing(ms));
});
