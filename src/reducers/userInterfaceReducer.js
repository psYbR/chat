const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_UI_STATE':
      return action.userInterface;
    case 'HIDE_STYLE_MODAL':
      return {
        ...state,
        styleSelectionIsVisible: false
      };
    case 'SHOW_STYLE_MODAL':
      return {
        ...state,
        styleSelectionIsVisible: true
      };
    case 'SET_INPUT_FIELD_TEXT':
      return {
        ...state,
        inputFieldText: action.userInterface.inputFieldText
      };
    case 'SET_WINDOW_WIDTH':
      return {
        ...state,
        windowWidth: action.userInterface.windowWidth
      };
      
    case 'SET_ACTIVE_CHANNEL':
      return {
        ...state,
        activeChannelId: action.userInterface.activeChannelId,
        activeChannelNumberOfUsers: action.userInterface.activeChannelNumberOfUsers,
        activeChannelNumberOfOps: action.userInterface.activeChannelNumberOfOps
      }

    case 'UPDATE_USER_STATS':
      return {
        ...state,
        activeChannelNumberOfUsers: action.userInterface.activeChannelNumberOfUsers,
        activeChannelNumberOfOps: action.userInterface.activeChannelNumberOfOps
      }

    case 'UPDATE_PING':
      return {
        ...state,
        currentPing: action.userInterface.currentPing
      }
      
    case 'TOGGLE_USER_LIST':
      if (state.userListVisible) {
        document.getElementsByClassName("userWindowContainer")[0].style.display = "none";
        return {
          ...state,
          userListVisible: false
        };
      } else {
        document.getElementsByClassName("userWindowContainer")[0].style.display = "flex";
        return {
          ...state,
          userListVisible: true
        };
      }

    case 'TOGGLE_CHANNEL_LIST':
      if (state.channelListVisible) {
        document.getElementsByClassName("leftSideContainer")[0].style.display = "none";
        return {
          ...state,
          channelListVisible: false
        };
      } else {
        document.getElementsByClassName("leftSideContainer")[0].style.display = "flex";
        return {
          ...state,
          channelListVisible: true
        };
      }

    case 'HIDE_CHANNEL_LIST':
      document.getElementsByClassName("leftSideContainer")[0].style.display = "none";
      return {
        ...state,
        channelListVisible: false
      };

    case 'SHOW_CHANNEL_LIST':
      document.getElementsByClassName("leftSideContainer")[0].style.display = "flex";
        return {
          ...state,
          channelListVisible: true
        };

    case 'HIDE_USER_LIST':
      document.getElementsByClassName("userWindowContainer")[0].style.display = "none";
      return {
        ...state,
        userListVisible: false
      };

    case 'SHOW_USER_LIST':
      document.getElementsByClassName("userWindowContainer")[0].style.display = "flex";
      return {
        ...state,
        userListVisible: true
      };

    default:
      return state;
  }
};