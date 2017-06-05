import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { deleteDeployment } from '../../../actions/DeploymentActions/deleteDeploymentAction';

class Info extends Component {
    handleClickDeletingDeployment(name) {
        const { dispatch } = this.props;
        dispatch(deleteDeployment(this.props.idName, name));
        browserHistory.push('/Namespaces/' + this.props.idName);
    }
    render() {
        const statusArray = this.props.deploymentReducer.status ? Object.keys(this.props.deploymentReducer.status) : [];
        const labelsArray = this.props.deploymentReducer.labels ? Object.keys(this.props.deploymentReducer.labels) : [];
        const rollingUpdateArray = this.props.deploymentReducer.strategy ? Object.keys(this.props.deploymentReducer.strategy.rollingUpdate) : [];
        const type = this.props.deploymentReducer.strategy ? this.props.deploymentReducer.strategy.type : ''
        let rollingUpdate = '';
        rollingUpdateArray.forEach(item => {
            if (rollingUpdateArray[rollingUpdateArray.length - 1] === item) {
                rollingUpdate += item + ': ' + this.props.deploymentReducer.strategy.rollingUpdate[item];
            } else {
                rollingUpdate += item + ': ' + this.props.deploymentReducer.strategy.rollingUpdate[item] + ', ';
            }
        });
        const name = this.props.deploymentReducer.name ? this.props.deploymentReducer.name : '';
        const nameFirstChar = name.substring(0, 1).toUpperCase();
        const statusAvailable = this.props.deploymentReducer.status ? this.props.deploymentReducer.status.available : 1;
        const CPU = this.props.deploymentReducer.cpu * statusAvailable;
        const RAM = this.props.deploymentReducer.ram * statusAvailable;
        return (
            <div className="container-fluid pt-3">
                <div className="row">
                    <div className="col-12">
                        <div className="card mt-3">
                            <div className="card-block c-table-card-block">
                                <table className="table">
                                    <tbody>
                                    <tr>
                                        <td className="i-td-card-font-name">
                                            {name}
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className="text-right">
                                            <div className="btn-group">
                                                <button className="btn btn-sm c-table-card-btn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="md-icon">more_horiz</i>
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-right i-dropdown-box-shadow" aria-labelledby="dropdownMenu2">
                                                    <button className="dropdown-item text-danger" type="button" onClick={name => this.handleClickDeletingDeployment(this.props.deploymentReducer.name)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <svg className="c-table-card-img-old i-table-card-img mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.78 33.25">
                                                <g>
                                                    <path className="cls-deployments" d="M5383.94,530.28l8.57-14.84a2,2,0,0,0,0-1.78l-8.56-14.85a2,2,0,0,0-1.54-.89h-17.14a2,2,0,0,0-1.54.89l-8.57,14.84a2,2,0,0,0,0,1.78l8.56,14.84a2,2,0,0,0,1.54.89h17.14A2,2,0,0,0,5383.94,530.28Z" transform="translate(-5354.94 -497.92)"/>
                                                </g>
                                                <text className="cls-2" textAnchor="middle" x="50%" y="70%">{nameFirstChar}</text>
                                            </svg>
                                        </td>
                                        <td>
                                            CPU: {CPU} <br/>
                                            RAM: {RAM} MB <br/>
                                            Replicas: {this.props.deploymentReducer.replicas}
                                        </td>
                                        <td>
                                            Status <br/>
                                            {statusArray.map((item, index) =>  {
                                                return (
                                                    <span key={index}>{this.props.deploymentReducer.status[item]} {item}<br/></span>
                                                );
                                            })}
                                        </td>
                                        <td>
                                            Labels <br/>
                                            {labelsArray.map((item, index) =>  {
                                                return (
                                                    <span key={index}>{item}: {this.props.deploymentReducer.labels[item]}<br/></span>
                                                );
                                            })}
                                        </td>
                                        <td>
                                            Strategy: {type}<br/>
                                            Rolling update strategy: {rollingUpdate}<br/>
                                            Creation time: {this.props.deploymentReducer.created_at} <br/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Info.propTypes = {
    idName: PropTypes.string,
    deploymentReducer: PropTypes.object
};

function mapStateToProps (state) {
    const { DeleteDeploymentReducer } = state;
    const { errorMessage } = DeleteDeploymentReducer;

    return {
        DeleteDeploymentReducer,
        errorMessage
    }
}

export default connect(mapStateToProps)(Info)
