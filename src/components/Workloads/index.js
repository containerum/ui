import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Deployments from '../Deployments';
import Services from '../Services';
import Namespaces from '../../components/Namespaces';
// import CreateInstance from '../../components/CreateInstance';

class Workloads extends Component {
    componentWillMount() {
        document.body.classList.remove('c-body-bg');
    }
    render() {
        return (
            <div>
                <div>
                    <div className="navbar navbar-toggleable-md navbar-light bg-faded">
                        <Namespaces />
                        {/* <CreateInstance /> */}
                    </div>
                </div>
                <Deployments idName={this.props.params.idName} />
                <Services idName={this.props.params.idName} />
            </div>
        );
    }
}

Workloads.propTypes = {
    params: PropTypes.object
};

export default Workloads;
