import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ErrorDeployment from '../ErrorDeployment';
import { getPods } from '../../../actions/PodsActions';

class DeploymentRoute extends Component {
    render() {
        let isErrorContainer = '';
        if (this.props.DeploymentErrorMessage) {
            isErrorContainer = <ErrorDeployment errorMessage={this.props.DeploymentErrorMessage} />;
        } else {
            isErrorContainer =
                <PostDeploymentContainer
                    deploymentReducer={this.props.deploymentReducer}
                    PodsReducer={this.props.PodsReducer}
                    idDep={this.props.idDep}
                    idName={this.props.idName}
                />;
        }
        return (
            <div>
                { isErrorContainer }
            </div>
        );
    }
}

DeploymentRoute.propTypes = {
    onGetPods: PropTypes.func,
    deploymentReducer: PropTypes.object,
    PodsReducer: PropTypes.object,
    DeploymentErrorMessage: PropTypes.string,
    idName: PropTypes.string,
    idDep: PropTypes.string
};

function mapStateToProps(state) {
    const { PodsReducer } = state;
    const { errorMessage } = PodsReducer;

    return {
        errorMessage,
        PodsReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetPods: (idName, idDep) => {
            dispatch(getPods(idName, idDep));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeploymentRoute);
