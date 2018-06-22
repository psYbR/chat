import io from 'socket.io-client';
import { localDev } from '../../config';
const socket = io(localDev);
export default socket;
