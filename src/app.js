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
import { getNowUnix} from './utils/dateUtils';

//this function gets called every time the state changes
const store = configureStore();

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

// current channels test dispatch:
store.dispatch(currentChannelsAction({ id: 1, channelName: 'multirotors', type: 'channel',  topic: 'Multirotors Topic', isJoined: true, isCurrent: true, hasNewMessages: true }));
store.dispatch(currentChannelsAction({ id: 2, channelName: 'drones', type: 'channel',  topic: 'Drones Topic', isSelected: false, isJoined: true }));
store.dispatch(currentChannelsAction({ id: 3, channelName: 'lobby', type: 'channel',  topic: 'Welcome to the lobby', isJoined: true, hasMention: true }));
store.dispatch(currentChannelsAction({ id: 4, channelName: 'other', type: 'channel',  topic: 'Welcome to other', hasNewNotifs: true, isJoined: true }));
store.dispatch(currentChannelsAction({ id: 5, channelName: 'miscellaneous', type: 'channel'  }));
store.dispatch(currentChannelsAction({ id: 6, channelName: 'hexchat', type: 'channel'   }));
store.dispatch(currentChannelsAction({ id: 7, channelName: 'ASTRA-', type: 'user'  }));

// active channel test dispatch:
store.dispatch(activeChannelAction({ id: 1, numberOfUsers: 24, numberOfOps: 2 }));

// chat message test dispatches: { id, source, timestamp, message, appliedFont, appliedColor }
store.dispatch(inboundMsgAction({ id: 2, channelId: 1, timestamp:  getNowUnix()-17, source: '*', message: "Unix timestamps are fun" }));
store.dispatch(outboundMsgAction({ id: 3, channelId: 1, timestamp: getNowUnix()-16, message: "Messages are injection safe <div><p><span>);\"" }));
store.dispatch(inboundMsgAction({ id: 4, channelId: 1, timestamp:  getNowUnix()-15, source: 'Colors', message: "^1,0A^0,1A^1,2A^2,3A^3,4A^4,5A^5,6A^6,7A^7,8A^8,9A^9,10A^10,11A^11,12A^12,13A^13,14A^14,15A^15,16A^16,17A" }));
store.dispatch(inboundMsgAction({ id: 5, channelId: 1, timestamp:  getNowUnix()-14, source: '*', message: "Tim has left (ping timeout: 120s)" }));
store.dispatch(outboundMsgAction({ id: 6, channelId: 1, timestamp: getNowUnix()-13, message: "A message from you, the current user" }));
store.dispatch(inboundMsgAction({ id: 7, channelId: 1, timestamp:  getNowUnix()-12, source: 'Champion', message: "ASCII works!" }));
store.dispatch(inboundMsgAction({ id: 8, channelId: 1, timestamp:  getNowUnix()-11, source: 'OSTRA-', message: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
store.dispatch(inboundMsgAction({ id: 9, channelId: 2, timestamp:  getNowUnix()-10, source: 'TIM-', message: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
store.dispatch(inboundMsgAction({ id: 10, channelId: 1, timestamp: getNowUnix()-9, source: 'PlayerOne', message: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
store.dispatch(inboundMsgAction({ id: 11, channelId: 1, timestamp: getNowUnix()-8, source: 'OSTRA-', message: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
store.dispatch(inboundMsgAction({ id: 12, channelId: 2, timestamp: getNowUnix()-7, source: 'TIM-', message: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
store.dispatch(inboundMsgAction({ id: 13, channelId: 1, timestamp: getNowUnix()-6, source: 'ASTRA-', message: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
store.dispatch(inboundMsgAction({ id: 14, channelId: 1, timestamp: getNowUnix()-5, source: 'OSTRA-', message: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
store.dispatch(inboundMsgAction({ id: 15, channelId: 2, timestamp: getNowUnix()-4, source: 'TIM-', message: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
store.dispatch(inboundMsgAction({ id: 16, channelId: 1, timestamp: getNowUnix()-3, source: 'ASTRA-', message: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
store.dispatch(inboundMsgAction({ id: 17, channelId: 1, timestamp: getNowUnix()-2, source: 'OSTRA-', message: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
store.dispatch(inboundMsgAction({ id: 18, channelId: 2, timestamp: getNowUnix()-1, source: 'TIM-', message: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));

store.subscribe(() => {
  //console.log(store.getState());
});

// config test dispatch:
store.dispatch(configurationAction());

//configure react-redux store provider
const jsx = (
  <Provider store={store}>
    <ChatApp />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
