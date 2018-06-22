import { store } from '../../stores/store';
import socket from './client';
import {
  setActiveChannel,
  setCurrentChannel,
  joinChannel,
  addMessage
} from '../../actions/actions';
import { getUserList } from './handleUserLists';
import { getNowTimestamp } from '../utils'

//send request to join a channel
const requestJoinChannel = (channelId) => {
  
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
      if (response == "success" || response == "already in channel") {
        console.log("request to join channel ID " + channelId + " succeeded!");
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

export default requestJoinChannel;