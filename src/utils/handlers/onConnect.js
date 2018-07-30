import { store } from '../../stores/store';
import { requestDefaultChannels } from './handleChannelLists';
import requestJoinChannel from './requestJoinChannel';
import requestSetNick from './requestSetNick';
import { requestUserList } from './handleUserLists';
import {
  setConnected
  ,unsetWaitingForNickAcceptance
  ,setNickSetFailedReason
 } from '../../actions/actions';

//
// handle connections
//

// TO DO: handle rejected nick

const onConnect = (socket, wasReconnect) => {

  //set UI state to show connected
  store.dispatch(setConnected());

  //get the default channel list
  requestDefaultChannels(socket);

  //if the connection was re-established after a disconnect. Check the user is actually logged in
  if (wasReconnect && store.getState().loginState.loggedIn) {

    console.log("socket connection re-established");

    //set the nick again (server ignores if it's already set)
    requestSetNick((response)=>{
      //handle the response (a string; either "success" or the reason the nick wasn't accepted eg. in use)
      if (response == "success") {
        console.log("setting nick succeeded!");
        //store.dispatch(unblurApp());
        //store.dispatch(setLoggedIn());
        //store.dispatch(unsetWaitingForNickAcceptance()); //un-disable the buttons
        //store.dispatch(setNickSetFailedReason('')); //update the UI and set the nick
        //request to re-join channels the user was in
        store.getState().channels.map((channel) => {
          //this flag marks channels the user was disconnected from
          if (channel.wasJoined) {
            //send the request
            requestJoinChannel(channel.channelId);
          }
        });
        //get the user list for whatever channel the user is currently in
        requestUserList();
        //store.dispatch(resetDefaultChannelSelections()); //reset the default channel selections
      } else {
        console.log("setting nick failed: " + response);
        //store.dispatch(unsetWaitingForNickAcceptance());
        //store.dispatch(setNickSetFailedReason(response)); //tell the UI that setting the nick failed
      } 
    });

  } else {

    //store.dispatch(unsetWaitingForNickAcceptance());
    console.log("socket connection established");
    
  }
}

export default onConnect;