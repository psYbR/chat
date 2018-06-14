import io from 'socket.io-client';
export const socket = io();
import { maxTimestamp, maxMessageLength } from '../config';
import { store } from '../stores/store';
import {
  addMessage,
  setMessageSent,
  addDefaultChannel,
  setConnected,
  setDisconnected,
  setDisconnectionReason,
  setDefaultChannelsReceived,
  updatePing
} from '../actions/actions';
import { getNowTimestamp } from '../utils/utils';

//the function the client uses to send messages to the server
export const sendMessage = (outboundMsg) => {
  let wasError = false;
  let errorMsg = '';
  if (isNaN(outboundMsg.sentTimestamp) || outboundMsg.sentTimestamp < 1528932507000 || outboundMsg.sentTimestamp > maxTimestamp) { //sanity check the timestamp
    wasError = true;
    errorMsg = 'malformed timestamp';
  };
  if (outboundMsg.messageText.length > maxMessageLength || outboundMsg.messageText.length < 1) { //sanity check the message length
    wasError = true;
    errorMsg = 'length out of bounds';
  }
  if (wasError) {
    store.dispatch(setMessageSent(outboundMsg.sentTimestamp, errorMsg)); //set the message as sent but show a not-sent error on it
  } else {
    socket.emit('chat message', outboundMsg, (response) => { //send the message and handle the response
      store.dispatch(setMessageSent(response, "success")); //the response is the original sentTimestamp of the message
    });
  }
}

export const setNick = (nick) => {
  let wasError = false;
  let errorMsg = '';
  if (nick.length > maxNickLength || nick.length < minNickLength) { //sanity check the nick length
    wasError = true;
    errorMsg = 'nick was either too long or too short';
  }
  if (wasError) {
    store.dispatch(nickSetFailed(errorMsg)); //tell the UI setting of the nick failed
  } else {
    socket.emit('set nick', outboundMsg, (response) => { //send the nick and handle the response
      if (response == "success") {
        store.dispatch(nickSetSuccessful()); //update the UI and set the
      } else {
        store.dispatch(nickSetFailed(response)); //tell the UI setting of the nick failed
      }      
    });
  }
}

//handle default channels
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
  handleDisconnect("reconnect error: " + error);
});
socket.on('reconnect_failed', () => {
  handleDisconnect("could not reconnect");
});

//handle pongs from the server
socket.on('pong', (ms) => { //the pong event automatically has the ping in ms passed in by socket.io
  store.dispatch(updatePing(ms));
});
