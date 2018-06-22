import { store } from '../stores/store';
//addUser*

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

//handle removing a user from channels (array)
export const onRemoveUser = (userId, channels) => {
  if (userId) {
    console.log("Remove user request received: " + userId)
    store.dispatch(removeUser(userId));
  } else {
    console.log("invalid user ID received for removing a user: ");
    console.log(userId);
  }  
};

store.dispatch(flushUserList());

//handle receiving a single user
export const onReceiveUser = (user) => {
  if (typeof(user) == 'object') {
    console.log("user received (single): " + user.nick)
    store.dispatch(addUser(user));
  } else {
    console.log("invalid (single) user received:");
    console.log(user);
  }  
};
