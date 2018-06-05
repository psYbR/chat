
export const setConfiguration = (
  {

    defaultFont = 'Source Sans Pro',
    defaultColor = 'default',
    isAway = false,
    showSystemMessages = true

  } = {}
) => ({

  type: 'SET_CONFIGURATION',
  configuration: {
    defaultFont,
    defaultColor,
    isAway,
    showSystemMessages
  }

});

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