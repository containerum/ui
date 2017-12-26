import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Scrollspy from 'react-scrollspy';

import { createDeployment } from '../../actions/CreateDeploymentActions';
import { getNamespace } from '../../actions/NamespaceActions/getNamespaceAction';
import { getVolumes } from '../../actions/VolumesActions';
import HeaderDropDown from '../HeaderDropDown';
import Name from './Name';
import Label from './Label';
import Replicas from './Replicas';
import Container from './Container';
import createDepServ from '../../images/create-dep-serv.svg';

class CreateDeployment extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState();
	}
    componentDidMount() {
	    this.props.onGetNamespace(this.props.params.idName);
	    this.props.onGetVolumes();
    }
	initialState() {
		return {
			name: '',
			labels: [],
			replicas: 1,
			containers: [
				{
					id: '_first',
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
							containerPort: '',
							id: '_first'
						}
					],
					env: [
						{
							value: '',
							name: ''
						}
					],
					command: [],
					volumeMounts: [
						{
							name: `${this.props.params.idName}-default`,
							mountPath: '',
							subPath: ''
						}
					]
				}
			],
			containersCount: 1,
			activeSubMenu: 'container1'
		};
	}
	onChangeInputName(name) {
        this.setState({ ...this.state, name });
    }
	onChangeInputReplicas(replicas) {
		const regexp = /^[0-9]{1,2}$|^$/;
		const replicasToInt = replicas ? parseInt(replicas, 10) : '';
		if (replicas.search(regexp) !== -1) {
			this.setState({ ...this.state, replicas: replicasToInt });
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
			containersCount: this.state.containersCount + 1,
			containers: [
				...this.state.containers,
				{
					id: '_' + Math.random().toString(36).substr(2, 9),
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
							containerPort: '',
							id: '_first'
						}
					],
					env: [
						{
							value: '',
							name: ''
						}
					],
					command: [],
					volumeMounts: [
						{
							name: `${this.props.params.idName}-default`,
							mountPath: '',
							subPath: ''
						}
					]
				}
			]
		});
    }
	onChangeContainerRemoveCount(id) {
		// console.log('id', id);
		let split = this.state.containers.filter(item => {
			if (item.id !== id) {
				return item;
			}
		});
		// console.log('split', split);
		this.setState({
			...this.state,
			containers: split,
			containersCount: this.state.containersCount - 1
		});
    }
	onChangeInputCommon(common) {
		const split = this.state.containers.slice();
		common.dockerImage ? split[common.index].image = common.dockerImage : null;
		common.containerName ? split[common.index].name = common.containerName : null;
		this.setState({
			...this.state,
			containers: split
		});
    }
	onChangeInputParameters(parameters) {
		const split = this.state.containers.slice();
		parameters.cpu ? split[parameters.index].resources.requests.cpu = parameters.cpu : null;
		parameters.memory ? split[parameters.index].resources.requests.memory = parameters.memory : null;
		// console.log(parameters);
		this.setState({
			...this.state,
			containers: split
		});
    }
	onChangeInputImagePorts(imagePorts) {
		const split = this.state.containers.slice();
		imagePorts.map(item => {
			split[item.index - 1].ports = imagePorts;
		});
		this.setState({
			...this.state,
			containers: split
		});
    }
	onChangeInputCommands(commands) {
		const split = this.state.containers.slice();
		const splitCommands = commands.command.split(' ');
		commands.command ? split[commands.index].command = splitCommands : null;
		this.setState({
			...this.state,
			containers: split
		});
    }
	onChangeInputEnv(env) {
		let envs = [];
		const split = this.state.containers.slice();
		env.map(item => {
			split[item.index - 1].env = env;
			envs = split[item.index - 1];
		});
		this.setState({
			...this.state,
			containers: split
		});
	}
	onChangeSelectVolume(volume) {
		const split = this.state.containers.slice();
		volume.map(item => {
			split[item.index - 1].volumeMounts = volume;
		});
		this.setState({
			...this.state,
			containers: split
		});
	}
    handleSubmitDeployment(e) {
		e.preventDefault();
        this.props.onCreateDeployment(this.props.params.idName, this.state);
    }
    render() {
		// console.log('containers', this.state.containers);
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
	    let isFetchingComponent = '';
	    let isFetchingSidebar = '';
	    if (!this.props.VolumesReducer.isFetching &&
		    !this.props.GetNamespaceReducer.isFetching) {
		    isFetchingComponent =
			    <form onSubmit={this.handleSubmitDeployment.bind(this)}>
				    <Name onChangeInputName={(nameInput) =>
					    this.onChangeInputName(nameInput)}/>
				    <Label onChangeInputLabels={(labels) =>
					    this.onChangeInputLabels(labels)}/>
				    <Replicas onChangeInputReplicas={(replicasInput) =>
					    this.onChangeInputReplicas(replicasInput)}
				              value={this.state.replicas}
				    />

				    <Container
					    containersCount={this.state.containersCount}
					    containers={this.state.containers}
					    onChangeContainerCount={(id) =>
						    this.onChangeContainerCount(id)}
					    onChangeContainerRemoveCount={(id) =>
						    this.onChangeContainerRemoveCount(id)}
					    onChangeInputCommon={(common) =>
						    this.onChangeInputCommon(common)}
					    onChangeInputParameters={(parameters) =>
						    this.onChangeInputParameters(parameters)}
					    onChangeInputImagePorts={(imagePorts) =>
						    this.onChangeInputImagePorts(imagePorts)}
					    onChangeInputCommands={(commands) =>
						    this.onChangeInputCommands(commands)}
					    onChangeInputEnv={(env) =>
						    this.onChangeInputEnv(env)}
					    onChangeSelectVolume={(env) =>
						    this.onChangeSelectVolume(env)}
					    volumes={this.props.VolumesReducer.data}
					    idName={this.props.params.idName}
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
					    type="submit"
					    className="btnDeployment"
				    >Create deployment</button>
			    </form>;
		    isFetchingSidebar =
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
			    </Scrollspy>;
	    } else {
		    isFetchingComponent =
			    <div>
				    {
					    new Array(3).fill().map((item, index) => {
						    return (
							    <img
								    key={index}
								    src={createDepServ}
								    style={{
								    	marginTop: '-2px',
									    marginBottom: '30px',
									    width: '100%'
								    }} />
						    )
					    })
				    }
			    </div>;
		    isFetchingSidebar =
			    <div style={{marginTop: '40px', width: '80%'}}>
				    {
					    new Array(4).fill().map((item, index) => {
						    return (
							    <img
								    key={index}
								    src={require('../../images/profile-sidebar-big.svg')}
								    style={{width: '100%', marginBottom: '20px'}}
							    />
						    )
					    })
				    }
				    {
					    new Array(6).fill().map((item, index) => {
						    return (
							    <img
								    key={index}
								    src={require('../../images/profile-sidebar-small.svg')}
								    style={{marginBottom: '20px', float: 'right'}}
							    />
						    )
					    })
				    }
			    </div>;
	    }

        return (
        	<div>
		        <div className="container-fluid breadcrumbNavigation">
			        <HeaderDropDown idName={this.props.params.idName} />
		        </div>
		        <div className="content-block">
			        <div className="container no-back">
				        <div className="row pageWidth">
					        <div className="col-md-3 sideMenu">
						        { isFetchingSidebar }
					        </div>
					        <div className="col-md-9 pageContent">
						        { isFetchingComponent }
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
        CreateDeploymentReducer: state.CreateDeploymentReducer,
	    GetNamespaceReducer: state.GetNamespaceReducer,
	    VolumesReducer: state.VolumesReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateDeployment: (idName, name) => {
            dispatch(createDeployment(idName, name));
        },
	    onGetNamespace: (NSTariffName) => {
		    dispatch(getNamespace(NSTariffName));
	    },
	    onGetVolumes: () => {
		    dispatch(getVolumes());
	    }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeployment);
