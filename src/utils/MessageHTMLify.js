import React from 'react';
import { colors, fonts, colorNameToRGB } from './styleInfo';

//escapes unsafe html tags
const escapeHtml = (unsafe) => {
  return unsafe
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");
}

//
//  This function returns a <p> tag containing a chat message
//  it adds in <font style='color: rgb(X,X,X);'> tags to recolour the text/background according to any IRC standard color codes supplied in the message
//  eg.  ^10,5 (text color 10, background color 5) - these colors are defined in ./utils/styleInfo.js
//  second parameter is the element class name to use
//  third parameter is the text font
//  fourth parameter is the text color
//  fifth is the username/nickname of who sent the message and is used to determine if the message was from System
//

export const messageHTMLify = (message, elementClassName, font, color, source) => {

  message = escapeHtml(message); //filter any HTML in the message

  let messageOutgoing = ''; //holds the outgoing message that we will build

  //here we are checking for a match against the regex expression, which looks for foreground and background color codes within the chat message
  const regexBoth = RegExp(/\^[0-9]{1,2}(,[0-9]{1,2})?/g);
  let array1; //hold the matches in an array while we iterate over the message
  let previousLastIndex = 0;
  while ((array1 = regexBoth.exec(message)) !== null) { //iterate the array for each match

    const code = array1[0]; //contains the matched string (color code)
    const start = regexBoth.lastIndex - array1[0].length; //get the starting index in the message of the color code
    const end = regexBoth.lastIndex; //get the end index in the message of the color code
    let styleTags = ''; //holds the style tag that we will build

    //here we iterate the color code (eg. ^12,14) for each number (the regex matches pairs of numbers)
    const regexSub = RegExp(/[0-9]{1,2}/g);
    let array2; //hold the matches while we iterate
    let colorIsBackground = false; //if there is was a second color code provided after a comma (background color)
    while ((array2 = regexSub.exec(code)) !== null) { //iterate the matches

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

    messageOutgoing += message.substring(previousLastIndex, start); //add in the first part the message leading up the color code
    previousLastIndex = regexBoth.lastIndex; //save the index of where the color code ended
    messageOutgoing += styleTags; //add the style tags to proceed the rest of the message

  }

  messageOutgoing += message.substring(previousLastIndex); //assuming any tags have already been added (or there are none), add in the remainder of the message

  //set the style object of the p tag, based on the message's appliedFont and appliedColor properties
  const style = {
    fontFamily: font,
    color: 'rgb(' + colorNameToRGB(color) + ')'
  }

  //override the font color for system messages
  if (source == '*') {
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