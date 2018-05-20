import React from 'react';

const ChannelTopic = (props) => {
    return (
        <div className="channelTopicContainer emphasised-container">
            <form
                className="topicForm"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
            <input
                className="topicText"
                type='text'
                value={props.channelTopic}
                onChange={(e) => {
                    return;
                }}
                spellCheck={false}
            />
            </form>
            
        </div>
    );
}

export default ChannelTopic;