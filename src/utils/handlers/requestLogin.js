import { store } from '../../stores/store';
import socket from './client';
import {
  setCurrentChannel
  ,leaveChannel
  ,unsetWaitingForLeaveChannelConfirmation
  ,hideLeaveChannelModal
} from '../../actions/actions';
//import { getUserList } from './handleUserLists';
import { getNowTimestamp } from '../utils'
//import { systemNick } from '../../config';

const requestLogin = () => {

  const payload = {
    email: 'tim.eastwood@hotmail.com',
    password: 'jiblet1223',
    loginType: 'user',
    loginTime: getNowTimestamp
  }  

  socket.emit('request login', payload);

}

socket.on('login response', (response) => {
  if (response == "success")  {

  }
  console.log("Login response: " + response)
});

export default requestLogin;