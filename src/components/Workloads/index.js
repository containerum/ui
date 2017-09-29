import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import Namespaces from '../Namespaces';

class Workloads extends Component {
    componentWillMount() {
        document.body.classList.remove('c-body-bg');
    }
    render() {
        return (
            <div>
                <div className="content-block">
                    <div className="container no-back">
                        <Namespaces />
                    </div>
                </div>
            </div>
        );
    }
}

Workloads.propTypes = {
    location: PropTypes.object
};

export default Workloads;
