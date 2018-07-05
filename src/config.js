export const maxTimestamp = 1893456000000; //the maximum timestamp (ms) allowed on messages for sanity checking. 1893456000000 = 01/01/2030 @ 12:00am (UTC)
export const maxMessageLength = 510; //IRC standard (512 including trailing CR)
export const nickMinLength = 3;
export const nickMaxLength = 20;
export const systemNick = '*'; //the nickname of messages which originate from the System
export const maxPastedImageSize = 800000; //max size in bytes of images that can be pasted (800kb)

//set to false for production
export const buildForDev = true;