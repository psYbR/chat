import React from 'react';
import { connect } from 'react-redux';
import { unsetChannelModalVisible } from '../actions/actions';
import ChannelPicker from './ChannelPicker';
import requestJoinDefaultChannels from '../utils/handlers/requestJoinDefaultChannels';

// to do:
// pretty much all of the below.

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDefaultChannels: true
    }
  }
  render() {
    return (
      <div className="modal-wrapper">

        <div className="modal-outer-container">
          <div className="modal-inner-container channelPickerContainer">

            <div className="tab-container">

              <div className={"tab defaultTab" + (this.state.showDefaultChannels ? " tab-selected" : "")}
                onClick={(e) => {
                  this.setState({
                    ...state,
                    showDefaultChannels: true
                  })
                }}
              >
                <h1 className="channelPickerTabTitle">Default Channels</h1>
              </div>

              <div className={"tab userTab" + (!this.state.showDefaultChannels ? " tab-selected" : "")}
                onClick={(e) => {

                  this.setState({
                    ...state,
                    showDefaultChannels: false
                  })

                  // trigger request to retreive full public channel list

                }}
              >
                <h1 className="channelPickerTabTitle">User Channels</h1>
              </div>
            </div>
            
            <div className="ContainerChannelPicker">
              <ChannelPicker showDefaultChannels={this.state.showDefaultChannels} />
            </div>

            <button
              className='channelPickerButton'
              onClick={(e) => {
                //actions depends on which tab is active
                if (this.state.showDefaultChannels) {
                  requestJoinDefaultChannels(this.props, this.props.dispatch);
                  this.props.dispatch(unsetChannelModalVisible());
                } else {
                  //requestToJoinUserChannels(this.props.state, this.props.dispatch);
                  this.props.dispatch(unsetChannelModalVisible());
                }
              }}
            >OK</button>
            
          </div>
        </div>
      </div>
    );
  };
}

export default connect(state=>state)(Modal);