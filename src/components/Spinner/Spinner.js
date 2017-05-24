import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Spinner.css';

class Spinner extends Component {
    render() {
        return (
            <div id="spinner" className="spinner">Loading&#8230;</div>
        );
    }
}

Spinner.propTypes = {
    isFetching: PropTypes.bool
};

export default Spinner;
