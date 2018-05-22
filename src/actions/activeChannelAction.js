// activeChannel: {
//     id: 0,
//     channelName: '',
//     channelTopic: '',
//     numberOfUsers: 0,
//     numberOfOps: 0
//   }

export const activeChannelAction = (
  {
    id = 0,
    numberOfUsers = 0,
    numberOfOps = 0
  } = {}
) => ({
  type: 'SET_ACTIVE_CHANNEL',
  activeChannel: {
    id,
    numberOfUsers,
    numberOfOps
  }
});