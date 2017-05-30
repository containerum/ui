import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Info extends Component {
    render() {
        const labelsArray = this.props.serviceReducer.labels ? Object.keys(this.props.serviceReducer.labels) : [];
        const ips = this.props.serviceReducer.ips ? this.props.serviceReducer.ips : [];
        const ports = this.props.serviceReducer.ports ? this.props.serviceReducer.ports : [];

        return (
            <div className="container-fluid pt-3 pb-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card mt-3">
                            <div className="card-block c-table-card-block">
                                <table className="table i-table-card">
                                    <tbody>
                                        <tr>
                                            <td className="i-td-card-font-name">
                                                {this.props.serviceReducer.name}
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
                                                {this.props.serviceReducer.created_at}
                                            </td>
                                            <td>
                                                Ports <br/>
                                                {ports.map((item, index) =>  {
                                                    return (
                                                        <span key={index}>
                                                            {item.protocol} <br/>
                                                            {item.targetport} <br/>
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
                                            <td>
                                                IPS <br/>
                                                {ips.map((item, index) =>  {
                                                    return (
                                                        <span key={index}>{item}<br/></span>
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
        );
    }
}

Info.propTypes = {
    serviceReducer: PropTypes.object
};

export default Info;
