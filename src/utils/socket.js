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
  setNickSetFailedReason
} from '../actions/actions';
import { getNowTimestamp } from '../utils/utils';

//send chat messages to the server and handle the response on success or failure
export const sendMessage = (outboundMsg) => {
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
    socket.emit('chat message', outboundMsg, (response) => {
      // handle the response
      store.dispatch(setMessageSent(response, "success"));
      //the response from the server will be the original sentTimestamp of the message and is used by the client to set the message to 'sent' status upon receipt of the response
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
    store.dispatch(nickSetFailed(errorMsg)); //tell the UI setting of the nick failed
  }
  //if there was no error
  else {
    socket.emit('set nick', nick, (response) => { //send the nick to the server
      //handle the response (a string; either "success" or the reason the nick wasn't accepted eg. in use)
      if (response == "success") {
        store.dispatch(unblurApp());
        store.dispatch(setLoggedIn());
        store.dispatch(setJoinDefaultChannels()); //trigger the joining of any of the default channels they selected
        store.dispatch(stopWaitForNickAcceptance());
        store.dispatch(setNickSetFailedReason('')); //update the UI and set the nick
      } else {
        store.dispatch(stopWaitForNickAcceptance());
        store.dispatch(setNickSetFailedReason(response)); //tell the UI that setting the nick failed
      }      
    });
  }
}

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
});

//handle successful connections
socket.on('connect', () => {
  store.dispatch(setConnected());
  if (!store.getState().userInterface.defaultChannelsReceived) { 
    socket.emit('request default channels'); //send a request for default channel list only if we don't have one
  }
});
socket.on('reconnect', () => {
  store.dispatch(setConnected());
});

//handle disconnections and error states
const handleDisconnect = (reason) => {
  console.log("Socket disconnected! Reason: " + reason);
  store.dispatch(updatePing('--'));
  store.dispatch(setDisconnected());
  store.dispatch(setDisconnectionReason(reason));
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
