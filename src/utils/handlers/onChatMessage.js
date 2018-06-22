import { store } from '../stores/store';
//addMessage*

//handle incoming chat messages
const onChatMessage = (msg) => {
  store.dispatch(addMessage({...msg, messageSent: true}));
  // setTimeout(()=>{
    if (msg.channelId == store.getState().userInterface.activeChannelId) {
      $('.chatMessageContainer').stop().animate({
        scrollTop: $('.chatMessageContainer')[0].scrollHeight
      }, 800);
    }
  // }, 0)
};

export default onChatMessage;