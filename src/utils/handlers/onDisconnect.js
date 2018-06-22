import { store } from '../../stores/store';
import {
  updatePing,
  setDisconnected,
  setDisconnectionReason,
  startWaitForNickAcceptance,
  setAllChannelsWasJoined
} from '../../actions/actions';

//
// handle disconnections and errors
//

const handleDisconnect = (reason) => {
  store.dispatch(updatePing('--'));
  store.dispatch(setDisconnected());
  store.dispatch(setDisconnectionReason(reason));
  store.dispatch(startWaitForNickAcceptance());
  store.dispatch(setAllChannelsWasJoined());
}

export default handleDisconnect;