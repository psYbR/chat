import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import ChatApp from './components/ChatApp.js';
import ChannelDescription from './components/ChannelDescription.js';
import configureStore from './stores/store';
import { inboundMsgAction } from './actions/inboundMsgAction';

//this function gets called every time the state changes
const store = configureStore();

// store.subscribe(() => {
//   console.log(store.getState());
// });

// chat message test dispatches
//id, source, timestamp, message, appliedFont, appliedColor
store.dispatch(inboundMsgAction({ id: 5, source: 'Timo', message: "Just a us^3er saying Hello!" }));
store.dispatch(inboundMsgAction({ id: 6, source: 'ASTRA-', message: "Just another user saying Hello!" }));

//configure react-redux store provider
const jsx = (
  <Provider store={store}>
    <ChatApp />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
