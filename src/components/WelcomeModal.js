import React from 'react';
import { connect } from 'react-redux';
import { setUserNick, setLoggedIn } from '../actions/configurationAction';


class WelcomeModal extends React.Component {
  constructor(props) {
      super(props);
  }
  onGuestNickSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(setLoggedIn());
  }
  onGuestNickChange = (e) => {
    const nick = e.target.value;
    if (!nick || nick.match( /^[a-zA-Z0-9_-]*$/ )) {
      /* REGEX breakdown:
        / : regex wrapper
        ^ : start of string
        [ : beginning of character group
        a-z : any lowercase letter
        A-Z : any uppercase letter
        0-9 : any digit
        _ : underscore
        - : hyphen
        ] : end of character group
        * : zero or more of the given characters
        $ : end of string
        / : regex wrappery
      */
      this.props.dispatch(setUserNick(nick));
    }
  }
  render() {
    return (
      
      <div className="ModalWrapper">
        <div className="WelcomeBlurContainer">
        </div>
        {console.log(this.props)}
        <div className="WelcomeModalOuterContainer">
          <div className="WelcomeModalInnerContainer">

            {/*TABS*/}
            <div className="tabContainer">
              <div className="guestTab tab tabSelected">
                <h1>Guest</h1>
              </div>
              <div className="loginTab tab">
                <h1>Login</h1>
                <div className="loginTabBadges">
                  <i className="fas fa-envelope-square"></i>
                  <i className="fab fa-facebook-square"></i>
                  <i className="fab fa-google-plus-square"></i>
                </div>
              </div>
            </div>

            {/*CONTENT*/}
            <div className="guestNickEntry">
              <form className="guestNickInputForm" onSubmit={this.onGuestNickSubmit}>
                <input 
                  className="guestNickInput"
                  type='text'
                  placeholder="Enter a nickname"
                  onChange={this.onGuestNickChange}
                  value={this.props.configuration.username || ''} //the input can't have an initial state of undefined or React will issue a warning
                  spellCheck="false"
                />
                <button
                  className='guestNickSubmitButton' 
                  disabled={!this.props.configuration.username}
                >Start chatting</button>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(WelcomeModal);