export const maxTimestamp = 1893456000000; //the maximum timestamp (ms) allowed on messages for sanity checking. 1893456000000 = 01/01/2030 @ 12:00am (UTC)
export const maxMessageLength = 510; //IRC standard (512 including trailing CR)
export const nickMinLength = 3;
export const nickMaxLength = 20;

//uncomment and use 'npm run serve' to host the client separate to the server (faster client rebuild)
export const localDev = 'http://localhost:3000';