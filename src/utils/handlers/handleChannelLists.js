import { store } from '../../stores/store';
import {
  addDefaultChannel,
  setDefaultChannelsReceived,
  setLoginModalVisible
} from '../../actions/actions';

export const requestDefaultChannels = (socket) => {
  if (!store.getState().userInterface.defaultChannelsReceived) { 
    socket.emit('request default channels'); //send a request for default channel list only if we don't have one
  }
}

//handle receiving default channels from the server
export const onDefaultChannel = (channel) => {
  if (!store.getState().userInterface.defaultChannelsReceived) {
    store.dispatch(addDefaultChannel(channel)); //only do this if channels haven't already been received
  }
};

//handle finish receiving of default channels
export const onDefaultChannelsFinished = () => {
  store.dispatch(setDefaultChannelsReceived());
  if (!store.getState().loginState.loggedIn) { 
    store.dispatch(setLoginModalVisible()); //only show the modal if not already logged in
  }
};