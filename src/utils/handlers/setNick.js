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