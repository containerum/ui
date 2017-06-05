import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { deletePod } from '../../../actions/PodActions/deletePodAction';

class Info extends Component {
    handleClickDeletingPod(name) {
        const { dispatch } = this.props;
        dispatch(deletePod(this.props.idName, name));
        browserHistory.push('/Namespaces/' + this.props.idName + '/Deployments/' + this.props.idDep);
    }
    render() {
        const labelsArray = this.props.GetPodReducer.data.labels ? Object.keys(this.props.GetPodReducer.data.labels) : [];
        const name = this.props.GetPodReducer.data.name ? this.props.GetPodReducer.data.name : '';
        const nameFirstChar = name.substring(0, 1).toUpperCase();
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
                                                    <button className="dropdown-item text-danger" type="button" onClick={name => this.handleClickDeletingPod(this.props.GetPodReducer.data.name)}>
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
                                                    <path className="cls-pod" d="M5383.94,530.28l8.57-14.84a2,2,0,0,0,0-1.78l-8.56-14.85a2,2,0,0,0-1.54-.89h-17.14a2,2,0,0,0-1.54.89l-8.57,14.84a2,2,0,0,0,0,1.78l8.56,14.84a2,2,0,0,0,1.54.89h17.14A2,2,0,0,0,5383.94,530.28Z" transform="translate(-5354.94 -497.92)"/>
                                                </g>
                                                <text className="cls-2" textAnchor="middle" x="50%" y="70%">{nameFirstChar}</text>
                                            </svg>
                                        </td>
                                        <td>
                                            RAM: {this.props.GetPodReducer.data.ram} MB <br/>
                                            CPU: {this.props.GetPodReducer.data.cpu}
                                        </td>
                                        <td>
                                            IP: {this.props.GetPodReducer.data.ip}
                                        </td>
                                        <td>
                                            Labels <br/>
                                            {labelsArray.map((item, index) =>  {
                                                return (
                                                    <span key={index}>{item}: {this.props.GetPodReducer.data.labels[item]}<br/></span>
                                                );
                                            })}
                                        </td>
                                        <td>
                                            Creation time:  {this.props.GetPodReducer.data.created_at} <br/>
                                            Start time: {this.props.GetPodReducer.data.start_time} <br/>
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
    dispatch: PropTypes.func.isRequired,
    GetPodReducer: PropTypes.object,
    idName: PropTypes.string,
    idDep: PropTypes.string,
    idPod: PropTypes.string
};

function mapStateToProps (state) {
    const { DeletePodReducer } = state;
    const { errorMessage } = DeletePodReducer;

    return {
        errorMessage,
        DeletePodReducer
    }
}

export default connect(mapStateToProps)(Info)
