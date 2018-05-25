import React from 'react';

//props passed from parent
const ChannelTopic = ({ channelTopic }) => {
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
                value={channelTopic}
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