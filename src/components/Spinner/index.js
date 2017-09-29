import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Spinner.css';
import ErrorModal from '../ErrorModal';

class Spinner extends Component {
    constructor() {
        super();
        this.state = {
            isTimeOver: false
        };
    }
    componentWillMount() {
        const timer = setTimeout(() => {
            this.setState({ isTimeOver: true });
        }, 10000);
        this.setState({ timer });
    }
    componentWillUnmount() {
        this.setState({ isTimeOver: false });
        clearTimeout(this.state.timer);
    }
    render() {
        return (
            <div>
                <div id="spinner" className="spinner">Loading&#8230;</div>
                <ErrorModal modalIsOpen={this.state.isTimeOver} />
            </div>
        );
    }
}

Spinner.propTypes = {
    isFetching: PropTypes.bool
};

export default Spinner;
