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

const requestLogin = (type, loginObject) => {

  socket.emit('request login', loginObject);

}

export default requestLogin;