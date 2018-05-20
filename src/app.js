import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import ChatApp from './components/ChatApp.js';
import ChannelDescription from './components/ChannelDescription.js';

ReactDOM.render(<ChatApp />, document.getElementById('app'));
