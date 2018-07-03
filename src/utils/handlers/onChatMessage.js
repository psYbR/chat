import { store } from '../../stores/store';
import { addMessage } from '../../actions/actions';

//handle incoming chat messages
const onChatMessage = (msg) => {
  store.dispatch(addMessage({...msg, messageSent: true}));
};

export default onChatMessage;