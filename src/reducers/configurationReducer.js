const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_CONFIGURATION':
      return action.configuration;
    case 'SET_DARK_THEME':
      return {
        ...state,
        lightTheme: false
      }
    case 'SET_LIGHT_THEME':
      return {
        ...state,
        lightTheme: true
      }
    case 'SET_FONT_STYLE':
      return {
        ...state,
        defaultFont: action.configuration.defaultFont
      }
    case 'SET_FONT_COLOR':
      return {
        ...state,
        defaultColor: action.configuration.defaultColor
      }
    case 'HIDE_SYSTEM_MESSAGES':
      return {
        ...state,
        showSystemMessages: false
      }
    case 'SHOW_SYSTEM_MESSAGES':
      return {
        ...state,
        showSystemMessages: true
      }
    default:
      return state;
  }
};
