import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDeployment } from '../../actions/DeploymentActions/getDeploymentAction';

import Post from './Post';
import Spinner from '../Spinner';

class Deployment extends Component {
    componentDidMount() {
        this.props.onGetDeployment(this.props.params.idName, this.props.params.idDep);
    }
    render() {
        let isFetchingComponent = '';
        if (this.props.GetDeploymentReducer.isFetching === false) {
            isFetchingComponent =
                <Post
                    deploymentReducer={this.props.GetDeploymentReducer.data}
                    deploymentErrorMessage={this.props.GetDeploymentReducer.errorMessage}
                    idName={this.props.params.idName}
                    idDep={this.props.params.idDep}
                />;
        } else {
            isFetchingComponent = <Spinner />;
        }
        return (
            <div>
                { isFetchingComponent }
            </div>
        );
    }
}

Deployment.propTypes = {
    onGetDeployment: PropTypes.func.isRequired,
    params: PropTypes.object,
    GetDeploymentReducer: PropTypes.object,
    errorMessage: PropTypes.string
};

function mapStateToProps(state) {
    const { GetDeploymentReducer } = state;
    const { errorMessage } = GetDeploymentReducer;

    return {
        errorMessage,
        GetDeploymentReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetDeployment: (idName, idDep) => {
            dispatch(getDeployment(idName, idDep));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Deployment);
