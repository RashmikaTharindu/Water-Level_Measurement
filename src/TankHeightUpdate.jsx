import React, { useState } from 'react';

function WaterTankHeightUpdater() {
    const [waterTankHeight, setWaterTankHeight] = useState(0);
    const [newHeight, setNewHeight] = useState('');

    const handleInputChange = (event) => {
        setNewHeight(event.target.value);
    };

    const handleAddHeight = () => {
        // Validate if the input is a number before updating the state
        const parsedHeight = parseFloat(newHeight);
        if (!isNaN(parsedHeight)) {
            setWaterTankHeight(parsedHeight);
            setNewHeight('');
        } else {
            // Handle invalid input (not a number)
            alert('Please enter a valid number for the height.');
        }
    };

    return (
        <div style={outerFrameStyle}>
            <div style={containerStyle}>
                <h2 style={headerStyle}>Water Tank Height: {waterTankHeight}</h2>
                <input
                    type="number"
                    value={newHeight}
                    placeholder="Enter new height"
                    onChange={handleInputChange}
                    style={inputStyle}
                />
                <button onClick={handleAddHeight}>Add</button>
            </div>
        </div>
    );
}

// Styles
const containerStyle = {
    textAlign: 'center',
    margin: '20px',
};

const headerStyle = {
    color: '#007BFF',
    fontSize: '24px',
};

const inputStyle = {
    padding: '8px',
    fontSize: '16px',
};

const outerFrameStyle = {
    border: '1px solid #ddd', // Add a border to create an outer frame
    borderRadius: '8px', // Optional: Add border-radius for rounded corners
    padding: '20px',
    width: '300px', // Optional: Set a specific width
    margin: 'auto', // Center the component on the page
};

export default WaterTankHeightUpdater;
