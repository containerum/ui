import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import Spinner from '../Spinner';
import DeploymentsContains from './DeploymentsContains';
import Notification from '../Notification';
// import NotFoundDeployments from './NotFoundDeployments';
import { getDeployments } from '../../actions/DeploymentsActions';
import { deleteDeployment } from '../../actions/DeploymentActions/deleteDeploymentAction';

class Deployments extends Component {
    componentDidMount() {
	    this.props.onGetDeployments(this.props.params.idName);
    }
	componentWillReceiveProps(nextProps) {
		if (this.props.params.idName !== nextProps.params.idName) {
			this.props.onGetDeployments(nextProps.params.idName);
		}
	}
    handleDeleteDeployment(idDep) {
        // console.log(this.props.params.idName, idDep);
        this.props.onDeleteDeployment(this.props.params.idName, idDep);
    }
    render() {
        return (
            <div>
                 <Notification
                     status={this.props.DeleteDeploymentReducer.status}
                     name={this.props.DeleteDeploymentReducer.deploymentName}
                     errorMessage={this.props.DeleteDeploymentReducer.errorMessage}
                 />
                <DeploymentsContains
                    idName={this.props.params.idName}
                    onDeleteDeployment={(idDep) => this.handleDeleteDeployment(idDep)}
                />
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
