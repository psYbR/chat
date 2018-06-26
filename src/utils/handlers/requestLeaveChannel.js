import { store } from '../../stores/store';
import socket from './client';
import {
  setActiveChannel,
  setCurrentChannel,
  leaveChannel
} from '../../actions/actions';
import { getUserList } from './handleUserLists';
import { getNowTimestamp } from '../utils'

//send request to join a channel
const requestLeaveChannel = (channelId) => {
  
  //check ID is a number
  if (isNaN(channelId)) {
    //tell the UI joining the channel failed
    console.log("requesting to leave channel ID failed: not a valid ID");
    store.dispatch(addMessage({source: "*", channelId: channelId, messageSent: true, receivedTimestamp: getNowTimestamp(), messageText: "Could not leave channel: invalid request" }));
  }
  //if there was no error
  else {
    console.log("requesting to leave channel ID: " + channelId);
    socket.emit('leave channel', channelId, ({ response, channelId }) => { //send the nick to the server
      //handle the response (a string; either "success" or the reason the channel wasn't joined eg. in use)
      if (response == "success" || response == "already left channel") {
        console.log("request to leave channel ID " + channelId + " succeeded!");
        store.dispatch(leaveChannel(channelId));
        //check the user is still in another channel
        if (store.getState().channels.length > 0) {
          //select the first channel in the array and mark it as active
          const chanId = store.getState().channels[0].channelId;
          store.dispatch(setCurrentChannel(chanId));
          store.dispatch(setActiveChannel(chanId));
          getUserList();
        }
      } else {
        console.log("request to leave channel ID " + channelId + " failed: " + response);
        //show an error
        store.dispatch(addMessage({source: "*", channelId: channelId, messageSent: true, receivedTimestamp: getNowTimestamp(), messageText: "Could not leave channel: " + response }));
      }      
    });
  }
}

export default requestLeaveChannel;