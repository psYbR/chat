import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { store } from './stores/store';
import ChatApp from './components/ChatApp';

import {
  requestToJoinDefaultChannels,
  requestToJoinUserChannels
} from './utils/utils';

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
