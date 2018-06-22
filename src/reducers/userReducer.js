const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      //if the user exists
      if (state.filter(user =>
        user.userId == action.user.userId
      ).length > 0) {
        //grab the user object from the state
        const toReturn = state.map((user)=>{
          if (user.userId == action.user.userId) {
            //add the channel ID to their channel array and return the object
            return {
              ...user,
              channels: [
                ...channels,
                action.channel
              ]
            }
          }
          //otherwise just return the object
          else {
            return user;
          }
        })
        console.log(toReturn);
        return toReturn;
      //if they don't exist then add the channel ID to the passed in user object and return it to the state
      } else {
        let user = action.user;
        user.channels.push(action.channel)
        const toReturn = [
          ...state,
          user
        ];
        console.log(toReturn);
        return toReturn;
      }
    case 'REMOVE_USER':
      return state.map((user) => {
        if (user.userId == action.userId) {
          if (user.channels.includes(action.channel)) {
            if (user.channels.length < 2) {
              return;
            } else {
              return {
                ...user,
                channels: user.channels.filter( channel => channel != action.channel)
              }
            }
          } else {
            return user;
          }
        } else {
          return user;
        }
      });
    case 'SET_GROUP_OF_USER':
      return state.map((user) => {
        if (user.userId == action.userId) {
          return {
            ...user,
            group: action.group
          };
        } else {
          return user;
        }
      })
    case 'SET_NICK_OF_USER':
      return state.map((user) => {
        if (user.userId == action.userId) {
          return {
            ...user,
            nick: action.nick
          };
        } else {
          return user;
        }
      })
    case 'SET_SELECTED_USER':
      return state.map((user) => {
        if (user.userId == action.userId) {
          return {
            ...user,
            isSelected: true
          }
        } else {
          return {
            ...user,
            isSelected: false //return false here because we only want one user to be selected at any time
          }
        }
      })
    case 'SET_USER_IS_AWAY':
      return state.map((user) => {
        if (user.userId == action.userId) {
          return {
            ...user,
            isAway: true
          }
        } else {
          return user
        }
      })
    case 'SET_USER_IS_NOT_AWAY':
      return state.map((user) => {
        if (user.userId == action.userId) {
          return {
            ...user,
            isAway: false
          }
        } else {
          return user
        }
      })
    case 'SET_USER_IS_BLOCKED':
      return state.map((user) => {
        if (user.userId == action.userId) {
          return {
            ...user,
            isBlocked: true
          }
        } else {
          return user
        }
      })
    case 'SET_USER_IS_NOT_BLOCKED':
      return state.map((user) => {
        if (user.userId == action.userId) {
          return {
            ...user,
            isBlocked: false
          }
        } else {
          return user
        }
      })
    case 'ADD_USER_TO_CHANNEL':
      return state.map((user) => {
        if (user.userId == action.userId) {
          return {
            ...user,
            channels: [...channels, action.channelId]
          }
        } else {
          return user
        }
      })
    case 'REMOVE_USER_FROM_CHANNEL':
      return state.map((user) => {
        if (user.userId == action.userId) {
          return {
            ...user,
            channels: channels.filter(channel => channel != action.channelId)
          }
        } else {
          return user
        }
      })
    case 'FLUSH_USER_LIST':
      return reducerDefaultState
    default:
      return state;
  }
};