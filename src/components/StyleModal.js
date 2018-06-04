import React from 'react';
import { connect } from 'react-redux';
import { hideStyleModal, showStyleModal } from '../actions/userInterfaceActions';
import { colors } from '../utils/MessageHTMLify';

class StyleModal extends React.Component {
  constructor(props) {
    super(props);
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(setLoggedIn());
  }
  onChange = (e) => {
    const nick = e.target.value;
    this.props.dispatch(setLoggedIn(nick));
  }
  render() {
    return (
      
      <div className="StyleModalWrapper">
        <div className="StyleModalContainer">

          { /* Draw the color selector 'dots' */ colors.map((color, i) => 
            <label className={"SM" + color.colorName} key={i}>
              <input className="SMinput" type="radio" name="color" value={color.colorName} />
              <div className="SMlayer"></div>
              <div className="SMbutton"><span style={{background: 'rgb(' + color.rgbValue + ')' }}></span></div>
            </label>
          ) }
        
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(StyleModal);