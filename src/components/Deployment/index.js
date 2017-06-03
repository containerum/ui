import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDeployment } from '../../actions/DeploymentActions/getDeploymentAction';
import { getPods } from '../../actions/PodsActions';

import Post from './Post';
import Spinner from '../Spinner';

class Deployment extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getDeployment(this.props.params.idName, this.props.params.idDep));
        dispatch(getPods(this.props.params.idName, this.props.params.idDep));
    }
    render() {
        let isFetchingComponent = "";
        if (this.props.GetDeploymentReducer.isFetching === false) {
            isFetchingComponent =
                <Post
                    deploymentReducer={this.props.GetDeploymentReducer.data}
                    errorMessage={this.props.GetDeploymentReducer.errorMessage}
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
    const { GetDeploymentReducer } = state;
    const { errorMessage } = GetDeploymentReducer;

    return {
        errorMessage,
        GetDeploymentReducer
    }
}

export default connect(mapStateToProps)(Deployment)
