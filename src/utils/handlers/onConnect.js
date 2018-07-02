import { store } from '../../stores/store';
import { requestDefaultChannels } from './handleChannelLists';
import requestJoinChannel from './requestJoinChannel';
import requestSetNick from './requestSetNick';
import { getUserList } from './handleUserLists';
import { setConnected } from '../../actions/actions';

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
  if (wasReconnect && store.getState().loggedIn) {

    console.log("socket connection re-established");

    //get the user list for whatever channel the user is currently in
    getUserList();

    //set the nick again (server ignores if it's already set)
    requestSetNick(store.getState().loginState.nick);

    //handle rejected nick

    //request to re-join channels the user was in
    store.getState().channels.map((channel) => {

      //this flag marks channels the user was disconnected from
      if (channel.wasJoined) {

        //send the request
        requestJoinChannel(socket, channel.channelId);

      }

    });

  } else {

    console.log("socket connection established");
    
  }

}

export default onConnect;