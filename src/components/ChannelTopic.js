import React from 'react';
import { connect } from 'react-redux';

//props passed from parent
const ChannelTopic = (state) => (
  <div className={state.configuration.lightTheme ? "channelTopicContainer emphasised-container-light" : "channelTopicContainer emphasised-container"}>
    <form
      className="topicForm"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
    <input
      className="topicText"
      type='text'
      value={state.channels.filter(channel => channel.isCurrent)[0] ? state.channels.filter(channel => channel.isCurrent)[0].topic : ''}
      onChange={(e) => {
        return;
      }}
      spellCheck={false}
    />
    </form>
  </div>
);

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(ChannelTopic);