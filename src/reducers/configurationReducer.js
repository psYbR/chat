const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_CONFIG':
      return action.configuration;
    case 'SET_TYPING_MESSAGE':
      return {
        ...state,
        typingMessage: action.configuration.typingMessage
      };
    case 'SET_WINDOW_WIDTH':
      return {
        ...state,
        windowWidth: action.configuration.windowWidth
      };
    case 'TOGGLE_USER_LIST':

      //const width = Math.round(window.innerWidth * 0.0625);
      if (state.userListOpen) {
        document.getElementsByClassName("userWindowContainer")[0].style.display = "none";
        return {
          ...state,
          userListOpen: false
        };
      } else {
        document.getElementsByClassName("userWindowContainer")[0].style.display = "flex";
        return {
          ...state,
          userListOpen: true
        };
      }

    case 'TOGGLE_CHANNEL_LIST':

      //const width = Math.round(window.innerWidth * 0.0625);
      if (state.channelListOpen) {
        document.getElementsByClassName("leftSideContainer")[0].style.display = "none";
        return {
          ...state,
          channelListOpen: false
        };
      } else {
        document.getElementsByClassName("leftSideContainer")[0].style.display = "flex";
        return {
          ...state,
          channelListOpen: true
        };
      }

    case 'HIDE_CHANNEL_LIST':
      document.getElementsByClassName("leftSideContainer")[0].style.display = "none";
      return {
        ...state,
        channelListOpen: false
      };

    case 'SHOW_CHANNEL_LIST':
      document.getElementsByClassName("leftSideContainer")[0].style.display = "flex";
        return {
          ...state,
          channelListOpen: true
        };

    case 'HIDE_USER_LIST':
      document.getElementsByClassName("userWindowContainer")[0].style.display = "none";
      return {
        ...state,
        userListOpen: false
      };

    case 'SHOW_USER_LIST':
      document.getElementsByClassName("userWindowContainer")[0].style.display = "flex";
      return {
        ...state,
        userListOpen: true
      };

    default:
      return state;
  }
};