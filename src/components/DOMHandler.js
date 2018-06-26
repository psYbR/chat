//
// called every time the window is resized - dispatches the window size to the store so components can do things with it
//

//NOTE - these breakpoints are also defined in ./styles/base/settings.scss
//                                        and  ./actions/configurationAction.js
const horizontalBreakPoint = 50; //rem
//const verticalBreakPoint = 20; //rem

import React from 'react';
import { connect } from 'react-redux';
import {
  setWindowWidth,
  //setWindowHeight,
  hideChannelList,
  hideUserList,
  showChannelList,
  showUserList
} from '../actions/actions';

class DOMHandler extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(props) {
    //listen for resizing of the DOM
    window.addEventListener("resize", () =>{
      //get the width of the window
      const widthRem = Math.floor(window.innerWidth * 0.0625);
      //if the width has changed
      if (this.props.state.userInterface.windowWidth != widthRem) {
        //update the width in the State
        this.props.dispatch(setWindowWidth(widthRem));
        //if the width exceeds the breakpoint
        if (widthRem < horizontalBreakPoint) {
          this.props.dispatch(hideChannelList());
          this.props.dispatch(hideUserList());
        }
        else if (widthRem > horizontalBreakPoint) {
          this.props.dispatch(showChannelList());
          this.props.dispatch(showUserList());
        }
      }
    });
  }
  render() {
    return false; 
  }
};

const mapStateToProps = (state) => ({
  state
});

export default connect(mapStateToProps)(DOMHandler);