import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Info extends Component {
    render() {
        const statusArray = this.props.deploymentReducer.status ? Object.keys(this.props.deploymentReducer.status) : [];
        const labelsArray = this.props.deploymentReducer.labels ? Object.keys(this.props.deploymentReducer.labels) : [];
        const rollingUpdateArray = this.props.deploymentReducer.rolling_update ? Object.keys(this.props.deploymentReducer.rolling_update) : [];
        let rollingUpdate = '';
        rollingUpdateArray.forEach(item => {
            if (rollingUpdateArray[rollingUpdateArray.length - 1] === item) {
                rollingUpdate += item + ': ' + this.props.deploymentReducer.rolling_update[item];
            } else {
                rollingUpdate += item + ': ' + this.props.deploymentReducer.rolling_update[item] + ', ';
            }
        });
        return (
            <div className="container-fluid pt-3">
                <div className="row">
                    <div className="col-12">
                        <div className="card mt-3">
                            <div className="card-block c-table-card-block">
                                <table className="table i-table-card">
                                    <tbody>
                                        <tr>
                                            <td className="i-td-card-font-name">
                                                {this.props.deploymentReducer.name}
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
                                                        <button className="dropdown-item text-danger" type="button">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img className="c-table-card-img i-table-card-img mr-1" src="https://www.gravatar.com/avatar/3e2e9bb0425bbbd60b03f2b62a4d821d?s=328&amp;d=identicon&amp;r=PG&amp;f=1" alt="" />
                                            </td>
                                            <td>
                                                CPU: {this.props.deploymentReducer.cpu / 1000} <br/>
                                                RAM: {this.props.deploymentReducer.ram} MB
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
                                                Strategy: no data!!! no "strategy: type: ..."<br/>
                                                Rolling update strategy: {rollingUpdate} <br/>
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
    deploymentReducer: PropTypes.object
};

export default Info;
