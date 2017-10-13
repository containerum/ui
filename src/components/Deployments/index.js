import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../Spinner';
import DeploymentsContains from './DeploymentsContains';
import Notification from '../Notification';
import NotFoundDeployments from './NotFoundDeployments';
import { getDeployments } from '../../actions/DeploymentsActions';
import { deleteDeployment } from '../../actions/DeploymentActions/deleteDeploymentAction';

class Deployments extends Component {
    componentDidMount() {
        // console.log(this.props.DeploymentsReducer.data);
        this.props.onGetDeployments(this.props.params.idName);
    }
    componentWillReceiveProps(nextProps) {
        // console.log(this.props.params.idName);
        if (this.props.DeploymentsReducer.data === nextProps.DeploymentsReducer.data &&
            this.props.params.idName !== nextProps.params.idName) {
            this.props.onGetDeployments(nextProps.params.idName);
        }
    }
    handleDeleteDeployment(idDep) {
        // console.log(this.props.params.idName, idDep);
        this.props.onDeleteDeployment(this.props.params.idName, idDep);
    }
    render() {
        let isFetchingDeploymentsContains = '';
        if (this.props.DeploymentsReducer.isFetching === false) {
            // console.log(this.props.DeploymentsReducer);
            if (this.props.DeploymentsReducer.data.length === 0 || this.props.DeploymentsReducer.statusError === 404) {
                isFetchingDeploymentsContains = <NotFoundDeployments />;
            } else {
                isFetchingDeploymentsContains =
                    <DeploymentsContains
                        idName={this.props.params.idName}
                        onDeleteDeployment={(idDep) => this.handleDeleteDeployment(idDep)}
                    />;
            }
        } else {
            isFetchingDeploymentsContains = <Spinner />;
        }
        return (
            <div>
                 <Notification
                     status={this.props.DeleteDeploymentReducer.status}
                     name={this.props.DeleteDeploymentReducer.deploymentName}
                     errorMessage={this.props.DeleteDeploymentReducer.errorMessage}
                 />
                { isFetchingDeploymentsContains }
            </div>
        );
    }
}

Deployments.propTypes = {
    params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        DeploymentsReducer: state.DeploymentsReducer,
        DeleteDeploymentReducer: state.DeleteDeploymentReducer
    };

}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetDeployments: (idName) => {
            dispatch(getDeployments(idName));
        },
        onDeleteDeployment: (idName, idDep) => {
            dispatch(deleteDeployment(idName, idDep));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Deployments);
