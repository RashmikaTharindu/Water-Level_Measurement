import React, { useState } from 'react';
import './WaterTank.css';

const WaterTankLevel = ({ waterLevel }) => {
    const tankHeight = 200; // Adjust as needed
    const tankStyle = {
        height: `${tankHeight}px`,
    };
    const waterStyle = {
        height: `${(waterLevel / 100) * tankHeight}px`,
    };

    return (
        <div className="water-tank" style={tankStyle}>
            <div className="water-level" style={waterStyle}></div>
        </div>
    );
};

export default WaterTankLevel;
