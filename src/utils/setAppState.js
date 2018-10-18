import { socket } from '../utils/handlers/client';
import { store } from '../stores/store';
import {
  unblurApp
  ,unsetLoginModalVisible
} from '../actions/actions';

//call after initial log in
export const setAppReady = () => {

  store.dispatch(unblurApp());
  store.dispatch(unsetLoginModalVisible());

}