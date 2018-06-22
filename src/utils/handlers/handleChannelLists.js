import { store } from '../stores/store';

const getDefaultChannels = (socket) => {
  if (!store.getState().userInterface.defaultChannelsReceived) { 
    socket.emit('request default channels'); //send a request for default channel list only if we don't have one
  }
}

//handle receiving default channels from the server
const onDefaultChannel = (channel) => {
  if (!store.getState().userInterface.defaultChannelsReceived) {
    store.dispatch(addDefaultChannel(channel)); //only do this if channels haven't already been received
  }
};

//handle finish sending of default channels
const onDefaultChannelsFinished = () => {
  store.dispatch(setDefaultChannelsReceived());
};