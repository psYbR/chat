/* ----------------------------------------------------------------

Description of Store Structure:
  Action Generators
    these are functions that generate an action request, which is returned as an object.
  Reducer
    reducers describe how the application state changes in response to an action.
    reducers are pure functions - they cannot make calls or use/modify variables from outside the function scope.
    they should never change the state or the action objects that are passed in.
  Selectors
    serve as util functions for actions.

Setting up a Store:
  First thing to do is lay out a demo state object for the entire app. eg. below.
  Split up the state object into its root objects/arrays and then;
  Build reducers. Reducers should respond to actions and return the new structure of the application state as an object.
  Include reducers in this file (store.js).
  Call combineReducers with an object containing all of the app reducers (eg below) to combine them into the store.
  To use the actions, include them in the target component and call their exported functions.
  include Provider from 'react-redux' in root .js file
  The Store Provider needs to be added to app route by having react.render call <Provider store={store}/>, which will
  gather the app components under it to include them in the store.

Deconstructing Component Props:
  spread out props by calling <Component {...props} />
  Then use on component by stating Component = ({ var, var, var }) => {}

Connect React Components:
  we need to pass in a function as the parameter to connect()
  the store state gets passed into that function as first argument
  the function needs to return an object which is passed to the component as props
  that is where we can get the info from the app state that is desired

Subscribing to Store Changes:
  calling store.subscribe() and passing in a function will cause that function to be run upon any changes
  the return value of store.subscribe() is the unsubscribe function, so setting const unsubscribe = store.subscribe()
  will mean you can simply call unsubscribe(); to end the subscription

 ----------------------------------------------------------------  */

import { createStore, combineReducers } from 'redux';
import inboundMsgReducer from '../reducers/inboundMsgReducer';
import outboundMsgReducer from '../reducers/outboundMsgReducer';
import activeChannelReducer from '../reducers/activeChannelReducer';
import currentChannelsReducer from '../reducers/currentChannelsReducer';
import configurationReducer from '../reducers/configurationReducer';
import messageHistoryReducer from '../reducers/messageHistoryReducer';

//CREATE STORE
export default () => {

  const store = createStore(combineReducers({
    inboundMessages: inboundMsgReducer,
    outboundMessages: outboundMsgReducer,
    activeChannel: activeChannelReducer,
    currentChannels: currentChannelsReducer,
    configuration: configurationReducer,
    messageHistory: messageHistoryReducer
  }),
    //enables the REDUX plugin to talk to the corresponding Chrome extension
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};

//DEMO STATE OBJECT
const demoState = {
  inboundMessages: [{
    id: 0,
    channelId: 0,
    source: '*',
    timestamp: '',
    message: '',
    appliedFont: '',
    appliedColor: -1
  }],
  outboundMessages: [{
    id: 0,
    channelId: 0,
    timstamp: '',
    message: '',
    appliedFont: '',
    appliedColor: -1
  }],
  configuration: {
    loggedIn: false,
    userid: 0,
    username: 'Guest',
    defaultFont: 'Inconsolata',
    defaultColor: -1,
    assignedGroup: 'guests',
    defaultChannel: 'welcome',
    isAway: false,
    showSystemMessages: true,
    typingMessage: ''
  },
  visibleUsers: [{
    id: 0,
    channelId: 0,
    username: '',
    assignedGroup: 'guests',
    isAway: false,
    isSelected: false,
    isSelf: false
  }],
  currentChannels: [{
    id: 0,
    channelName: '',
    type: 'channel', // 'user'
    topic: '',
    isSelected: false,
    isCurrent: false,
    isJoined: false,
    hasNewMessages: false,
    hasNewNotifs: false,
    amOp: false,
    amMod: false,
    amVoice: false
  }],
  activeChannel: {
    id: 0,
    channelName: '',
    channelTopic: '',
    numberOfUsers: 0,
    numberOfOps: 0
  }
};
