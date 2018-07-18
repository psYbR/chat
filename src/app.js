import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { store } from './stores/store';
import ChatApp from './components/ChatApp';
import {
  setAppIsFocused
  ,unsetAppIsFocused
  ,unsetMessagesSinceNotFocused
  ,setPastedImageSize
} from './actions/actions';

//configure react-redux store provider
const jsx = (
  <Provider store={store}>
    <ChatApp />
  </Provider>
);

//handle pasting images
document.onpaste = function (event) {
  // use event.originalEvent.clipboard for newer chrome versions
  var items = (event.clipboardData  || event.originalEvent.clipboardData).items;

  // find pasted image among pasted items
  var blob = null;
  for (var i = 0; i < items.length; i++) {
    if (items[i].type.indexOf("image") === 0) {
      blob = items[i].getAsFile();
      store.dispatch(setPastedImageSize(blob.size))
    }
  }

  // load image if there is a pasted image
  if (blob !== null) {
    var reader = new FileReader();
    reader.onload = function(event) {
      //console.log(event.target.result); // data url!
      document.getElementById("pastedImage").src = event.target.result;
      document.getElementById("pastedImageContainer").style.display = 'initial';
    };
    reader.readAsDataURL(blob);
  }
}

//handle notifications in the browser tab
let notifToggle = false;
setInterval(()=>{
  if (notifToggle) {
    if (store.getState().userInterface.messagesSinceNotFocused) {
      document.title = 'New messages!';
    }
  } else {
    document.title = 'BlazeChat';
  }
  notifToggle = !notifToggle;
}, 600)
$(window).focus(() => {
  store.dispatch(unsetMessagesSinceNotFocused());
  store.dispatch(setAppIsFocused());
});
$(window).blur(() => {
  store.dispatch(unsetAppIsFocused());
});

// browser detection
//var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0; // Opera 8.0+
//var isFirefox = typeof InstallTrigger !== 'undefined'; // Firefox 1.0+
//var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)); // Safari 3.0+ "[object HTMLElementConstructor]" 
const isIE = /*@cc_on!@*/false || !!document.documentMode; // Internet Explorer 6-11
//var isEdge = !isIE && !!window.StyleMedia; // Edge 20+
//var isChrome = !!window.chrome && !!window.chrome.webstore; // Chrome 1+
//var isBlink = (isChrome || isOpera) && !!window.CSS; // Blink engine detection

// console.log("isOpera: " + isOpera)
// console.log("isFirefox: " + isFirefox)
// console.log("isSafari: " + isSafari)
// console.log("isIE: " + isIE) //aka isFilthy
// console.log("isEdge: " + isEdge)
// console.log("isChrome: " + isChrome)
// console.log("isBlink: " + isBlink)

//the content to display if using an unsupported browser
const noSupportJSX = (
  <div className='noSupportContainer'>
    <h1>Sorry</h1>
    <h2>Your web browser is not supported. Please download an alternative such as <a href="http://www.google.com/chrome">Chrome</a>.</h2>
  </div>
);


if (!isIE) {
  ReactDOM.render(jsx, document.getElementById('app'));
} else {
  ReactDOM.render(noSupportJSX, document.getElementById('app'));
}

