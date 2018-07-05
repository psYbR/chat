import { store } from '../../stores/store';
import {
  addMessage
  ,setChannelHasNotifs
  ,setChannelHasNewMessages
  ,setChannelHasMention
  ,setMessagesSinceNotFocused
} from '../../actions/actions';
import getCurrentChannel from '../getCurrentChannel';
import { systemNick } from '../../config';

//handle incoming chat messages
const onChatMessage = (msg) => {
  store.dispatch(addMessage({...msg, messageSent: true}));
  //set notifications for messages in other channels
  if (msg.channelId != getCurrentChannel()) {
    //if the message was a system message
    if (msg.source == systemNick) {
      store.dispatch(setChannelHasNotifs(msg.channelId));
    }
    //if the message was a regular message
    else {
      store.dispatch(setChannelHasNewMessages(msg.channelId));
    }
    //if the message mentions the user's nick in it
    if (msg.messageText.includes(store.getState().loginState.nick)) {
      store.dispatch(setChannelHasMention(msg.channelId));
    }
  }
  //if the window isn't focused and the message was a message or a mention
  if (!store.getState().userInterface.appIsFocused && msg.source != systemNick) {
    store.dispatch(setMessagesSinceNotFocused());
  }

};

export default onChatMessage;