import React from 'react';
import { connect } from 'react-redux';
import { hideChannelModal, channelPickerFirstTab, channelPickerSecondTab } from '../actions/userInterfaceActions';
import DefaultChannelPicker from './DefaultChannelPicker';
import { setJoinDefaultChannels } from '../actions/userInterfaceActions';

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="ModalWrapper">
        <div className="ModalBlurContainer">
        </div>
        <div className="ModalOuterContainer">
            <div className="ModalInnerContainer">

              <div className="tabContainer">
                <div className="defaultTab tab tabSelected"
                  onClick={(e) => {
                    this.props.dispatch(channelPickerFirstTab());
                  }}
                >
                  <h1>Default Channels</h1>
                </div>
                <div className="userTab tab"
                  onClick={(e) => {
                    this.props.dispatch(channelPickerSecondTab());
                  }}
                >
                  <h1>User Channels</h1>
                </div>
              </div>
              
              {!this.props.userInterface.channelPickerSecondTab &&
                <div className="ContainerChannelPicker">
                  <DefaultChannelPicker />
                </div>}

              {this.props.userInterface.channelPickerSecondTab && <h1>Second tab</h1>}

              <button
                    className='guestNickSubmitButton'
                    //check that the user has picked at least one channel and entered a nick before enabling the button
                    onClick={(e) => {
                      this.props.dispatch(setJoinDefaultChannels());
                      this.props.dispatch(hideChannelModal());
                    }}
                  >OK</button>
              
            </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Modal);