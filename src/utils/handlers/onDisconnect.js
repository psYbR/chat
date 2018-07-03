import { store } from '../../stores/store';
import {
  setPing,
  setDisconnected,
  setDisconnectionReason,
  setWaitingForNickAcceptance,
  setAllChannelsWasJoined
} from '../../actions/actions';

//
// handle disconnections and errors
//

const handleDisconnect = (reason) => {
  store.dispatch(setPing('--'));
  store.dispatch(setDisconnected());
  store.dispatch(setDisconnectionReason(reason));
  store.dispatch(setWaitingForNickAcceptance());
  store.dispatch(setAllChannelsWasJoined());
}

export default handleDisconnect;