import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import { deleteDeployment } from '../../actions/DeploymentActions/deleteDeploymentAction';
import Notification from '../../components/Notification';

class PostsDeploymentsContainer extends Component {
    handleClickTR(href) {
        browserHistory.push('/Namespaces/' + this.props.idName + '/Deployments/' + href);
    }
    handleClickDeletingDeployment(name) {
        const { dispatch } = this.props;
        dispatch(deleteDeployment(this.props.idName, name));
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.DeleteDeploymentReducer.status === 202 && nextProps.DeleteDeploymentReducer.deploymentName) {
            const id = `item_${nextProps.DeleteDeploymentReducer.deploymentName}`;
            const el = document.getElementById(id);
            el ? el.remove() : el;
        }
    }
    render() {
        return (
            <div>
                <Notification
                    status={this.props.DeleteDeploymentReducer.status}
                    name={this.props.DeleteDeploymentReducer.deploymentName}
                    errorMessage={this.props.DeleteDeploymentReducer.errorMessage}
                />
                <div className="container-fluid pt-3 pb-5">
                    <h5>Deployments</h5>
                    <div className="row">
                        <div className="col-12">
                            <div className="card i-card-border mt-3">
                                <div className="card-block c-table-card-block">
                                    <div className="table table-hover c-table-card i-table-card">
                                        <div className="i-table-tbody">
                                            {
                                                this.props.PostsDeploymentsDataReducer.map((item) => {
                                                    const imagesList = item.images.join();
                                                    const name = item.name;
                                                    const nameFirstChar = name.substring(0, 1).toUpperCase();
                                                    const cpu = item.cpu * item.pods_active;
                                                    const ram = item.ram * item.pods_active;
                                                    const id = `item_${name}`;
                                                    return (
                                                        <div className="i-row-table tr-hover" key={id} id={id}>
                                                            <div className="i-td-table" onClick={href => this.handleClickTR(item.name)}>
                                                                <svg className="c-table-card-img mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.78 33.25">
                                                                    <g>
                                                                        <path className="cls-deployments" d="M5383.94,530.28l8.57-14.84a2,2,0,0,0,0-1.78l-8.56-14.85a2,2,0,0,0-1.54-.89h-17.14a2,2,0,0,0-1.54.89l-8.57,14.84a2,2,0,0,0,0,1.78l8.56,14.84a2,2,0,0,0,1.54.89h17.14A2,2,0,0,0,5383.94,530.28Z" transform="translate(-5354.94 -497.92)"/>
                                                                    </g>
                                                                    <text className="cls-2" textAnchor="middle" x="50%" y="70%">{nameFirstChar}</text>
                                                                </svg>
                                                                {name}
                                                            </div>
                                                            <div className="i-td-table i-td-table-pd-top" onClick={href => this.handleClickTR(item.name)}>{item.pods_active}/{item.pods_limit} Pods</div>
                                                            <div className="i-td-table i-td-table-pd-top" onClick={href => this.handleClickTR(item.name)}>{cpu} CPU</div>
                                                            <div className="i-td-table i-td-table-pd-top" onClick={href => this.handleClickTR(item.name)}>{ram} MB RAM</div>
                                                            <div className="i-td-table i-td-table-pd-top" onClick={href => this.handleClickTR(item.name)}>{imagesList}</div>
                                                            <div className="i-td-table text-right">
                                                                <div className="btn-group">
                                                                    <button className="btn btn-sm c-table-card-btn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <i className="md-icon">more_horiz</i>
                                                                    </button>
                                                                    <div className="dropdown-menu dropdown-menu-right i-dropdown-box-shadow" aria-labelledby="dropdownMenu2">
                                                                        <button className="dropdown-item text-danger" onClick={name => this.handleClickDeletingDeployment(item.name)} type="button">Delete</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PostsDeploymentsContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    PostsDeploymentsDataReducer: PropTypes.array,
    idName: PropTypes.string
};

function mapStateToProps (state) {
    const { DeleteDeploymentReducer } = state;
    const { errorMessage } = DeleteDeploymentReducer;

    return {
        DeleteDeploymentReducer,
        errorMessage
    }
}

export default connect(mapStateToProps)(PostsDeploymentsContainer)
