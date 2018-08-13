import React from 'react';
import { connect } from 'react-redux';

//props passed from parent
class ChannelTopic extends React.Component {
  constructor(props) {
    super(props)
  }
  render = () => (
    <div className={"channel-topic-container" + (this.props.configuration.lightTheme ? " emphasised-container-light" : " emphasised-container")}>
    <form
      className="topic-form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
    <input
      className={"topic-text" + (this.props.configuration.lightTheme ? " topic-text-light" : "")}
      type='text'
      value={this.props.channels.filter(channel => channel.isCurrent)[0] ? this.props.channels.filter(channel => channel.isCurrent)[0].topic : ''}
      onChange={(e) => {
        return;
      }}
      spellCheck={false}
    />
    </form>
  </div>
  )
}

export default connect(state=>state)(ChannelTopic);