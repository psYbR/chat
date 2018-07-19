import { store } from '../../stores/store';
import socket from './client';
import {
  addAdminChannel
} from '../../actions/actions';

//request list of all channels
export const adminRequestChannels = () => {
  socket.emit('admin request channels');
}

//handle receiving channels
export const onAdminChannel = (channel) => {
  store.dispatch(addAdminChannel(channel)); //only do this if channels haven't already been received
};

export const adminCreateChannel = (newChannel) => {
  console.log("sending create channel to server");
  socket.emit('admin create channel', newChannel);
}