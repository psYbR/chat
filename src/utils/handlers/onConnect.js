import { store } from '../../stores/store';
import { requestDefaultChannels } from './handleChannelLists';
import requestJoinChannel from './requestJoinChannel';
import requestSetNick from './requestSetNick';
//import { requestUserList } from './handleUserLists';
import {
  setConnected
 } from '../../actions/actions';
import cookie from 'react-cookie';

//rejoin channels after a disconnection
const rejoinChannels = (socket) => {
  store.getState().channels.map((channel) => {
    if (channel.wasJoined) { //this flag marks channels the user was disconnected from
      requestJoinChannel(channel.channelId);
    }
  });
}

//await a login from the user
const setAwaitLogin = (socket) => {
  
  console.log("Awaiting login; downloading channels...");
  
  //get the default channel list if needed
  requestDefaultChannels(socket);

}

//
// handle connections to server
//
const onConnect = (socket, wasReconnect) => {  

  console.log("Connected!");

  //set UI state to connected
  store.dispatch(setConnected());

  //load the session cookie if it exists and create a session
  var rediskey = cookie.load('rediskey');
  if (!rediskey) { //if there was no cookie, create new session and cookie

    console.log("Requesting session...");

    socket.emit('create session', (response)=>{

      cookie.save('rediskey', response, {
        maxAge: 30 * 60,
        domain: 'blaze.chat',
        secure: true
      });

      console.log("Session (new): " + response);
      setAwaitLogin(socket);

    });

  } else {
    socket.emit('check session', rediskey, (response)=>{

      if (response == "no session") { //if there was a cookie but the server doesn't recognise it

        socket.emit('create session', (response)=>{

          cookie.save('rediskey', response, {
            maxAge: 30 * 60,
            domain: 'blaze.chat',
            secure: true
          });

          console.log("Session (rejected, new created): " + response);
          setAwaitLogin(socket);

        });

      } else if (response == "success") { //if there was a cookie and the server recognises it

        console.log("Session (found): " + response);
        socket.emit('request restore login');

      }

      else {
        console.log("session error: " + response);
      }
    });
  }

}

export default onConnect;