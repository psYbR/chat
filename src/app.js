import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import ChatApp from './components/ChatApp.js';
import ChannelDescription from './components/ChannelDescription.js';


import { createStore } from 'redux';

const store = createStore((state = {
  userName: '',
  messages: []
}) => {
  return state;
});

const examples = [
  {
    channel: 'multirotors',
    source: 'Pak',
    messageBody: 'A message from a user about a bunch of stuff and a bunch of things!',
    font: 'default',
    color: 'default',
    isSystem: false
  },
  {
    channel: 'multirotors',
    source: 'Pak_',
    messageBody: 'Another message from a user!',
    font: 'default',
    color: 'default',
    isSystem: false
  }
];


console.log(store.getState());

ReactDOM.render(<ChatApp />, document.getElementById('app'));
