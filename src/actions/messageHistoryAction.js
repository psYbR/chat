
import { getNowUnix } from '../utils/dateUtils';

export const addMessageToHistory = (message) => {
  console.log("Outbound message: " + message);
  return {
    type: 'ADD_MESSAGE_TO_HISTORY',
    message: {
      message,
      timestamp: getNowUnix()
    }
  }
};

