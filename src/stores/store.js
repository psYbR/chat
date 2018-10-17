import { createStore, combineReducers } from 'redux';
import channelReducer from '../reducers/channelReducer';
import messageReducer from '../reducers/messageReducer';
import configurationReducer from '../reducers/configurationReducer';
import userReducer from '../reducers/userReducer';
import userInterfaceReducer from '../reducers/userInterfaceReducer';
import loginReducer from '../reducers/loginReducer';
import adminChannelReducer from '../reducers/adminChannelReducer';
import { buildForDev } from '../config';
import {
  setUIState,
  setLoginState,
  setConfiguration
} from '../actions/actions';

//CREATE STORE
const configureStore = () => {

  const reducers = {
    channels: channelReducer,
    messages: messageReducer,
    configuration: configurationReducer,
    users: userReducer,
    userInterface: userInterfaceReducer,
    loginState: loginReducer,
    adminChannels: adminChannelReducer
  };
  
  if (buildForDev) {
    var store = createStore(combineReducers(reducers), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ); //enables the REDUX plugin to talk to the corresponding Chrome extension
  } else {
    var store = createStore(combineReducers(reducers));
  }

  return store;
  
};

export const store = configureStore();

// populate the state with default values
store.dispatch(setUIState());
store.dispatch(setConfiguration());
store.dispatch(setLoginState());

