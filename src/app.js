import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { store } from './stores/store';
import ChatApp from './components/ChatApp';
import {
  setAppIsFocused,
  unsetAppIsFocused,
  unsetMessagesSinceNotFocused
} from './actions/actions';

//configure react-redux store provider
const jsx = (
  <Provider store={store}>
    <ChatApp />
  </Provider>
);

let notifToggle = false;
setInterval(()=>{
  if (notifToggle) {
    if (store.getState().userInterface.messagesSinceNotFocused) {
      document.title = 'New messages!';
    }
  } else {
    document.title = 'BlazeChat';
  }
  notifToggle = !notifToggle;
}, 2000)

$(window).focus(() => {
  store.dispatch(unsetMessagesSinceNotFocused());
  store.dispatch(setAppIsFocused());
});
$(window).blur(() => {
  store.dispatch(unsetAppIsFocused());
});

ReactDOM.render(jsx, document.getElementById('app'));
