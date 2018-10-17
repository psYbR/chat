import React from 'react';
import { connect } from 'react-redux';
import { setLightTheme ,setDarkTheme, setLoggedIn } from '../actions/actions';
import { setAppReady } from '../utils/setAppState'
import LoginGuestForm from './LoginGuestForm';
import LoginUserForm from './LoginUserForm';
import LoginCreateForm from './LoginCreateForm';
import DefaultChannelPicker from './DefaultChannelPicker';

import { FadeTransform } from 'react-animation-components'

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      fadeOut: false,
      accountWasCreated: false
    }
  }
  unmount = () => {
    this.setState({
      ...this.state,
      fadeOut: true
    })
    this.props.dispatch(setLoggedIn())
    setTimeout(()=>{
      setAppReady();
    },150)
  }
  goToLoginTab = () => {
    this.setState({
      ...this.state,
      activeTab: 1,
      accountWasCreated: true
    })
  }
  render() {
    return (

      <div className={"modal-wrapper" + (this.state.fadeOut ? ' modal-fade-out' : "")}>

        <FadeTransform in transformProps={{enterTransform: 'translateY(1.5rem)', exitTransform: 'translateY(-1.5rem)'}}>
        
          <div className="modal-outer-container">
            <div className={"modal-inner-container" + (this.props.configuration.lightTheme ? " modal-inner-container-light" : "")}>

              <div className="tab-container">

                <div className={"guestTab tab" + (this.state.activeTab == 0 ? (this.props.configuration.lightTheme ? " tab-selected-light" : " tab-selected") : (this.props.configuration.lightTheme ? " tab-light" : ""))}
                onClick={()=>{
                  this.setState({
                    ...this.state,
                    activeTab: 0
                  })
                }}>
                  <h1>Guest</h1>
                </div>

                <div className={"loginTab tab" + (this.state.activeTab == 1 ? (this.props.configuration.lightTheme ? " tab-selected-light" : " tab-selected") : (this.props.configuration.lightTheme ? " tab-light" : ""))}
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

                <div className={"guestTab tab" + (this.state.activeTab == 2 ? (this.props.configuration.lightTheme ? " tab-selected-light" : " tab-selected") : (this.props.configuration.lightTheme ? " tab-light" : ""))}
                onClick={()=>{
                  this.setState({
                    ...this.state,
                    activeTab: 2
                  })
                }}>
                  <h1>Register</h1>
                </div>

              </div>

              <p>Theme: <a className={this.props.configuration.lightTheme ? "a-light" : ""} onClick={() => {this.props.dispatch(setLightTheme())}}>Light</a> 
              <a className={this.props.configuration.lightTheme ? "a-light" : ""} onClick={() => {this.props.dispatch(setDarkTheme())}}>Dark</a></p>

              {this.state.activeTab == 0 && 
                <FadeTransform in duration={100} transformProps={{enterTransform: 'translateY(1.5rem)', exitTransform: 'translateY(-1.5rem)'}}>
                  <div className="login-option-container">
                    <LoginGuestForm unmount={this.unmount} />
                  </div>
                </FadeTransform>
              }

              {this.state.activeTab == 1 && 
                <FadeTransform in duration={100} transformProps={{enterTransform: 'translateY(1.5rem)', exitTransform: 'translateY(-1.5rem)'}}>
                  <div className="login-option-container">
                    <LoginUserForm unmount={this.unmount} accountWasCreated={this.state.accountWasCreated} />
                  </div>
                </FadeTransform>
              }

              {this.state.activeTab == 2 && 
                <FadeTransform in duration={100} transformProps={{enterTransform: 'translateY(1.5rem)', exitTransform: 'translateY(-1.5rem)'}}>
                  <div className="login-option-container">
                    <LoginCreateForm goToLoginTab={this.goToLoginTab} />
                  </div>
                </FadeTransform>
              }

              {this.state.activeTab < 2 && 
                <div className="containerChannelPicker">
                  <DefaultChannelPicker />
                </div>
              }

            </div>
          </div>
      
          </FadeTransform>
      </div>
    );
  };
}

export default connect((state)=>{return state})(LoginModal);