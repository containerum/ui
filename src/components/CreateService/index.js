import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { getCreateService } from '../../actions/CreateServiceActions';
import { getDeployments } from '../../actions/DeploymentsActions';
import CreateInstance from '../CreateInstance';
import NamespacesDropDown from '../NamespacesDropDown';
import SelectLinkedDeployment from './SelectLinkedDeployment';

class CreateService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceName: '',
            selectedLinkedDep: ''
        };
    }
    componentDidMount() {
        if (!this.props.DeploymentsReducer.data.length) {
            this.props.onGetDeployments(this.props.params.idName);
        }
    }
    handleChangeName(event) {
        this.setState({ serviceName: event.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        const serviceObject = {
            serviceName: this.refs.service_name.value,
            portName: this.refs.port_name.value,
            key: this.refs.key.value,
            value: this.refs.value.value,
            selectedLinkedDep: this.state.selectedLinkedDep
        };
        console.log(serviceObject);
        // this.props.onGetCreateService(this.props.params.idName, serviceObject);
    }
    getSelectedLinkedDep(selectedLinkedDep) {
        console.log(selectedLinkedDep);
        this.setState({
            ...this.state,
            selectedLinkedDep
        });
    }
    render() {
        return (
            <div>
                <NamespacesDropDown
                    idName={this.props.params.idName}
                    IdCreateService={this.props.params.idName}
                />
                <CreateInstance idName={this.props.params.idName} />

                <Tabs selectedTabClassName="i-selected-tab">
                    <TabList className="btn-group i-container-btn-gr">
                        <Tab className="btn c-nav-menu-btn">Service Creation</Tab>
                        {/*<Tab className="btn c-nav-menu-btn">Settings</Tab>*/}
                    </TabList>

                    <TabPanel>
                        <form onSubmit={this.handleSubmit.bind(this)}>
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
                                                                            onChange={this.handleChangeName.bind(this)}
                                                                            maxLength="20"
                                                                            ref="service_name"
                                                                            id="service_name"
                                                                            // required="required"
                                                                            type="company"
                                                                            className="form-control"
                                                                            placeholder="Name"
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
                                                    <tbody>
                                                        <tr>
                                                            <td className="first-td-width" style={{ width: '430px' }}>
                                                                <h2 id="convert-to-company">
                                                                    Internal Ports
                                                                </h2>
                                                            </td>
                                                            <td>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            </td>
                                                            <td style={{ width: '400px' }}>
                                                                <div className="form-group i-mb-20 c-has-feedback-left">
                                                                    <div className="form-group i-mb-20 c-has-feedback-left">
                                                                        <input
                                                                            ref="port_name"
                                                                            id="port_name"
                                                                            // required="required"
                                                                            type="company"
                                                                            className="form-control"
                                                                            placeholder="Port Name"
                                                                        />
                                                                        <i className="c-form-control-icon fa fa-tag fa-1"></i>
                                                                    </div>
                                                                    <div className="form-group i-mb-20 c-has-feedback-left">
                                                                        <input
                                                                            ref="key"
                                                                            id="key"
                                                                            // required="required"
                                                                            type="company"
                                                                            className="form-control"
                                                                            placeholder="Key"
                                                                        />
                                                                        <i className="c-form-control-icon fa fa-tag fa-1"></i>
                                                                    </div>
                                                                    <div className="form-group i-mb-20 c-has-feedback-left">
                                                                        <input
                                                                            ref="value"
                                                                            id="value"
                                                                            // required="required"
                                                                            type="company"
                                                                            className="form-control"
                                                                            placeholder="Value"
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
                                                                <h5>Apply {this.state.serviceName ? this.state.serviceName : 'ServiceName1'} to Deployment</h5>
                                                                <div className="form-group i-mb-20 c-has-feedback-left">
                                                                    <div className="form-group i-mb-20 c-has-feedback-left">
                                                                        <SelectLinkedDeployment
                                                                            DeploymentsReducer={this.props.DeploymentsReducer.data}
                                                                            handleSelect={
                                                                                (selectedLinkedDep) =>
                                                                                    this.getSelectedLinkedDep(selectedLinkedDep)
                                                                            }
                                                                        />
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

                                    <table>
                                        <tbody>
                                            <tr style={{ height: '50px' }}>
                                                <td style={{ width: '450px' }}>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                </td>
                                                <td style={{ width: '400px' }}>
                                                    <button type="submit" className="btn btn-block c-btn-green i-btn-login-strong">Create</button>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </form>
                    </TabPanel>
                    {/*<TabPanel>*/}
                    {/*<div className="container-fluid pt-3">*/}
                    {/*Settings*/}
                    {/*</div>*/}
                    {/*</TabPanel>*/}
                </Tabs>
            </div>
        );
    }
}

CreateService.propTypes = {
    onGetCreateService: PropTypes.func.isRequired,
    onGetDeployments: PropTypes.func,
    CreateServiceReducer: PropTypes.object,
    DeploymentsReducer: PropTypes.object,
    params: PropTypes.object
};

function mapStateToProps(state) {
    return {
        CreateServiceReducer: state.CreateServiceReducer,
        DeploymentsReducer: state.DeploymentsReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetCreateService: () => {
            dispatch(getCreateService());
        },
        onGetDeployments: idName => {
            dispatch(getDeployments(idName));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateService);
