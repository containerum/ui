import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Scrollspy from 'react-scrollspy';

import { createDeployment } from '../../actions/CreateDeploymentActions';
import { getNamespace } from '../../actions/NamespaceActions/getNamespaceAction';
import HeaderDropDown from '../HeaderDropDown';
import Name from './Name';
import Label from './Label';
import Replicas from './Replicas';
import Container from './Container';

class CreateDeployment extends Component {
	constructor() {
		super();
		this.state = {
				name: '',
				labels: [],
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
			    containersCount: 1,
				activeSubMenu: 'container1'
			};
	}
    componentDidMount() {
	    this.props.onGetNamespace(this.props.params.idName);
    }
	onChangeInputName(name) {
        this.setState({ ...this.state, name });
    }
	onChangeInputReplicas(replicas) {
		console.log(replicas);
		const regexp = /^[0-9][0-5]*$|^$/;
		if (replicas.search(regexp) !== -1) {
			this.setState({ ...this.state, replicas });
		}
    }
	onChangeInputLabels(labels) {
		if (labels.length === 1 &&
			!labels[0].key &&
			!labels[0].label) {
			this.setState({
				...this.state,
				labels: []
			});
		} else {
			this.setState({
				...this.state,
				labels
			});
		}
    }
	onChangeContainerCount() {
		this.setState({
			...this.state,
			containersCount: this.state.containersCount + 1
		});
    }
    handleSubmitDeployment() {
        this.props.onCreateDeployment(this.props.params.idName, this.state);
    }
    render() {
		// console.log(this.state);
	    const arrayOfContainersLinks = [
		    'name',
		    'labels',
		    'replicas',
		    'container1',
		    'container1-info',
		    'container1-parameters',
		    'container1-image-ports',
		    'container1-commands',
		    'container1-enviroments',
		    'container1-volume',
		    'container2',
		    'container2-info',
		    'container2-parameters',
		    'container2-image-ports',
		    'container2-commands',
		    'container2-enviroments',
		    'container2-volume',
		    'container3',
		    'container3-info',
		    'container3-parameters',
		    'container3-image-ports',
		    'container3-commands',
		    'container3-enviroments',
		    'container3-volume'
	    ];
        return (
        	<div>
		        <div className="container-fluid breadcrumbNavigation">
			        <HeaderDropDown idName={this.props.params.idName} />
		        </div>
		        <div className="content-block">
			        <div className="container no-back">
				        <div className="row pageWidth">
					        <div className="col-md-3 sideMenu">
						        <Scrollspy
							        items={arrayOfContainersLinks}
							        // onUpdate={this.handleUpdateMenu.bind(this)}
							        style={{
								        padding: '20px 0'
							        }}
							        currentClassName="active">
							        <div className="sideMenuHeader"><a href="#name">name</a></div>
							        <div className="sideMenuHeader"><a href="#labels">labels</a></div>
							        <div className="sideMenuHeader"><a href="#replicas">replicas</a></div>

							        <div className="sideMenuHeader">
								        <a href={`#container${1}`}>Container {1}</a>
							        </div>
							        <div className="sideMenuHeader">
								        <a
									        className="nav-link sideMenuItem"
									        href={`#container${1}-info`}
								        >Info</a>
							        </div>
							        <div className="sideMenuHeader">
								        <a
									        className="nav-link sideMenuItem"
									        href={`#container${1}-parameters`}
								        >Parameters</a>
							        </div>
							        <div className="sideMenuHeader">
								        <a
									        className="nav-link sideMenuItem"
									        href={`#container${1}-image-ports`}
								        >Image Ports</a>
							        </div>
							        <div className="sideMenuHeader">
								        <a
									        className="nav-link sideMenuItem"
									        href={`#container${1}-commands`}
								        >Commands</a>
							        </div>
							        <div className="sideMenuHeader">
								        <a
									        className="nav-link sideMenuItem"
									        href={`#container${1}-enviroments`}
								        >Enviroments</a>
							        </div>
							        <div className="sideMenuHeader">
								        <a
									        className="nav-link sideMenuItem"
									        href={`#container${1}-volume`}
								        >Volume</a>
							        </div>

							        <div className="sideMenuHeader">
								        <a
									        className="nav-link sideMenuItem"
									        href="#linked-services"
								        >Linked Services</a></div>
							        <ul className="nav flex-column linkedMenu"> </ul>
						        </Scrollspy>
					        </div>
					        <div className="col-md-9 pageContent">
						        <Name onChangeInputName={(nameInput) =>
							        this.onChangeInputName(nameInput)}/>
						        <Label onChangeInputLabels={(labels) =>
							        this.onChangeInputLabels(labels)}/>
						        <Replicas onChangeInputReplicas={(replicasInput) =>
							        this.onChangeInputReplicas(replicasInput)}
									value={this.state.replicas}
						        />

						        <Container
							        onChangeContainerCount={() =>
								        this.onChangeContainerCount()}
							        containersCount={this.state.containersCount}
						        />

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
