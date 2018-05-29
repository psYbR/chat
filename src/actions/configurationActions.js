
export const setConfiguration = (
  {

    defaultFont = 'default',
    defaultColor = '-1',
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
