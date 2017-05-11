import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Spinner.css';

class Spinner extends Component {
    componentDidMount() {
        if(this.props.isFetching) {
            document.getElementById('spinner').classList.add('spinner-show');
        } else {
            document.getElementById('spinner').classList.remove('spinner-show');
        }
    }
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
