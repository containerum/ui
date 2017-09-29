import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDeployment } from '../../actions/DeploymentActions/getDeploymentAction';
import { deleteDeployment } from '../../actions/DeploymentActions/deleteDeploymentAction';

import Spinner from '../Spinner';
import HeaderDropDown from '../HeaderDropDown';
import DeploymentInfo from './DeploymentInfo';
import DeploymentContains from './DeploymentContains';
import Notification from '../Notification';

class Deployment extends Component {
    componentDidMount() {
        // if (!this.props.GetDeploymentReducer.data.length) {
            this.props.onGetDeployment(this.props.params.idName, this.props.params.idDep);
        // }
    }
    handleDeleteDeployment(idDep) {
        // console.log(this.props.params.idName, idDep);
        this.props.onDeleteDeployment(this.props.params.idName, idDep);
    }
    render() {
        let isFetchingDeploymentInfo = '';
        if (this.props.GetDeploymentReducer.isFetching === false) {
            isFetchingDeploymentInfo =
                <DeploymentInfo
                    idName={this.props.params.idName}
                    onDeleteDeployment={(idDep) => this.handleDeleteDeployment(idDep)}
                />;
        } else {
            isFetchingDeploymentInfo = <Spinner />;
        }
        return (
            <div>
                <HeaderDropDown
                    idName={this.props.params.idName}
                    idDep={this.props.params.idDep}
                />
                <Notification
                    status={this.props.DeleteDeploymentReducer.status}
                    name={this.props.DeleteDeploymentReducer.deploymentName}
                    errorMessage={this.props.DeleteDeploymentReducer.errorMessage}
                />
                { isFetchingDeploymentInfo }
                <DeploymentContains
                    children={this.props.children}
                />
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
        GetDeploymentReducer,
        DeleteDeploymentReducer: state.DeleteDeploymentReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetDeployment: (idName, idDep) => {
            dispatch(getDeployment(idName, idDep));
        },
        onDeleteDeployment: (idName, idDep) => {
            dispatch(deleteDeployment(idName, idDep));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Deployment);
