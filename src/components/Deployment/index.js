import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDeployment } from '../../actions/DeploymentActions';
import Post from './Post';
import Spinner from '../Spinner';

class Deployment extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getDeployment(this.props.params.idName, this.props.params.idDep));
    }
    render() {
        let isFetchingComponent = "";
        if (this.props.DeploymentReducer.isFetching === false) {
            isFetchingComponent =
                <Post
                    deploymentReducer={this.props.DeploymentReducer.data}
                    errorMessage={this.props.DeploymentReducer.errorMessage}
                    idName={this.props.params.idName}
                    idDep={this.props.params.idDep}
                />
        } else {
            isFetchingComponent = <Spinner />
        }
        return (
            <div>
                { isFetchingComponent }
            </div>
        );
    }
}

Deployment.propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

function mapStateToProps (state) {
    const { DeploymentReducer } = state;
    const { errorMessage } = DeploymentReducer;

    return {
        errorMessage,
        DeploymentReducer
    }
}

export default connect(mapStateToProps)(Deployment)
