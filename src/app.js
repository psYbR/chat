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
  //,setPastedImageSize
} from './actions/actions';
import Welcome from './Welcome';
import { FadeTransform } from 'react-animation-components'

console.log("__________ .__                                   .__               __   ")
console.log("\\______   \\|  |  _____   ________  ____    ____  |  |__  _____   _/  |_ ")
console.log(" |    |  _/|  |  \\__  \\  \\___   /_/ <> \\ _/ ___\\ |  |  \\ \\__  \\  \\   __\\")
console.log(" |    |   \\|  |__ / <> \\_ /  __/ \\  ___/ \\  \\___ |   \\  \\ / <> \\_ |  |  ")
console.log(" |______  /|____/(____  //_____ \\ \\___  \\ \\___  ||___|__/(______/ |__|  ")
console.log("        \\/            \\/       \\/     \\/      \\/   (C) BlazeChat 2018")
console.log("")

// browser detection
//var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0; // Opera 8.0+
//var isFirefox = typeof InstallTrigger !== 'undefined'; // Firefox 1.0+
//var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)); // Safari 3.0+ "[object HTMLElementConstructor]" 
const isIE = /*@cc_on!@*/false || !!document.documentMode; // Internet Explorer 6-11
//var isEdge = !isIE && !!window.StyleMedia; // Edge 20+
//var isChrome = !!window.chrome && !!window.chrome.webstore; // Chrome 1+
//var isBlink = (isChrome || isOpera) && !!window.CSS; // Blink engine detection

class ApplicationBase extends React.Component {
  constructor() {
    super();
    this.state = {
      displayMode: 'welcome',
      fadeOutWelcome: false
    }
  }
  setWelcomeFadeout = () => {
    this.setState({
      ...this.state,
      fadeOutWelcome: true
    })
    setTimeout(()=>{
      this.setState({displayMode:'app'});
    }, 150)
  }
  componentWillMount(){
    if (isIE) {
      this.setState({displayMode:'IE'})
    }
  }
  render() {
    if (this.state.displayMode == 'welcome') {
      return (
        <FadeTransform in transformProps={{enterTransform: 'translateY(1.5rem)',exitTransform: 'translateY(-1.5rem)'}}>
          <Welcome fadeOut={this.setWelcomeFadeout} fadingOut={this.state.fadeOutWelcome} />
        </FadeTransform>
      )
    } else if (this.state.displayMode == 'app') {
      return (
        <Provider store={store}>
          <ChatApp />
        </Provider>
      )
    } else if (this.state.displayMode == 'IE') {
      return (
        <div className='noSupportContainer'>
          <h1>Sorry</h1>
          <h2>Your web browser is not supported. Please download an alternative such as <a href="http://www.google.com/chrome">Chrome</a>.</h2>
        </div>
      )
    }
  }
}

//handle pasting images


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

ReactDOM.render(<ApplicationBase />, document.getElementById('app'));
