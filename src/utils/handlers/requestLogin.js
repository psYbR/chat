import { store } from '../../stores/store';
import socket from './client';
import {
  setCurrentChannel
  ,leaveChannel
  ,unsetWaitingForLeaveChannelConfirmation
  ,hideLeaveChannelModal
} from '../../actions/actions';
import { getUserList } from './handleUserLists';
import { getNowTimestamp } from '../utils'
import { systemNick } from '../../config';

const requestLogin = (nick, isGuest = true, email = '', password = '') => {

  const loginRequest = {
    isGuest,
    nick,
    email,
    password
  }

  socket.emit('request login', loginRequest, (response) => { //send the nick to the server
    console.log('response');
  });
}

export default requestLogin;