import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ServiceSettings extends Component {
    render() {
        // const portsCount = this.props.serviceReducer.ports.length;
        const portType = !!this.props.serviceReducer.labels.external;
        let headerPortType = 'Internal Port';
        if (portType) {
            headerPortType = 'External Port';
        }
        console.log(portType);
        const portsContent =
            <tbody>
                <tr>
                    <td className="first-td-width" style={{ width: '430px' }}>
                        <h2 id="convert-to-company">
                            {headerPortType}
                        </h2>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                    </td>
                    {
                        this.props.serviceReducer.ports.map((item, index) => {
                            return (
                                <td key={index} style={{ width: '400px' }}>
                                    <div className="form-group i-mb-20 c-has-feedback-left">
                                        <div className="form-group i-mb-20 c-has-feedback-left">
                                            <h5>{item.name}: {item.protocol}</h5>
                                        </div>
                                        <label htmlFor="port">Port</label>
                                        <div className="form-group i-mb-20 c-has-feedback-left">
                                            <input
                                                ref="port"
                                                id="port"
                                                required="required"
                                                type="text"
                                                className="form-control"
                                                placeholder="Port"
                                                defaultValue={item.port}
                                            />
                                            <i className="c-form-control-icon fa fa-tag fa-1"></i>
                                        </div>
                                        <label htmlFor="targetPort">Target Port</label>
                                        <div className="form-group i-mb-20 c-has-feedback-left">
                                            <input
                                                ref="targetPort"
                                                id="targetPort"
                                                required="required"
                                                type="text"
                                                className="form-control"
                                                placeholder="Target Port"
                                                defaultValue={item.targetPort}
                                            />
                                            <i className="c-form-control-icon fa fa-tag fa-1"></i>
                                        </div>
                                    </div>
                                </td>
                            );
                        })
                    }
                    <td>
                    </td>
                </tr>
            </tbody>;
        return (
            <div className="container-fluid pt-3 pb-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card mt-3">
                            <div className="card-block c-table-card-block">
                                <table className="table i-table-card">
                                    <tbody>
                                        <tr>
                                            <td className="first-td-width" style={{ width: '430px' }}>
                                                <h2 id="convert-to-company">
                                                    Service Name
                                                </h2>
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            </td>
                                            <td style={{ width: '400px' }}>
                                                <p>Input Service Name</p>
                                                <div className="form-group i-mb-20 c-has-feedback-left">
                                                    <div className="form-group i-mb-20 c-has-feedback-left">
                                                        <input
                                                            ref="service_name"
                                                            id="service_name"
                                                            required="required"
                                                            type="company"
                                                            className="form-control"
                                                            placeholder="Name"
                                                            defaultValue={this.props.serviceReducer.name ? this.props.serviceReducer.name : ''}
                                                        />
                                                        <i className="c-form-control-icon fa fa-tag fa-1"></i>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="card mt-3">
                            <div className="card-block c-table-card-block">
                                <table className="table i-table-card">
                                    {portsContent}
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="card mt-3">
                            <div className="card-block c-table-card-block">
                                <table className="table i-table-card">
                                    <tbody>
                                        <tr>
                                            <td className="first-td-width" style={{ width: '430px' }}>
                                                <h2 id="convert-to-company">
                                                    Linked Deployment
                                                </h2>
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            </td>
                                            <td style={{ width: '400px' }}>
                                                <h5>Apply {this.props.serviceReducer.name} to Deployment</h5>
                                                <div className="form-group i-mb-20 c-has-feedback-left">
                                                    <div className="form-group i-mb-20 c-has-feedback-left">
                                                        <input
                                                            ref="deployment_name"
                                                            id="deployment_name"
                                                            required="required"
                                                            type="company"
                                                            className="form-control"
                                                            defaultValue={this.props.serviceReducer.deployment ? this.props.serviceReducer.deployment : ''}
                                                            disabled
                                                        />
                                                        <i className="c-form-control-icon fa fa-tag fa-1"></i>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-block c-btn-green">Save</button>
                                            </td>
                                            <td>
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

ServiceSettings.propTypes = {
    serviceReducer: PropTypes.object
};

export default ServiceSettings;
