import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import ChatApp from './components/ChatApp';
import ChannelDescription from './components/ChannelDescription';
import configureStore from './stores/store';
import { addChannel } from './actions/channelActions';
import { setConfiguration } from './actions/configurationActions';
import { addMessage } from './actions/messageActions';
import { setUIState, setActiveChannel } from './actions/userInterfaceActions';
import { setLoginState } from './actions/loginActions';
import { getNowUnix} from './utils/dateUtils';

//this function gets called every time the state changes
const store = configureStore();

// config test dispatch:
store.dispatch(setUIState());
store.dispatch(setConfiguration());
store.dispatch(setLoginState());

// current channels test dispatch:
store.dispatch(addChannel({ channelId: 1, channelName: 'multirotors', type: 'channel', topic: 'Multirotors Topic', isJoined: true, isCurrent: true }));
store.dispatch(addChannel({ channelId: 2, channelName: 'drones', type: 'channel', topic: 'Drones Topic', isJoined: true }));
store.dispatch(addChannel({ channelId: 3, channelName: 'lobby', type: 'channel', topic: 'Welcome to the lobby', isJoined: true }));
store.dispatch(addChannel({ channelId: 4, channelName: 'other', type: 'channel', topic: 'Welcome to other', isJoined: true }));
store.dispatch(addChannel({ channelId: 5, channelName: 'miscellaneous', type: 'channel' }));
store.dispatch(addChannel({ channelId: 6, channelName: 'hexchat', type: 'channel' }));
store.dispatch(addChannel({ channelId: 7, channelName: 'Tangles', type: 'user' }));

// active channel test dispatch:
store.dispatch(setActiveChannel({ channelId: 1, numberOfUsers: 24, numberOfOps: 2 }));

store.subscribe(() => {
  //console.log(store.getState());
});

// chat message test dispatches: { id, source, timestamp, message, appliedFont, appliedColor }
store.dispatch(addMessage({ messageId: 2, type: 'inbound', channelId: 1, timestamp:  getNowUnix()-17, source: '*', messageText: "Unix timestamps are fun", appliedFont: 'Orbitron', appliedColor: 'Orange' }));
store.dispatch(addMessage({ messageId: 3, type: 'outbound', channelId: 1, timestamp: getNowUnix()-16, messageText: "Messages are injection safe <div><p><span>);\"", appliedFont: 'Kavivanar' }));
store.dispatch(addMessage({ messageId: 4, type: 'inbound', channelId: 1, timestamp:  getNowUnix()-15, source: 'Colors', messageText: "^1,0A^0,1A^1,2A^2,3A^3,4A^4,5A^5,6A^6,7A^7,8A^8,9A^9,10A^10,11A^11,12A^12,13A^13,14A^14,15A^15,16A^16,17A" }));
store.dispatch(addMessage({ messageId: 5, type: 'inbound', channelId: 1, timestamp:  getNowUnix()-14, source: '*', messageText: "Tim has left (ping timeout: 120s)" }));
store.dispatch(addMessage({ messageId: 6, type: 'outbound', channelId: 1, timestamp: getNowUnix()-13, messageText: "A message from you, the current user", appliedFont: 'Permanent Marker', appliedColor: 'Cyan' }));
store.dispatch(addMessage({ messageId: 7, type: 'inbound', channelId: 1, timestamp:  getNowUnix()-12, source: 'Champion', messageText: "ASCII works!" }));
store.dispatch(addMessage({ messageId: 8, type: 'inbound', channelId: 1, timestamp:  getNowUnix()-11, source: 'OSTRA-', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
store.dispatch(addMessage({ messageId: 9, type: 'inbound', channelId: 2, timestamp:  getNowUnix()-10, source: 'TIM-', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
store.dispatch(addMessage({ messageId: 10, type: 'inbound', channelId: 1, timestamp: getNowUnix()-9, source: 'PlayerOne', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
store.dispatch(addMessage({ messageId: 11, type: 'inbound', channelId: 1, timestamp: getNowUnix()-8, source: 'OSTRA-', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
store.dispatch(addMessage({ messageId: 12, type: 'inbound', channelId: 2, timestamp: getNowUnix()-7, source: 'TIM-', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
store.dispatch(addMessage({ messageId: 13, type: 'inbound', channelId: 1, timestamp: getNowUnix()-6, source: 'ASTRA-', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
store.dispatch(addMessage({ messageId: 14, type: 'inbound', channelId: 1, timestamp: getNowUnix()-5, source: 'OSTRA-', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
store.dispatch(addMessage({ messageId: 15, type: 'inbound', channelId: 2, timestamp: getNowUnix()-4, source: 'TIM-', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
store.dispatch(addMessage({ messageId: 16, type: 'inbound', channelId: 1, timestamp: getNowUnix()-3, source: 'ASTRA-', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
store.dispatch(addMessage({ messageId: 17, type: 'inbound', channelId: 1, timestamp: getNowUnix()-2, source: 'OSTRA-', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
store.dispatch(addMessage({ messageId: 18, type: 'inbound', channelId: 2, timestamp: getNowUnix()-1, source: 'TIM-', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));




//configure react-redux store provider
const jsx = (
  <Provider store={store}>
    <ChatApp />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
