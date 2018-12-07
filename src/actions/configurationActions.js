export const setConfiguration = (
  {

    defaultFont = 'Source Sans Pro',
    defaultColor = 'default',
    isAway = false,
    showSystemMessages = true,
    lightTheme = false,
    activeTheme = 0

  } = {}
) => ({

  type: 'SET_CONFIGURATION',
  configuration: {
    defaultFont,
    defaultColor,
    isAway,
    showSystemMessages,
    lightTheme,
    activeTheme
  }

});

export const setTheme = (theme) => {
  if (theme === 0) {
    document.body.style.color = "rgb(38,38,38)";
  } else if (theme === 1) {
    document.body.style.color = "rgb(205,215,197)";
  }
  return({
    type: 'SET_THEME',
    theme
  })
};

export const setDarkTheme = () => {
  document.body.style.color = "rgb(205,215,197)";
  return ({
    type: 'SET_DARK_THEME'
  })
};

export const setLightTheme = () => {
  document.body.style.color = "rgb(38,38,38)";
  return({
    type: 'SET_LIGHT_THEME'
  })
};


export const setFontStyle = ( defaultFont = 'Source Sans Pro' ) => ({
  type: 'SET_FONT_STYLE',
  configuration: {
    defaultFont
  }
});

export const setFontColor = ( defaultColor = 'default' ) => ({
  type: 'SET_FONT_COLOR',
  configuration: {
    defaultColor
  }
});

export const hideSystemMessages = () => ({
  type: 'HIDE_SYSTEM_MESSAGES'
});

export const showSystemMessages = () => ({
  type: 'SHOW_SYSTEM_MESSAGES'
});