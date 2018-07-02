import React from 'react';
import { connect } from 'react-redux';

const ConnectionStats = (state) => {
    return (
        <div className="connectionStatsContainer emphasised-container">
            <p>{state.userInterface.appIsConnected ? "[CONNECTED]" : "[DISCONNECTED]"} Ping: <span
                className={state.userInterface.ping < 50 ? "ping-good" : (state.userInterface.ping < 250 ? "ping-ok" : "ping-bad")}
            >{state.userInterface.ping}ms</span></p>
        </div>
    );
}

const mapStateToProps = (state) => {
    return state;
};
export default connect(mapStateToProps)(ConnectionStats);