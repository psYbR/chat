import { store } from '../../stores/store';
import socket from './client';
import {
  addAdminChannel
  ,setAdminResponse
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
  socket.emit('admin create channel', {newChannel});
}

// tell server to create database tables
export const adminDbCreateTables = () => {
  socket.emit('admin create database tables', (response) => {
    store.dispatch(setAdminResponse(response));
  });
}

//create the default admin account
export const adminDbCreateDefaultAdminUser = () => {
  socket.emit('admin create default admin user', (response) => {
    store.dispatch(setAdminResponse(response));
  });
}