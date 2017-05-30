import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Info extends Component {
    render() {
        const labelsArray = this.props.PodReducer.data.labels ? Object.keys(this.props.PodReducer.data.labels) : [];
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
                                            {this.props.PodReducer.data.name}
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
                                            <img className="c-table-card-img-old i-table-card-img mr-1" src="https://www.gravatar.com/avatar/3e2e9bb0425bbbd60b03f2b62a4d821d?s=328&amp;d=identicon&amp;r=PG&amp;f=1" alt="" />
                                        </td>
                                        <td>
                                            RAM: {this.props.PodReducer.data.ram} MB <br/>
                                            CPU: {this.props.PodReducer.data.cpu / 1000}
                                        </td>
                                        <td>
                                            IP: {this.props.PodReducer.data.ip}
                                        </td>
                                        <td>
                                            Labels <br/>
                                            {labelsArray.map((item, index) =>  {
                                                return (
                                                    <span key={index}>{item}: {this.props.PodReducer.data.labels[item]}<br/></span>
                                                );
                                            })}
                                        </td>
                                        <td>
                                            Strategy: no data!!! no "strategy: type: ..."<br/>
                                            Rolling update strategy: no data!!! <br/>
                                            Creation time:  {this.props.PodReducer.data.created_at} <br/>
                                            Start time: {this.props.PodReducer.data.start_time} <br/>
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
    PodReducer: PropTypes.object
};

export default Info;
