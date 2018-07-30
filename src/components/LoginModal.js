import React from 'react';
import { connect } from 'react-redux';
import {
  setLoginModalVisibleTab
  ,setLightTheme
  ,setDarkTheme 
} from '../actions/actions';

import LoginGuestForm from './LoginGuestForm';
import LoginUserForm from './LoginUserForm';
import DefaultChannelPicker from './DefaultChannelPicker';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      
      <div className="modalWrapper">
        <div className="modalBlurContainer">
        </div>
        <div className="modalOuterContainer">
          <div className={"modalInnerContainer" + (this.props.configuration.lightTheme ? " modalInnerContainer-light" : "")}>

            <div className="tabContainer">
              <div className={"guestTab tab" + (this.props.userInterface.loginModalVisibleTab == 0 ? " tabSelected" : "") + (this.props.configuration.lightTheme ? " tabSelected-light" : "")}
              onClick={()=>{this.props.dispatch(setLoginModalVisibleTab(0))}}>
                <h1>Guest</h1>
              </div>
              <div className={"loginTab tab" + (this.props.userInterface.loginModalVisibleTab == 1 ? " tabSelected" : "") + (this.props.configuration.lightTheme ? " tab-light" : "")}
              onClick={()=>{this.props.dispatch(setLoginModalVisibleTab(1))}}>
                <h1>Login</h1>
                <div className="loginTabBadges">
                  <i className="fas fa-envelope-square"></i>
                  <i className="fab fa-facebook-square"></i>
                  <i className="fab fa-google-plus-square"></i>
                </div>
              </div>
            </div>

            {/* <p>Theme: <a className={this.props.configuration.lightTheme ? "a-light" : ""} onClick={() => {this.props.dispatch(setLightTheme())}}>Light</a> 
            <a className={this.props.configuration.lightTheme ? "a-light" : ""} onClick={() => {this.props.dispatch(setDarkTheme())}}>Dark</a></p> */}

            {this.props.userInterface.loginModalVisibleTab == 1 && 
              <LoginUserForm />
            }

            {this.props.userInterface.loginModalVisibleTab == 0 && 
              <LoginGuestForm />
            }

            <div className="containerChannelPicker">
              <DefaultChannelPicker />
            </div>

          </div>
        </div>
      </div>
    );
  };
}

export default connect((state)=>{return state})(LoginModal);