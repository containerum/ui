import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import Info from './Info';
import PodsList from './PodsList';
import TabOfObject from '../../components/TabOfObject';
import Namespaces from '../../components/Namespaces';
import CreateInstance from '../../components/CreateInstance';

class Deployment extends Component {
    render() {
        return (
            <div>
                <div className="navbar navbar-toggleable-md navbar-light bg-faded">
                    <Namespaces idDep={this.props.params.idDep} />
                    <CreateInstance />
                </div>
                <TabOfObject />
                <Info />
                <PodsList />
            </div>
        );
    }
}

// Deployment.propTypes = {
//     dispatch: PropTypes.func.isRequired,
//     errorMessage: PropTypes.string
// };
//
// function mapStateToProps (state) {
//     const { DeploymentReducer } = state;
//     const { errorMessage } = DeploymentReducer;
//
//     return {
//         errorMessage,
//         DeploymentReducer
//     }
// }
//
// export default connect(mapStateToProps)(Deployment)

export default Deployment
