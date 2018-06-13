import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import ChatApp from './components/ChatApp';
import ChannelDescription from './components/ChannelDescription';
import configureStore from './stores/store';
// import { addChannel } from './actions/channelActions';
import { setConfiguration } from './actions/configurationActions';
import { addMessage } from './actions/messageActions';
import { setUIState, setActiveChannel } from './actions/userInterfaceActions';
import { setLoginState } from './actions/loginActions';
import { getNowTimestamp } from './utils/dateUtils';
import { addDefaultChannel } from './actions/defaultChannelsActions';
import { setConnected, setDisconnected, setDefaultChannelsReceived } from './actions/userInterfaceActions';
import { requestToJoinDefaultChannels } from './utils/joinDefaultChannels';
import { requestToJoinUserChannels } from './utils/joinUserChannels';

export const store = configureStore();

// apply default state values
store.dispatch(setUIState());
store.dispatch(setConfiguration());
store.dispatch(setLoginState());

//tell the app the socket connection was successfully established
setTimeout(() => {
  store.dispatch(setConnected());
}, 100);

// add some default channels - these should be supplied by the server in future
// these timeouts simulate the server taking time to send all of the default channels details to the client
setTimeout(() => {
  store.dispatch(addDefaultChannel({ channelId: 1, channelName: 'lobby', topic: 'Welcome to the lobby', isSelected: true }));
  store.dispatch(addDefaultChannel({ channelId: 2, channelName: 'help', topic: 'Join this channel to get help using Chat App' }));
  store.dispatch(addDefaultChannel({ channelId: 3, channelName: 'technology', topic: 'for discussion of all things tech-related' }));
  store.dispatch(addDefaultChannel({ channelId: 4, channelName: 'music', topic: 'for discussion of all things music' }));
  store.dispatch(addDefaultChannel({ channelId: 5, channelName: 'movies', topic: 'for discussion of all things movies' }));
}, 200);
setTimeout(() => {
  store.dispatch(addDefaultChannel({ channelId: 6, channelName: 'tv', topic: 'for discussion of all things TV' }));
  store.dispatch(addDefaultChannel({ channelId: 7, channelName: 'software', topic: 'for discussion of all things software' }));
  store.dispatch(addDefaultChannel({ channelId: 8, channelName: 'games', topic: 'for discussion of all things games' }));
  store.dispatch(addDefaultChannel({ channelId: 9, channelName: 'consoles', topic: 'for discussion of all things consoles' }));
  store.dispatch(addDefaultChannel({ channelId: 10, channelName: 'retro', topic: 'for discussion of all things retro tech' }));
  store.dispatch(addDefaultChannel({ channelId: 11, channelName: 'art', topic: 'for discussion of all things art' }));
}, 300);
setTimeout(() => {
  store.dispatch(addDefaultChannel({ channelId: 12, channelName: 'photography', topic: 'for discussion of all things photography' }));
  store.dispatch(addDefaultChannel({ channelId: 13, channelName: 'drones', topic: 'for discussion of all things related to drones' }));
  store.dispatch(addDefaultChannel({ channelId: 14, channelName: 'travel', topic: 'for discussion of all things travel' }));
  store.dispatch(addDefaultChannel({ channelId: 15, channelName: 'news', topic: 'for discussion of all things related to world news' }));
  store.dispatch(addDefaultChannel({ channelId: 16, channelName: 'melbourne', topic: 'people from melbourne, gather here' }));
  store.dispatch(addDefaultChannel({ channelId: 17, channelName: 'sydney', topic: 'people from sydney, gather here' }));
  store.dispatch(addDefaultChannel({ channelId: 18, channelName: 'perth', topic: 'people from perth, gather here' }));
  store.dispatch(addDefaultChannel({ channelId: 19, channelName: 'brisbane', topic: 'people from brisbane, gather here' }));
  store.dispatch(addDefaultChannel({ channelId: 20, channelName: 'nz', topic: 'people from new zealand, gather here' }));
}, 400);
setTimeout(() => {
  store.dispatch(setDefaultChannelsReceived());
}, 500);

// chat message test dispatches: { id, source, timestamp, message, appliedFont, appliedColor }
store.dispatch(addMessage({ type: 'inbound', channelId: 1, timestamp:  getNowTimestamp()-17, source: '*', messageText: "A user has joined the channel", messageSent: true }));
store.dispatch(addMessage({ type: 'inbound', channelId: 1, timestamp:  getNowTimestamp()-15, source: 'Colors', messageSent: true, appliedFont: "Kavivanar", messageText: "^1,0A^0,1B^1,2C^2,3D^3,4E^4,5F^5,6G^6,7H^7,8I^8,9J^9,10K^10,11L^11,12M^12,13N^13,14O^14,15P^15,16Q^16,17R" }));
store.dispatch(addMessage({ type: 'outbound', channelId: 1, timestamp: getNowTimestamp()-13, messageSent: true, messageText: "A message from you, the current user", appliedFont: 'Orbitron', appliedColor: 'LightGreen' }));

//here we execute functions that require access to the store. these functions are called every time the state changes so they need to check if they should do anything based on the state
store.subscribe(() => {
  const state = store.getState();
  if (state.userInterface.defaultChannelsJoin) { //only call the function if the condition of the state is met
    requestToJoinDefaultChannels(state, store.dispatch);
  }
  if (state.userInterface.userChannelsJoin) { //only call the function if the condition of the state is met
    requestToJoinUserChannels(state, store.dispatch);
  }
});

//configure react-redux store provider
const jsx = (
  <Provider store={store}>
    <ChatApp />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
