import React from 'react';
import { connect } from 'react-redux';
import { hideStyleModal, setAppZoom, showChannelModal } from '../actions/userInterfaceActions';
import { hideSystemMessages, showSystemMessages, setFontColor } from '../actions/configurationActions';
import { colors, fonts } from '../utils/styleInfo';
import FontPicker from './FontPicker';

class StyleModal extends React.Component {
  constructor(props) {
    super(props);
  }
  handleMoreOptionsClick = (e) => {
    e.preventDefault();
  }
  render() {
    return (
      
      <div className="SMWrapper emphasised-container">
        <div className="SMContainer ">

          <div className="SMColors">
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
                <div className="SMbutton">
                <span
                  style={{background: 'rgb(' + color.rgbValue + ')' }}
                  className={this.props.configuration.defaultColor == color.colorName ? "SMColorSelected" : ""}
                ></span></div>
              </label>
            ) }
          </div>
          
          <div className="SMFonts">
            <h3>Font Style</h3>
            <FontPicker
              label="select one"
              fonts={fonts}
              previews={true}
              activeColor="#64B5F6"
              value={this.props.configuration.defaultFont}
            /> 
          </div>

          <div className="SMOptions">
            <h3>Options</h3>

            {/* set nickname placeholder */}

            <div className='SMSystemMessages'>
              <p>Show system messages?</p>
              <label className="checkBoxContainer">
                <input
                  type="checkbox"
                  checked={this.props.configuration.showSystemMessages ? "checked" : ''}
                  onChange={() => {
                    if (this.props.configuration.showSystemMessages) { this.props.dispatch(hideSystemMessages()); }
                    else { this.props.dispatch(showSystemMessages()); }
                  }}
                />
                <span className="checkBoxCheckmark"></span>
              </label>
            </div>

            {/* <div className='SMMoreOptionsContainer'>
              <h3><a href=""
                onClick={this.handleMoreOptionsClick}
              >More Options </a></h3>
            </div> */}

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