import { store } from '../../stores/store';
import { addUser, removeUser, flushUserList } from '../../actions/actions';
import socket from './client';

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
        console.log("user list request sent");
        //empty the list first
        //store.dispatch(flushUserList());
      } else {
        console.log("user list request failed: " + response);
      }
    });
  } else {
    console.log("Skipping user channel request, no channels joined.");
  }
}

//handle removing a user from channels (array)
export const onRemoveUser = (userId, channel) => {
  if (userId) {
    console.log("Remove user request received: " + userId)
    store.dispatch(removeUser(userId, channel));
  } else {
    console.log("invalid user ID received for removing a user: ");
    console.log(userId);
  }  
};

//handle receiving a single user
export const onReceiveUser = (user, channel) => {
  if (typeof(user) == 'object' && !isNaN(channel)) {
    console.log("user received (single): " + user.nick)
    //console.log(user);
    store.dispatch(addUser(user, channel));
  } else {
    console.log("invalid (single) user received, or channel missing:");
    console.log(user);
    console.log(channel);
  }  
};
