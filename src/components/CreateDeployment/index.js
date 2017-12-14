import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createDeployment } from '../../actions/CreateDeploymentActions';
import { getNamespace } from '../../actions/NamespaceActions/getNamespaceAction';
import Name from './Name';
import Label from './Label';
import Replicas from './Replicas';
import Container from './Container';

class CreateDeployment extends Component {
	constructor() {
		super();
		this.state = {
				name: '',
				labels: {
					'key': ''
				},
				replicas: 1,
				containers: [
					{
						image: '',
						name: '',
						resources: {
							requests: {
								cpu: '',
								memory: ''
							}
						},
						ports: [
							{
								containerPort: ''
							}
						],
						env: [
							{
								value: '',
								name: ''
							}
						],
						command: []
					}
				],
			    containersCount: 1
			};
	}
    componentDidMount() {
	    this.props.onGetNamespace(this.props.params.idName);
    }
    handleSubmitDeployment() {
        this.props.onCreateDeployment(this.props.params.idName, 'python');
    }
    render() {
        return (
            <div className="content-block">
                <div className="container no-back">
                    <div className="row pageWidth">
                        <div className="col-md-3 sideMenu">
                            <div className="sideMenuHeader"><a href="#name">name</a></div>
                            <div className="sideMenuHeader"><a href="#labels">labels</a></div>
                            <div className="sideMenuHeader"><a href="#replicas">replicas</a></div>
                            <div className="sideMenuHeader">Container 1</div>
                            <ul className="nav flex-column">
                                <li className="nav-item"><a className="nav-link sideMenuItem" href="#">Info</a></li>
                                <li className="nav-item"><a className="nav-link sideMenuItem" href="#">Parameters</a></li>
                                <li className="nav-item"><a className="nav-link sideMenuItem" href="#">Image Ports</a></li>
                                <li className="nav-item"><a className="nav-link sideMenuItem" href="#">Commands</a></li>
                                <li className="nav-item"><a className="nav-link sideMenuItem" href="#">Enviroments</a></li>
                                <li className="nav-item"><a className="nav-link sideMenuItem" href="#">Volume</a></li>
                            </ul>
                            <div className="sideMenuHeader">Linked Services</div>
                            <ul className="nav flex-column linkedMenu"></ul>
                        </div>
                        <div className="col-md-9 pageContent">
                            <Name/>
                            <Label/>
	                        <Replicas/>
	                        <Container/>

                            <div className="addBlockBtn addBlockBtnBig btnTooltipContainer linkedServBtn">+ Add Linked Services
                                <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
                            </div>

                            <div className="linkedServicesWrapper serviceWrapperOff">
                                <div className="blockContainer blockContainerPadin">
                                    <div className="row">
                                        <div className="col-md-9">
                                            <div className="containerTitle marLeft20">Internal Service
                                                <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="serviceSwitcher serviceSwitcherOn"></div>
                                        </div>
                                    </div>

                                    <div className="serviceWrapper">
                                        <div className="row rowLine">
                                            <div className="col-md-6">
                                                <div className="has-float-label marTop40">
                                                    <input className="form-control customInput" id="text15" type="text" placeholder=" " />
                                                    <label className="customLabel" htmlFor="text15">* Service Name</label>
                                                    <div className="helperText">Your Internal Name is the same as the name of Deployment</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row rowWithoutLine">
                                            <div className="col-md-12">
                                                <div className="containerTitle containerBlockTitle"><span>*</span> Ports
                                                    <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="has-float-label">
                                                    <input className="form-control customInput" id="text16" type="text" placeholder=" " />
                                                    <label className="customLabel" htmlFor="text16">Port</label>
                                                    <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="has-float-label">
                                                    <input className="form-control customInput" id="text17" type="text" placeholder=" " />
                                                    <label className="customLabel" htmlFor="text17">Target Port</label>
                                                    <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>
                                                </div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="select-wrapper">
                                                    <div className="select-arrow-3"></div>
                                                    <div className="select-arrow-3"></div>
                                                    <select className="selectCustom">
                                                        <option value="">TCP</option>
                                                        <option value="">Option</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="addBlockBtn marLeft">+ Add Port</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="blockContainer blockContainerPadin">
                                    <div className="row">
                                        <div className="col-md-9">
                                            <div className="containerTitle marLeft20">External Service
                                                <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="serviceSwitcher"></div>
                                        </div>
                                    </div>

                                    <div className="serviceWrapper serviceWrapperOff">
                                        <div className="row rowLine">
                                            <div className="col-md-6">
                                                <div className="has-float-label marTop40">
                                                    <input className="form-control customInput" id="text18" type="text" placeholder=" " />
                                                    <label className="customLabel" htmlFor="text18">* Service Name</label>
                                                    <div className="helperText">Your Internal Name is the same as the name of Deployment with «… ext-service» index</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row rowWithoutLine">
                                            <div className="col-md-12">
                                                <div className="containerTitle containerBlockTitle"><span>*</span> Ports
                                                    <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="has-float-label">
                                                    <input className="form-control customInput" id="text19" type="text" placeholder=" " />
                                                    <label className="customLabel" htmlFor="text19">Port</label>
                                                    <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>
                                                </div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="select-wrapper">
                                                    <div className="select-arrow-3"></div>
                                                    <div className="select-arrow-3"></div>
                                                    <select className="selectCustom">
                                                        <option value="">UDP</option>
                                                        <option value="">Option</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="addBlockBtn marLeft">+ Add Port</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="btnDeployment"
                                onClick={this.handleSubmitDeployment.bind(this)}
                            >Create deployment</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateDeployment.propTypes = {
    onCreateDeployment: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        CreateDeploymentReducer: state.CreateDeploymentReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateDeployment: (idName, name) => {
            dispatch(createDeployment(idName, name));
        },
	    onGetNamespace: (NSTariffName) => {
		    dispatch(getNamespace(NSTariffName));
	    }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeployment);
