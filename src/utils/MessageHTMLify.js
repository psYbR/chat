import React from 'react';

export const colors = [
  { colorName: 'White', rgbValue:	'255,255,255'}, //white
  { colorName: 'Black', rgbValue:	'0,0,0'}, //black
  { colorName: 'Blue', rgbValue:	'0,0,127'}, //blue
  { colorName: 'Green', rgbValue:	'0,147,0'}, //green
  { colorName: 'LightRed', rgbValue:	'255,0,0'}, //light red
  { colorName: 'Brown', rgbValue:	'127,0,0'}, //brown
  { colorName: 'Purple', rgbValue:	'156,0,156'}, //purple
  { colorName: 'Orange', rgbValue:	'252,127,0'}, //orange
  { colorName: 'Yellow', rgbValue:	'255,255,0'}, //yellow
  { colorName: 'LightGreen', rgbValue:	'0,252,0'}, //light green
  { colorName: 'Cyan', rgbValue:	'0,147,147'}, //cyan
  { colorName: 'LightCyan', rgbValue:	'0,255,255'}, //light cyan
  { colorName: 'LightBlue', rgbValue:	'0,0,252'}, //light blue
  { colorName: 'Pink', rgbValue:	'255,0,255'}, //pink
  { colorName: 'Grey', rgbValue:	'127,127,127'}, //grey
  { colorName: 'LightGrey', rgbValue:	'210,210,210'} //light grey
]

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
//  This function returns a <p></p> tag containing the string passed in as the first parameter,
//  and adds in <font style='color: rgb(X,X,X);'> tags to recolour the text according to IRC standard
//  color codes, eg.  ^10,5 (text color 10, background color 5)
//  The second parameter is set as the element class name and any HTML characters are escaped
//

export const messageHTMLify = (message, pClassName) => {

  let messageOutgoing = [] //stores the message to be returned
  let colorChars = '';
  let bgColorChars = '';
  let tagWasOpened = false; //if a font tag was opened, close the old one first before applying a new one
  let colorOutOfBounds = false;
  let curPos = 0;
  let caretValid = true;
  let intValid = false;
  let commaValid = false;

  if (!message) {
    return false;
  } else {
    //iterate through the text
    for (var i = 0; i < message.length; i++) {

      let pass = false;

      //validate the character type
      if ((message.charAt(i) == "^") && caretValid) { //check if it's a ^
        pass = true;
      }
      if (!pass && ( (message.charAt(i) == ",")  && commaValid)) { //check if it's a ,
        pass = true;
      }    
      if (!pass && ( (!isNaN(parseInt(message.charAt(i), 10)))  && intValid)) { //check if it's a int
        pass = true;
      }

      //if the character is expected
      if (pass) {

        //reset filters
        caretValid = false;
        intValid = false;
        commaValid = false;

        //if the character was a ^
        if (curPos === 0 ) {
          curPos = 1; //got caret, now wait for first int
          intValid = true;
        }

        //if the character was the first int
        else if (curPos === 1) {
          colorChars += parseInt(message.charAt(i), 10);
          curPos = 2; //have received one valid int
          intValid = true;
          commaValid = true;
        }

        //if the character was either an int or a ,
        else if (curPos === 2) { //have received second int, or a comma
          if (!isNaN(parseInt(message.charAt(i), 10))) {

            //if the color code is < 16
            if (parseInt(message.charAt(i), 10) < 6) {
              colorChars += parseInt(message.charAt(i), 10);
            } else {
              colorChars = 0;
            }
            curPos = 3;
            commaValid = true;
          }
          else if (message.charAt(i) == ",") {
            curPos = 4;
            intValid = true;
          }
        }

        //if the character was a ,
        else if (curPos === 3) { //have received a comma
          curPos = 4;
          intValid = true;
        }

        //if the character was an int
        else if (curPos === 4) { //have received first background int
          bgColorChars += parseInt(message.charAt(i), 10);
          curPos = 5;
          intValid = true;
        }

        //if the character was another int
        else if (curPos === 5) { //second background int

          //if the color code is < 16
          if (parseInt(message.charAt(i), 10) < 6) {
            bgColorChars += parseInt(message.charAt(i), 10);
          } else {
            bgColorChars = 1;
          }
          curPos = 6;
        }

      //if the character wasn't expected
      } else { 

        //there was no color code, just a regular letter
        if (curPos === 0) {

          //escape and display it
          messageOutgoing.push(escapeHtml(message.charAt(i)));
        }

        //if there was a ^ but no ints followed it
        else if (curPos === 1) { 
          messageOutgoing.push('^'); //didn't pass test, no valid codes, dump only a caret
        }

        //if the third or fourth character wasn't an int or a comma, or if a comma wasn't followed by an int, display the single or double digit color code that we got, then display the other character
        else if (curPos === 2 || curPos === 3 || curPos === 4) { 
          if (tagWasOpened) { messageOutgoing.push('</font>'); } //if color has already been applied to the element, close the tag
          messageOutgoing.push('<font style="color:rgb(' + colors[colorChars].rgbValue + '); ">');
          tagWasOpened = true; //set to true so the above </font> tag can be added in the instance color has already been applied to this <p> element
          if (curPos === 4) {
            messageOutgoing.push(',');
          }
          messageOutgoing.push(escapeHtml(message.charAt(i)));
        }

        //if the comma was followed by one or two valid color ints
        else if (curPos === 5 || curPos === 6) {
          if (tagWasOpened) { messageOutgoing.push('</font>'); }  //if color has already been applied to the element, close the tag
          messageOutgoing.push('<font style="color:rgb(' + colors[colorChars].rgbValue + '); background-color:rgb(' + colors[bgColorChars].rgbValue + '); ">');
          tagWasOpened = true; //set to true so the above </font> tag can be added in the instance color has already been applied to this <p> element
          messageOutgoing.push(escapeHtml(message.charAt(i)));
        }

        //reset filters
        curPos = 0;
        caretValid = true;
        intValid = false;
        commaValid = false;
        colorChars = ''; bgColorChars = '';
      }
    }

    //return the array containing a combination of escaped regular characters and the HTML strings, using the React function dangerouslySetInnerHTML to parse it as HTML
    return <p className={pClassName} dangerouslySetInnerHTML={{__html: messageOutgoing.join('')}} />;
  
  }

};
