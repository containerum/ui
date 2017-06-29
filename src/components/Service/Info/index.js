import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { deleteService } from '../../../actions/ServiceActions/deleteServiceAction';
import Notification from '../../Notification';

class Info extends Component {
    handleClickDeletingService(name) {
        const { dispatch } = this.props;
        dispatch(deleteService(this.props.idName, name));
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.DeleteServiceReducer.status === 202 && nextProps.DeleteServiceReducer.serviceName) {
            browserHistory.push('/Namespaces/' + this.props.idName);
        }
    }
    render() {
        const labelsArray = this.props.serviceReducer.labels ? Object.keys(this.props.serviceReducer.labels) : [];
        const domain_hosts = this.props.serviceReducer.domain_hosts ? this.props.serviceReducer.domain_hosts : [];
        const ports = this.props.serviceReducer.ports ? this.props.serviceReducer.ports : [];
        const name = this.props.serviceReducer.name ? this.props.serviceReducer.name : '';
        const nameFirstChar = name.substring(0, 1).toUpperCase();

        return (
            <div>
                <Notification
                    status={this.props.DeleteServiceReducer.status}
                    name={this.props.DeleteServiceReducer.serviceName}
                    errorMessage={this.props.DeleteServiceReducer.errorMessage}
                />
                <div className="container-fluid pt-3 pb-5">
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
                                                        <button className="dropdown-item text-danger" type="button" onClick={name => this.handleClickDeletingService(this.props.serviceReducer.name)}>
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
                                                        <path className="cls-services" d="M5383.94,530.28l8.57-14.84a2,2,0,0,0,0-1.78l-8.56-14.85a2,2,0,0,0-1.54-.89h-17.14a2,2,0,0,0-1.54.89l-8.57,14.84a2,2,0,0,0,0,1.78l8.56,14.84a2,2,0,0,0,1.54.89h17.14A2,2,0,0,0,5383.94,530.28Z" transform="translate(-5354.94 -497.92)"/>
                                                    </g>
                                                    <text className="cls-2" textAnchor="middle" x="50%" y="70%">{nameFirstChar}</text>
                                                </svg>
                                            </td>
                                            <td>
                                                Cluster ip: {this.props.serviceReducer.cluster_ip} <br />
                                                Created at: {this.props.serviceReducer.created_at} <br />
                                                Domain hosts <br/>
                                                {domain_hosts[0]}
                                            </td>
                                            <td>
                                                Ports <br/>
                                                {ports.map((item, index) =>  {
                                                    return (
                                                        <span key={index}>
                                                            {item.name}: {item.targetPort} -> {item.port}:{item.protocol} <br/>
                                                        </span>
                                                    );
                                                })}
                                            </td>
                                            <td>
                                                Labels <br/>
                                                {labelsArray.map((item, index) =>  {
                                                    return (
                                                        <span key={index}>{item}: {this.props.serviceReducer.labels[item]}<br/></span>
                                                    );
                                                })}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Info.propTypes = {
    serviceReducer: PropTypes.object,
    idName: PropTypes.string
};

function mapStateToProps (state) {
    const { DeleteServiceReducer } = state;
    const { errorMessage } = DeleteServiceReducer;

    return {
        errorMessage,
        DeleteServiceReducer
    }
}

export default connect(mapStateToProps)(Info)
