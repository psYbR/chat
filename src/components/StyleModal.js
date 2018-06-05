import React from 'react';
import { connect } from 'react-redux';
import { hideStyleModal, showStyleModal, setAppZoom } from '../actions/userInterfaceActions';
import { hideSystemMessages, showSystemMessages, setFontColor } from '../actions/configurationActions';
import { colors, fonts } from '../utils/styleInfo';
import FontPicker from './FontPicker';

class StyleModal extends React.Component {
  constructor(props) {
    super(props);
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(setLoggedIn());
  }
  onFontChange = (e) => {
    console.log(e.target);
    //const nick = e.target.value;
    //this.props.dispatch(setLoggedIn(nick));
  }
  render() {
    return (
      
      <div className="StyleModalWrapper emphasised-container">
        <div className="StyleModalContainer ">

          <div className="StyleModalColors">
            <h3>Font Color</h3>
            { /* Draw the color selector 'dots' */ colors.map((color, i) => 
              <label key={i}>
                <input className="SMinput" type="radio" name="color" value={color.colorName}
                  onClick={(e) => {
                    //console.log(e.target.value);
                    this.props.dispatch(setFontColor(e.target.value));
                  }}
                />
                <div className="SMlayer"></div>
                <div className="SMbutton"><span style={{background: 'rgb(' + color.rgbValue + ')' }}></span></div>
              </label>
            ) }
          </div>
          
          <div className="StyleModalFonts">
            <h3>Font Style</h3>
            <FontPicker
              label="select one"
              fonts={fonts}
              previews={true}
              activeColor="#64B5F6"
              value={this.props.configuration.defaultFont}
            /> 
          </div>

          <div className="StyleModalOptions">
            <h3>Options</h3>

            <div className="ZoomButtonsContainer">
              <button
                className="ZoomButtons"
                onClick={(e) => {
                  const newZoom = this.props.userInterface.appZoom - 0.1
                  this.props.dispatch(setAppZoom(newZoom));
                  document.documentElement.style.zoom = newZoom;
                }}>
                <i className="fas fa-minus"></i>
              </button>
              <p>zoom</p>
              <button
                className="ZoomButtons"
                onClick={(e) => {
                  const newZoom = this.props.userInterface.appZoom + 0.1
                  this.props.dispatch(setAppZoom(newZoom));
                  document.documentElement.style.zoom = newZoom;
                }}>
                <i className="fas fa-plus"></i>
              </button>

              <p>Show system messages?</p>
                
              <label className="ShowSystemContainer">
                <input
                  type="checkbox"
                  checked={this.props.configuration.showSystemMessages ? "checked" : ''}
                  onChange={() => {
                    if (this.props.configuration.showSystemMessages) { this.props.dispatch(hideSystemMessages()); }
                    else { this.props.dispatch(showSystemMessages()); }
                  }}
                />
                <span className="ShowSystemCheckmark"></span>
              </label>

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

export default connect(mapStateToProps)(StyleModal);