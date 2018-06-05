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
import { addDefaultChannel } from './actions/defaultChannelsActions';

import { setConnectedSuccessfully } from './actions/userInterfaceActions';

//this function gets called every time the state changes
const store = configureStore();

// apply default state values
store.dispatch(setUIState());
store.dispatch(setConfiguration());
store.dispatch(setLoginState());

store.dispatch(addDefaultChannel({ channelId: 1, channelName: 'lobby', topic: 'Welcome to the lobby' }));
store.dispatch(addDefaultChannel({ channelId: 2, channelName: 'help', topic: 'Join this channel to get help using Chat App' }));
store.dispatch(addDefaultChannel({ channelId: 3, channelName: 'technology', topic: 'for discussion of all things tech-related' }));
store.dispatch(addDefaultChannel({ channelId: 4, channelName: 'music', topic: 'for discussion of all things music' }));
store.dispatch(addDefaultChannel({ channelId: 5, channelName: 'movies', topic: 'for discussion of all things movies' }));
store.dispatch(addDefaultChannel({ channelId: 6, channelName: 'tv', topic: 'for discussion of all things TV' }));
store.dispatch(addDefaultChannel({ channelId: 7, channelName: 'software', topic: 'for discussion of all things software' }));
store.dispatch(addDefaultChannel({ channelId: 8, channelName: 'games', topic: 'for discussion of all things games' }));
store.dispatch(addDefaultChannel({ channelId: 9, channelName: 'consoles', topic: 'for discussion of all things consoles' }));
store.dispatch(addDefaultChannel({ channelId: 10, channelName: 'retro', topic: 'for discussion of all things retro tech' }));
store.dispatch(addDefaultChannel({ channelId: 11, channelName: 'art', topic: 'for discussion of all things art' }));
store.dispatch(addDefaultChannel({ channelId: 12, channelName: 'photography', topic: 'for discussion of all things photography' }));
store.dispatch(addDefaultChannel({ channelId: 13, channelName: 'drones', topic: 'for discussion of all things related to drones' }));
store.dispatch(addDefaultChannel({ channelId: 14, channelName: 'travel', topic: 'for discussion of all things travel' }));
store.dispatch(addDefaultChannel({ channelId: 15, channelName: 'news', topic: 'for discussion of all things related to world news' }));
store.dispatch(addDefaultChannel({ channelId: 16, channelName: 'melbourne', topic: 'people from melbourne, gather here' }));
store.dispatch(addDefaultChannel({ channelId: 17, channelName: 'sydney', topic: 'people from sydney, gather here' }));
store.dispatch(addDefaultChannel({ channelId: 18, channelName: 'perth', topic: 'people from perth, gather here' }));
store.dispatch(addDefaultChannel({ channelId: 19, channelName: 'brisbane', topic: 'people from brisbane, gather here' }));
store.dispatch(addDefaultChannel({ channelId: 20, channelName: 'nz', topic: 'people from new zealand, gather here' }));

store.dispatch(addChannel({ channelId: 1, channelName: 'lobby', type: 'channel', topic: 'Welcome to the lobby', isJoined: true, isCurrent: true }));


setTimeout(() => {
  store.dispatch(setConnectedSuccessfully());
}, 1000);

store.subscribe(() => {
  //console.log(store.getState());
});

// chat message test dispatches: { id, source, timestamp, message, appliedFont, appliedColor }
store.dispatch(addMessage({ messageId: 2, type: 'inbound', channelId: 1, timestamp:  getNowUnix()-17, source: '*', messageText: "A user has joined the channel" }));
// store.dispatch(addMessage({ messageId: 3, type: 'outbound', channelId: 1, timestamp: getNowUnix()-16, messageText: "Messages are injection safe <div><p><span>);\"", appliedFont: 'Kavivanar' }));
store.dispatch(addMessage({ messageId: 4, type: 'inbound', channelId: 1, timestamp:  getNowUnix()-15, source: 'Colors', messageText: "^1,0A^0,1A^1,2A^2,3A^3,4A^4,5A^5,6A^6,7A^7,8A^8,9A^9,10A^10,11A^11,12A^12,13A^13,14A^14,15A^15,16A^16,17A" }));
// store.dispatch(addMessage({ messageId: 5, type: 'inbound', channelId: 1, timestamp:  getNowUnix()-14, source: '*', messageText: "Tim has left (ping timeout: 120s)" }));
store.dispatch(addMessage({ messageId: 6, type: 'outbound', channelId: 1, timestamp: getNowUnix()-13, messageText: "A message from you, the current user", appliedFont: 'Orbitron', appliedColor: 'LightGreen' }));
// store.dispatch(addMessage({ messageId: 7, type: 'inbound', channelId: 1, timestamp:  getNowUnix()-12, source: 'Champion', messageText: "ASCII works!" }));
// store.dispatch(addMessage({ messageId: 8, type: 'inbound', channelId: 1, timestamp:  getNowUnix()-11, source: 'OSTRA-', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
// store.dispatch(addMessage({ messageId: 9, type: 'inbound', channelId: 2, timestamp:  getNowUnix()-10, source: 'TIM-', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
// store.dispatch(addMessage({ messageId: 10, type: 'inbound', channelId: 1, timestamp: getNowUnix()-9, source: 'PlayerOne', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
// store.dispatch(addMessage({ messageId: 11, type: 'inbound', channelId: 1, timestamp: getNowUnix()-8, source: 'OSTRA-', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
// store.dispatch(addMessage({ messageId: 12, type: 'inbound', channelId: 2, timestamp: getNowUnix()-7, source: 'TIM-', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
// store.dispatch(addMessage({ messageId: 13, type: 'inbound', channelId: 1, timestamp: getNowUnix()-6, source: 'ASTRA-', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
// store.dispatch(addMessage({ messageId: 14, type: 'inbound', channelId: 1, timestamp: getNowUnix()-5, source: 'OSTRA-', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
// store.dispatch(addMessage({ messageId: 15, type: 'inbound', channelId: 2, timestamp: getNowUnix()-4, source: 'TIM-', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
// store.dispatch(addMessage({ messageId: 16, type: 'inbound', channelId: 1, timestamp: getNowUnix()-3, source: 'ASTRA-', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
// store.dispatch(addMessage({ messageId: 17, type: 'inbound', channelId: 1, timestamp: getNowUnix()-2, source: 'OSTRA-', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));
// store.dispatch(addMessage({ messageId: 18, type: 'inbound', channelId: 2, timestamp: getNowUnix()-1, source: 'TIM-', messageText: "A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling. Once again, A long message that is designed to stretch the width of the window so we can test the scrollbar and fill the chat window even at a low app scaling." }));




//configure react-redux store provider
const jsx = (
  <Provider store={store}>
    <ChatApp />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
