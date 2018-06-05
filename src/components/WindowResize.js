//called every time the window is resized - dispatches the window size to the store so components can do things with it

//NOTE - these breakpoints are also defined in ./styles/base/settings.scss
//                                        and  ./actions/configurationAction.js
const horizontalBreakPoint = 50; //rem
const verticalBreakPoint = 20; //rem

let toggledShow = false;
let toggledHide = false;

import React from 'react';
import { connect } from 'react-redux';
import { setWindowWidth, setWindowHeight, hideChannelList, hideUserList, showChannelList, showUserList } from '../actions/userInterfaceActions';

class windowResize extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(props) {
        window.addEventListener("resize", () =>{

            // I TRIED to get this callback into a method of the component, but it will NOT pass the props into it... a fat arrow function is the only way to remain within scope of 'this'
            const widthRem = Math.floor(window.innerWidth * 0.0625);
            if (this.props.state.userInterface.windowWidth != widthRem) {

                this.props.dispatch(setWindowWidth(widthRem));

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

export default connect(mapStateToProps)(windowResize);