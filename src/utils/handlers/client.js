import io from 'socket.io-client';
import { buildForDev } from '../../config';
if (buildForDev) {
  var socket = io('http://localhost:3000');
} else {
  var socket = io();
}
export default socket;
