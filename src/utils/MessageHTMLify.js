import React from 'react';
import { colors, fonts, colorNameToRGB } from './styleInfo';
import { systemNick } from '../config';
import log from './log'

//escapes unsafe html tags
const escapeHtml = (unsafe) => {
  if (unsafe == null) {
    log('MessageHTMLify was given an undefined value for checking!');
    return 'undefined';
  }
  if (typeof unsafe.replace === "function") {
    return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
  } else {
    return typeof unsafe.replace;
  }
  
}

//  OK. So.
//
//  This function returns a set of <p></p> tags containing a chat message
//  It embeds <font style='color: rgb(X,X,X);'> tags to recolour the text/background according to any IRC standard color codes which are found within the message
//      eg.  The string: '^10,5' (text color 10, background color 5) - these colors are defined in ./utils/styleInfo.js
//  The second parameter is the element class name to use ('pMessageText' at the time of writing)
//  The third parameter is the text font as chosen by the user in the Style Modal
//  The fourth parameter is the text color as chosen by the user in the Style Modal - this defines the color of the entire message but can be overridden where applicable by IRC color codes
//  The fifth parameter is the username/nickname of the user who sent the message and is also used to determine if the message was from System (it will be an asterisk)
//

export const messageHTMLify = (message, elementClassName, font, color, source, lightTheme) => {

  message = escapeHtml(message); //filter any HTML in the message

  let messageOutgoing = ''; //holds the outgoing message that we will build

  //here we are checking for a match against the regex expression, which looks for foreground and background color codes within the chat message
  const regexBoth = RegExp(/\^[0-9]{1,2}(,[0-9]{1,2})?/g);
  let array1; //hold the matches in an array while we iterate over the message
  let previousLastIndex = 0;
  while ((array1 = regexBoth.exec(message)) !== null) { //iterate the array for each match

    let styleTags = ''; //holds the style tag that we will build

    //here we iterate the color code (eg. ^12,14) for each number (this regex matches pairs of numbers)
    const regexSub = RegExp(/[0-9]{1,2}/g);
    let array2; //hold the matches while we iterate
    let colorIsBackground = false; //if there is was a second color code provided after a comma (background color)
    while ((array2 = regexSub.exec(array1[0])) !== null) { //iterate the matches

      const color = array2[0]; //contains the matched string (color code)
      let colorRGB;
      if (colors[color]) { //check if the color code is valid in the colors array (from ./utils/styleInfo.js), otherwise use color 0
        colorRGB = colors[color].rgbValue;
      } else {
        colorRGB = colors[0].rgbValue;
      }

      if (!colorIsBackground) { //if it is the first pair of numbers in the color code
        styleTags += '<font style="color:rgb(' + colorRGB + ');">'; 
        colorIsBackground = true;
      }
      else {
        styleTags += '<font style="background-color:rgb(' + colorRGB + ');">'; //f it's the second pair of numbers
      }

    }

    messageOutgoing += message.substring(previousLastIndex, regexBoth.lastIndex - array1[0].length); //add in the first part of the message leading up the color code
    previousLastIndex = regexBoth.lastIndex; //save the index of where the color code ended (don't keep the color code in the message)
    messageOutgoing += styleTags; //add the style tags

  }

  messageOutgoing += message.substring(previousLastIndex); //assuming any tags have already been added (or there are none), add in the remainder of the message

  //set the style object of the p tag, based on the message's appliedFont and appliedColor properties. these are an overall style for the message - the color tags will override this for the specific section of the message where they are applied
  let style = {
    fontFamily: font,
    color: 'rgb(' + colorNameToRGB(color, lightTheme) + ')'
  }

  if (lightTheme) {
    style.textShadowColor = 'rgba(0, 0, 0, 0.75)'
    style.textShadowOffset = {width: -1, height: 1}
    
  }

  //override the font color for system messages
  if (source == systemNick) {
    style.color = 'rgb(255, 166, 0)';
  }

  //return the styled <p> element that will be displayed
  const output = <p
    className={elementClassName}
    style={style}
    dangerouslySetInnerHTML={{__html: messageOutgoing}} //React won't parse HTML that is returned as a parameter to prevent injection, so dangerouslySetInnerHTML is required
  />;

  return output;
  
};