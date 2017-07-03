import React, { Component } from 'react';

import './MiniSpinner.css';

class MiniSpinner extends Component {
    render() {
        return (
            <span id="mini-spinner" className="mini-spinner">Loading&#8230;</span>
        );
    }
}

export default MiniSpinner;
