import React from 'react';
import { connect } from 'react-redux';
import {
  setLightTheme
  ,setDarkTheme
} from '../actions/actions';

import LoginGuestForm from './LoginGuestForm';
import LoginUserForm from './LoginUserForm';
import DefaultChannelPicker from './DefaultChannelPicker';

import { FadeTransform } from 'react-animation-components'

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    }
  }
  render() {
    return (

      <div className="modalWrapper">
        <div className="modalBlurContainer">
        </div>

        <FadeTransform in transformProps={{enterTransform: 'translateY(1.5rem)',exitTransform: 'translateY(-1.5rem)'}}>
        
          <div className="modalOuterContainer">
            <div className={"modalInnerContainer" + (this.props.configuration.lightTheme ? " modalInnerContainer-light" : "")}>

              <div className="tabContainer">
                <div className={"guestTab tab" + (this.state.activeTab == 0 ? " tabSelected" : "") + (this.props.configuration.lightTheme ? " tabSelected-light" : "")}
                onClick={()=>{
                  this.setState({
                    ...this.state,
                    activeTab: 0
                  })
                }}>
                  <h1>Guest</h1>
                </div>
                <div className={"loginTab tab" + (this.state.activeTab == 1 ? " tabSelected" : "") + (this.props.configuration.lightTheme ? " tab-light" : "")}
                onClick={()=>{
                  this.setState({
                    ...this.state,
                    activeTab: 1
                  })
                }}>
                  <h1>Login</h1>
                  {/* <div className="loginTabBadges"> //Login tab badges
                    <i className="fas fa-envelope-square"></i>
                    <i className="fab fa-facebook-square"></i>
                    <i className="fab fa-google-plus-square"></i>
                  </div> */}
                </div>
              </div>

              {/* <p>Theme: <a className={this.props.configuration.lightTheme ? "a-light" : ""} onClick={() => {this.props.dispatch(setLightTheme())}}>Light</a> 
              <a className={this.props.configuration.lightTheme ? "a-light" : ""} onClick={() => {this.props.dispatch(setDarkTheme())}}>Dark</a></p> */}

              {this.state.activeTab == 1 && 
                <div className="loginOptionContainer">
                  {this.state.createAccount == 1 ? 
                    <LoginCreateForm /> :
                    <LoginUserForm />
                  }
                </div>
              }

              {this.state.activeTab== 0 && 
                <LoginGuestForm />
              }

              <div className="containerChannelPicker">
                <DefaultChannelPicker />
              </div>

            </div>
          </div>
      
          </FadeTransform>
      </div>
    );
  };
}

export default connect((state)=>{return state})(LoginModal);