export const maxTimestamp = 1893456000000; //the maximum timestamp (ms) allowed on messages for sanity checking. 1893456000000 = 01/01/2030 @ 12:00am (UTC)
export const maxMessageLength = 510; //IRC standard (512 including trailing CR)
export const nickMinLength = 3;
export const nickMaxLength = 20;
export const systemNick = '*'; //the nickname of messages which originate from the System
export const maxPastedImageSize = 1800000; //max size in bytes of images that can be pasted (1800kb)
export const logLevel = 2; // 1 = all messages, 2 = error messages and chat messages only, 3 = chat messages only, 4 = no logging

//set to false for production
export const buildForDev = true;