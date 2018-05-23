import React from 'react';

const ConnectionStats = () => {
    return (
        <div className="connectionStatsContainer emphasised-container">
            <p>[CONNECTED] Ping: <span className="pingText">24ms</span></p>
        </div>
    );
}

export default ConnectionStats;