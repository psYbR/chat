import { store } from '../../stores/store';
import { addMessage } from '../../actions/actions';

//handle incoming chat messages
const onChatMessage = (msg) => {
  store.dispatch(addMessage({...msg, messageSent: true}));
    if (msg.channelId == store.getState().userInterface.activeChannelId) {
      $('.chatMessageContainer').stop().animate({
        scrollTop: $('.chatMessageContainer')[0].scrollHeight
      }, 800);
    }
};

export default onChatMessage;