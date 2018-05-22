import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import ChatApp from './components/ChatApp.js';
import ChannelDescription from './components/ChannelDescription.js';
import configureStore from './stores/store';
import { inboundMsgAction } from './actions/inboundMsgAction';
import { outboundMsgAction } from './actions/outboundMsgAction';
import { activeChannelAction } from './actions/activeChannelAction';
import { currentChannelsAction } from './actions/currentChannelsAction';
import { configurationAction } from './actions/configurationAction';

//this function gets called every time the state changes
const store = configureStore();

// store.subscribe(() => {
//   console.log(store.getState());
// });

// configuration: {
//     loggedIn: false,
//     userid: 0,
//     username: 'Guest',
//     defaultFont: 'Inconsolata',
//     defaultColor: -1,
//     assignedGroup: 'guests',
//     defaultChannel: 'welcome',
//     isAway: false,
//     showSystemMessages: true
//   },

// config test dispatch:
store.dispatch(configurationAction());

// current channels test dispatch:
store.dispatch(currentChannelsAction({ id: 1, channelName: 'multirotors', type: 'channel',  topic: 'Multirotors Topic' }));
store.dispatch(currentChannelsAction({ id: 2, channelName: 'drones', type: 'channel',  topic: 'Drones Topic' }));

// active channel test dispatch:
store.dispatch(activeChannelAction({ id: 1, numberOfUsers: 24, numberOfOps: 2 }));

// chat message test dispatches: { id, source, timestamp, message, appliedFont, appliedColor }
store.dispatch(inboundMsgAction({ id: 2, channelId: 1, timestamp: 1, source: '*', message: "Unix timestamps are fun" }));
store.dispatch(outboundMsgAction({ id: 3, channelId: 1, timestamp: 5, message: "Messages are injection safe <div><p><span>);\"" }));
store.dispatch(inboundMsgAction({ id: 4, channelId: 1, timestamp: 1, source: 'Colors', message: "^1,0A^0,1A^1,2A^2,3A^3,4A^4,5A^5,6A^6,7A^7,8A^8,9A^9,10A^10,11A^11,12A^12,13A^13,14A^14,15A^15,16A^16,17A" }));
store.dispatch(inboundMsgAction({ id: 5, channelId: 1, timestamp: 2, source: '*', message: "Tim has left (ping timeout: 120s)" }));
store.dispatch(outboundMsgAction({ id: 6, channelId: 1, timestamp: 3, message: "A message from you, the current user" }));
store.dispatch(inboundMsgAction({ id: 7, channelId: 1, timestamp: 4, source: 'ASTRA-', message: "ASCII works!" }));
store.dispatch(inboundMsgAction({ id: 8, channelId: 1, timestamp: 5, source: 'OSTRA-', message: "((̲̅ ̲̅(̲̅C̲̅r̲̅a̲̅y̲̅o̲̅l̲̲̅̅a̲̅( ̲̅((>     ☁ ▅▒░☼‿☼░▒▅ ☁" }));
store.dispatch(inboundMsgAction({ id: 9, channelId: 2, timestamp: 6, source: 'TIM-', message: "A message to channel 2" }));

//configure react-redux store provider
const jsx = (
  <Provider store={store}>
    <ChatApp />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
