import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Scrollspy from 'react-scrollspy';
// import Tooltip from 'rc-tooltip';

import { createDeployment } from '../../actions/CreateDeploymentActions';
import { getNamespace } from '../../actions/NamespaceActions/getNamespaceAction';
import { getVolumesByNSAction } from '../../actions/VolumesActions/getVolumesByNSAction';
import { getCreateIntService } from '../../actions/CreateServiceActions/CreateInternalService';
import { getCreateExtService } from '../../actions/CreateServiceActions/CreateExternalService';
import Notification from '../Notification';
import ServiceForm from '../CreateService/ServiceForm';
import HeaderDropDown from '../HeaderDropDown';
import Name from './Name';
import Label from './Label';
import Replicas from './Replicas';
import Container from './Container';
import createDepServ from '../../images/create-dep-serv.svg';

class UpdateDeployment extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState();
	}
    componentDidMount() {
	    this.props.onGetNamespace(this.props.params.idName);
	    this.props.onGetVolumes(this.props.params.idName);
    }
	componentWillReceiveProps(nextProps) {
		// console.log(this.props.CreateDeploymentReducer, nextProps.CreateDeploymentReducer);
		if (this.props.CreateDeploymentReducer.status !== nextProps.CreateDeploymentReducer.status &&
			nextProps.CreateDeploymentReducer.status === 201) {
			const serviceObject = this.state;
			if (serviceObject.internalServObj.length &&
				serviceObject.internalServObj[0].internalServPort) {
				this.props.onGetCreateIntService(this.props.params.idName,
					serviceObject);
			}
			if (serviceObject.externalServObj.length &&
				serviceObject.externalServObj[0].externalServPort) {
				// console.log('externalServObj', serviceObject.externalServObj);
				this.props.onGetCreateExtService(this.props.params.idName,
					serviceObject);
			}
		}
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
							id: '_first',
							index: 1
						}
					],
					env: [
						{
							value: '',
							name: '',
							id: '_first',
							index: 1
						}
					],
					command: [],
					volumeMounts: []
				}
			],
			containersCount: 1,
			isActiveService: false,
			activeSubMenu: `container${1}`,

			currentDeployment: '',
			isActiveInternal: false,
			isActiveExternal: false,
			internalServObj: [{
				internalServName: '',
				internalServPort: '',
				internalServTargetPort: '',
				intServiceType: 'TCP',
				id: '_first',
				index: 1
			}],
			internalServName: '',
			externalServObj: [{
				externalServName: '',
				externalServPort: '',
				extServiceType: 'TCP',
				id: '_first',
				index: 1
			}],
			externalServName: ''
		};
	}
	onChangeInputName(name) {
        this.setState({
	        ...this.state,
	        name,
	        currentDeployment: name
        });
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
							id: '_first',
							index: this.state.containersCount + 1
						}
					],
					env: [
						{
							value: '',
							name: '',
							id: '_first',
							index: this.state.containersCount + 1
						}
					],
					command: [],
					volumeMounts: []
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
		// console.log('common', common);
		const split = this.state.containers.slice();
		common.dockerImage || common.dockerImage === "" ?
			split[common.index].image = common.dockerImage : null;
		common.containerName || common.containerName === "" ?
			split[common.index].name = common.containerName : null;
		this.setState({
			...this.state,
			containers: split
		});
    }
	onChangeInputParameters(parameters) {
		// console.log('parameters', parameters);
		const split = this.state.containers.slice();
		parameters.cpu || parameters.cpu === "" ?
			split[parameters.index].resources.requests.cpu = parameters.cpu : null;
		parameters.memory || parameters.memory === "" ?
			split[parameters.index].resources.requests.memory = parameters.memory : null;
		// split[parameters.index].resources.requests.memory = parameters.memory;
		this.setState({
			...this.state,
			containers: split
		});
    }
	onChangeInputImagePorts(imagePorts) {
		// console.log('imagePorts', imagePorts);
		const split = this.state.containers.slice();
		imagePorts.map(item => {
			split[item.index - 1].ports = imagePorts;
		});
		// console.log('onChangeInputImagePorts split', split);
		this.setState({
			...this.state,
			containers: split
		});
    }
	onChangeInputCommands(commands) {
		const split = this.state.containers.slice();
		// const splitCommands = commands.command.split(' ');
		split[commands.index].command = commands.command.split(' ');
		this.setState({
			...this.state,
			containers: split
		});
    }
	onChangeInputEnv(env) {
		// console.log(env);
		let envs = [];
		const split = this.state.containers.slice();
		env.map(item => {
			// console.log('item', item);
			split[item.index - 1].env = env;
			envs = split[item.index - 1];
		});
		this.setState({
			...this.state,
			containers: split
		});
	}
	onChangeSelectVolume(volume, index) {
		const split = this.state.containers.slice();
		// console.log('volume', volume, index);
		if (index) {
			split[index - 1].volumeMounts = volume;
		} else {
			volume.map(item => {
				split[item.index - 1].volumeMounts = volume;
			});
			this.setState({
				...this.state,
				containers: split
			});
		}
	}
	handleClickCreateService() {
		this.setState({
			...this.state,
			isActiveService: !this.state.isActiveService
		});
	}
	handleUpdateMenu(obj) {
		// console.log(obj);
		if ((obj && obj.id === `container${1}`) ||
			(obj && obj.id === `container${1}-volume`)) {
			this.setState({
				...this.state,
				activeSubMenu: `container${1}`
			});
			[1,2,3].map(item => {
				if (item === 1) {
					document.getElementById(`container${item}-info-spy`).style.display = "block";
					document.getElementById(`container${item}-parameters-spy`).style.display = "block";
					document.getElementById(`container${item}-image-ports-spy`).style.display = "block";
					document.getElementById(`container${item}-commands-spy`).style.display = "block";
					document.getElementById(`container${item}-enviroments-spy`).style.display = "block";
					document.getElementById(`container${item}-volume-spy`).style.display = "block";
				} else {
					document.getElementById(`container${item}-info-spy`).style.display = "none";
					document.getElementById(`container${item}-parameters-spy`).style.display = "none";
					document.getElementById(`container${item}-image-ports-spy`).style.display = "none";
					document.getElementById(`container${item}-commands-spy`).style.display = "none";
					document.getElementById(`container${item}-enviroments-spy`).style.display = "none";
					document.getElementById(`container${item}-volume-spy`).style.display = "none";
				}
			});
		} else if ((obj && obj.id === `container${2}`) ||
			(obj && obj.id === `container${2}-volume`)) {
			this.setState({
				...this.state,
				activeSubMenu: `container${2}`
			});
			[1,2,3].map(item => {
				if (item === 2) {
					document.getElementById(`container${item}-info-spy`).style.display = "block";
					document.getElementById(`container${item}-parameters-spy`).style.display = "block";
					document.getElementById(`container${item}-image-ports-spy`).style.display = "block";
					document.getElementById(`container${item}-commands-spy`).style.display = "block";
					document.getElementById(`container${item}-enviroments-spy`).style.display = "block";
					document.getElementById(`container${item}-volume-spy`).style.display = "block";
				} else {
					document.getElementById(`container${item}-info-spy`).style.display = "none";
					document.getElementById(`container${item}-parameters-spy`).style.display = "none";
					document.getElementById(`container${item}-image-ports-spy`).style.display = "none";
					document.getElementById(`container${item}-commands-spy`).style.display = "none";
					document.getElementById(`container${item}-enviroments-spy`).style.display = "none";
					document.getElementById(`container${item}-volume-spy`).style.display = "none";
				}
			});
		} else if ((obj && obj.id === `container${3}`) ||
			(obj && obj.id === `container${3}-volume`)) {
			this.setState({
				...this.state,
				activeSubMenu: `container${3}`
			});
			[1,2,3].map(item => {
				if (item === 3) {
					document.getElementById(`container${item}-info-spy`).style.display = "block";
					document.getElementById(`container${item}-parameters-spy`).style.display = "block";
					document.getElementById(`container${item}-image-ports-spy`).style.display = "block";
					document.getElementById(`container${item}-commands-spy`).style.display = "block";
					document.getElementById(`container${item}-enviroments-spy`).style.display = "block";
					document.getElementById(`container${item}-volume-spy`).style.display = "block";
				} else {
					document.getElementById(`container${item}-info-spy`).style.display = "none";
					document.getElementById(`container${item}-parameters-spy`).style.display = "none";
					document.getElementById(`container${item}-image-ports-spy`).style.display = "none";
					document.getElementById(`container${item}-commands-spy`).style.display = "none";
					document.getElementById(`container${item}-enviroments-spy`).style.display = "none";
					document.getElementById(`container${item}-volume-spy`).style.display = "none";
				}
			});
		} else if (!obj && this.state.activeSubMenu === `container${1}`) {
			this.setState({
				...this.state,
				activeSubMenu: `container${2}`
			});
			[1,2,3].map(item => {
				if (item === 2) {
					document.getElementById(`container${item}-info-spy`).style.display = "block";
					document.getElementById(`container${item}-parameters-spy`).style.display = "block";
					document.getElementById(`container${item}-image-ports-spy`).style.display = "block";
					document.getElementById(`container${item}-commands-spy`).style.display = "block";
					document.getElementById(`container${item}-enviroments-spy`).style.display = "block";
					document.getElementById(`container${item}-volume-spy`).style.display = "block";
				} else {
					document.getElementById(`container${item}-info-spy`).style.display = "none";
					document.getElementById(`container${item}-parameters-spy`).style.display = "none";
					document.getElementById(`container${item}-image-ports-spy`).style.display = "none";
					document.getElementById(`container${item}-commands-spy`).style.display = "none";
					document.getElementById(`container${item}-enviroments-spy`).style.display = "none";
					document.getElementById(`container${item}-volume-spy`).style.display = "none";
				}
			});
		} else if (!obj && this.state.activeSubMenu === `container${2}`) {
			this.setState({
				...this.state,
				activeSubMenu: `container${3}`
			});
			[1,2,3].map(item => {
				if (item === 3) {
					document.getElementById(`container${item}-info-spy`).style.display = "block";
					document.getElementById(`container${item}-parameters-spy`).style.display = "block";
					document.getElementById(`container${item}-image-ports-spy`).style.display = "block";
					document.getElementById(`container${item}-commands-spy`).style.display = "block";
					document.getElementById(`container${item}-enviroments-spy`).style.display = "block";
					document.getElementById(`container${item}-volume-spy`).style.display = "block";
				} else {
					document.getElementById(`container${item}-info-spy`).style.display = "none";
					document.getElementById(`container${item}-parameters-spy`).style.display = "none";
					document.getElementById(`container${item}-image-ports-spy`).style.display = "none";
					document.getElementById(`container${item}-commands-spy`).style.display = "none";
					document.getElementById(`container${item}-enviroments-spy`).style.display = "none";
					document.getElementById(`container${item}-volume-spy`).style.display = "none";
				}
			});
		}
	}
	handleChangeActivityInternal() {
		this.setState({
			...this.state,
			isActiveInternal: !this.state.isActiveInternal
		});
	}
	handleChangeActivityExternal() {
		this.setState({
			...this.state,
			isActiveExternal: !this.state.isActiveExternal
		});
	}
	handleSubmitForm(obj) {
		// console.log(obj);
		this.setState({
			...this.state,
			internalServObj: obj.internalServObj,
			internalServName: obj.internalServName,
			externalServObj: obj.externalServObj,
			externalServName: obj.externalServName
		})
	}
	handleSubmitDeployment(e) {
		e.preventDefault();
		this.props.onCreateDeployment(this.props.params.idName, this.state);
	}
    render() {
		// console.log('this.state', this.state);
	    let isFetchingComponent = '';
	    let isFetchingSidebar = '';
	    if (!this.props.VolumesByNSReducer.isFetching &&
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
					    onChangeSelectVolume={(env, index) =>
						    this.onChangeSelectVolume(env, index)}
					    volumes={this.props.VolumesByNSReducer.data}
					    idName={this.props.params.idName}
				    />
				    <div id="linked-services">
					    {
						    this.state.isActiveService ?
							    <ServiceForm
								    handleSubmitForm={(obj) =>
									    this.handleSubmitForm(obj)}
								    handleChangeActivityInternal={() =>
									    this.handleChangeActivityInternal()}
								    handleChangeActivityExternal={() =>
									    this.handleChangeActivityExternal()}
								    currentDeployment={this.state.currentDeployment}
								    isActiveInternal={this.state.isActiveInternal}
								    isActiveExternal={this.state.isActiveExternal}
								    params={this.props.params}
							    /> :
							    <div
								    className="addBlockBtn addBlockBtnBig btnTooltipContainer linkedServBtn"
								    onClick={this.handleClickCreateService.bind(this)}
							    >+ Add Linked Services
								    {/*<Tooltip*/}
									    {/*placement='top'*/}
									    {/*trigger={['hover']}*/}
									    {/*overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>}*/}
								    {/*>*/}
								        {/*<span className="myTooltip" data-toggle="tooltip">?</span>*/}
								    {/*</Tooltip>*/}
							    </div>
					    }
				    </div>
				    <button
					    type="submit"
					    className="btnDeployment"
				    >Create deployment</button>
			    </form>;
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
		    isFetchingSidebar =
			    <Scrollspy
				    items={arrayOfContainersLinks}
				    onUpdate={this.handleUpdateMenu.bind(this)}
				    style={{
					    padding: '20px 0'
				    }}
				    currentClassName="active">
				    <div className="sideMenuHeader"><a href="#name">name</a></div>
				    <div className="sideMenuHeader"><a href="#labels">labels</a></div>
				    <div className="sideMenuHeader"><a href="#replicas">replicas</a></div>

				    <div className="sideMenuHeader" id={`container${1}spy`}>
					    <a href={`#container${1}`}>Container 1</a>
				    </div>
				    <div className="sideMenuHeader sideMenuHeader-nomargin" id={`container${1}-info-spy`}>
					    <a
						    className="nav-link sideMenuItem sideMenuItem-transformInit"
						    href={`#container${1}-info`}
					    >Info</a>
				    </div>
				    <div className="sideMenuHeader sideMenuHeader-nomargin" id={`container${1}-parameters-spy`}>
					    <a
						    className="nav-link sideMenuItem sideMenuItem-transformInit"

						    href={`#container${1}-parameters`}
					    >Parameters</a>
				    </div>
				    <div className="sideMenuHeader sideMenuHeader-nomargin" id={`container${1}-image-ports-spy`}>
					    <a
						    className="nav-link sideMenuItem sideMenuItem-transformInit"

						    href={`#container${1}-image-ports`}
					    >Image Ports</a>
				    </div>
				    <div className="sideMenuHeader sideMenuHeader-nomargin" id={`container${1}-commands-spy`}>
					    <a
						    className="nav-link sideMenuItem sideMenuItem-transformInit"

						    href={`#container${1}-commands`}
					    >Commands</a>
				    </div>
				    <div className="sideMenuHeader sideMenuHeader-nomargin" id={`container${1}-enviroments-spy`}>
					    <a
						    className="nav-link sideMenuItem sideMenuItem-transformInit"

						    href={`#container${1}-enviroments`}
					    >Enviroments</a>
				    </div>
				    <div className="sideMenuHeader sideMenuHeader-nomargin" id={`container${1}-volume-spy`}>
					    <a
						    className="nav-link sideMenuItem sideMenuItem-transformInit"

						    href={`#container${1}-volume`}
					    >Volume</a>
				    </div>

				    <div
					    className="sideMenuHeader"
					    id={`container${2}spy`}
					    style={this.state.containers.length === 1 ?
						    {display: 'none'} : {display: 'block'}}
				    >
					    <a href={`#container${2}`}>Container 2</a>
				    </div>
				    <div
					    className="sideMenuHeader sideMenuHeader-nomargin"
					    id={`container${2}-info-spy`}
					    style={this.state.containers.length === 1 ?
						    {display: 'none'} : {display: 'block'}}
				    >
					    <a
						    className="nav-link sideMenuItem sideMenuItem-transformInit"
						    href={`#container${2}-info`}
					    >Info</a>
				    </div>
				    <div
					    className="sideMenuHeader sideMenuHeader-nomargin"
					    id={`container${2}-parameters-spy`}
					    style={this.state.containers.length === 1 ?
						    {display: 'none'} : {display: 'block'}}
				    >
					    <a
						    className="nav-link sideMenuItem sideMenuItem-transformInit"
						    href={`#container${2}-parameters`}
					    >Parameters</a>
				    </div>
				    <div
					    className="sideMenuHeader sideMenuHeader-nomargin"
					    id={`container${2}-image-ports-spy`}
					    style={this.state.containers.length === 1 ?
						    {display: 'none'} : {display: 'block'}}
				    >
					    <a
						    className="nav-link sideMenuItem sideMenuItem-transformInit"
						    href={`#container${2}-image-ports`}
					    >Image Ports</a>
				    </div>
				    <div
					    className="sideMenuHeader sideMenuHeader-nomargin"
					    id={`container${2}-commands-spy`}
					    style={this.state.containers.length === 1 ?
						    {display: 'none'} : {display: 'block'}}
				    >
					    <a
						    className="nav-link sideMenuItem sideMenuItem-transformInit"
						    href={`#container${2}-commands`}
					    >Commands</a>
				    </div>
				    <div
					    className="sideMenuHeader sideMenuHeader-nomargin"
					    id={`container${2}-enviroments-spy`}
					    style={this.state.containers.length === 1 ?
						    {display: 'none'} : {display: 'block'}}
				    >
					    <a
						    className="nav-link sideMenuItem sideMenuItem-transformInit"
						    href={`#container${2}-enviroments`}
					    >Enviroments</a>
				    </div>
				    <div
					    className="sideMenuHeader sideMenuHeader-nomargin"
					    id={`container${2}-volume-spy`}
					    style={this.state.containers.length === 1 ?
						    {display: 'none'} : {display: 'block'}}
				    >
					    <a
						    className="nav-link sideMenuItem sideMenuItem-transformInit"
						    href={`#container${2}-volume`}
					    >Volume</a>
				    </div>

				    <div
					    className="sideMenuHeader"
					    id={`container${3}spy`}
					    style={this.state.containers.length <= 2 ?
						    {display: 'none'} : {display: 'block'}}
				    >
					    <a href={`#container${3}`}>Container 3</a>
				    </div>
				    <div
					    className="sideMenuHeader sideMenuHeader-nomargin"
					    id={`container${3}-info-spy`}
					    style={this.state.containers.length <= 2 ?
						    {display: 'none'} : {display: 'block'}}
				    >
					    <a
						    className="nav-link sideMenuItem sideMenuItem-transformInit"
						    href={`#container${3}-info`}
					    >Info</a>
				    </div>
				    <div
					    className="sideMenuHeader sideMenuHeader-nomargin"
					    id={`container${3}-parameters-spy`}
					    style={this.state.containers.length <= 2 ?
						    {display: 'none'} : {display: 'block'}}
				    >
					    <a
						    className="nav-link sideMenuItem sideMenuItem-transformInit"
						    href={`#container${3}-parameters`}
					    >Parameters</a>
				    </div>
				    <div
					    className="sideMenuHeader sideMenuHeader-nomargin"
					    id={`container${3}-image-ports-spy`}
					    style={this.state.containers.length <= 2 ?
						    {display: 'none'} : {display: 'block'}}
				    >
					    <a
						    className="nav-link sideMenuItem sideMenuItem-transformInit"
						    href={`#container${3}-image-ports`}
					    >Image Ports</a>
				    </div>
				    <div
					    className="sideMenuHeader sideMenuHeader-nomargin"
					    id={`container${3}-commands-spy`}
					    style={this.state.containers.length <= 2 ?
						    {display: 'none'} : {display: 'block'}}
				    >
					    <a
						    className="nav-link sideMenuItem sideMenuItem-transformInit"
						    href={`#container${3}-commands`}
					    >Commands</a>
				    </div>
				    <div
					    className="sideMenuHeader sideMenuHeader-nomargin"
					    id={`container${3}-enviroments-spy`}
					    style={this.state.containers.length <= 2 ?
						    {display: 'none'} : {display: 'block'}}
				    >
					    <a
						    className="nav-link sideMenuItem sideMenuItem-transformInit"
						    href={`#container${3}-enviroments`}
					    >Enviroments</a>
				    </div>
				    <div
					    className="sideMenuHeader sideMenuHeader-nomargin"
					    id={`container${3}-volume-spy`}
					    style={this.state.containers.length <= 2 ?
						    {display: 'none'} : {display: 'block'}}
				    >
					    <a
						    className="nav-link sideMenuItem sideMenuItem-transformInit"
						    href={`#container${3}-volume`}
					    >Volume</a>
				    </div>

				    <div className="sideMenuHeader">
					    <a href="#linked-services">Linked Services</a>
				    </div>
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
		        <Notification
			        status={this.props.CreateDeploymentReducer.status}
			        name={this.props.CreateDeploymentReducer.idDep}
			        errorMessage={this.props.CreateDeploymentReducer.errorMessage}
		        />
		        <div className="container-fluid breadcrumbNavigation">
			        <HeaderDropDown
				        idName={this.props.params.idName}
				        IdCreate="deployment"
			        />
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

UpdateDeployment.propTypes = {
    onCreateDeployment: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        CreateDeploymentReducer: state.CreateDeploymentReducer,
	    GetNamespaceReducer: state.GetNamespaceReducer,
	    VolumesByNSReducer: state.VolumesByNSReducer,
	    onGetCreateIntService: PropTypes.func.isRequired,
	    onGetCreateExtService: PropTypes.func.isRequired
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateDeployment: (idName, name) => {
            dispatch(createDeployment(idName, name));
        },
	    onGetCreateIntService: (idName, data) => {
		    dispatch(getCreateIntService(idName, data));
	    },
	    onGetCreateExtService: (idName, data) => {
		    dispatch(getCreateExtService(idName, data));
	    },
	    onGetNamespace: (NSTariffName) => {
		    dispatch(getNamespace(NSTariffName));
	    },
	    onGetVolumes: (name) => {
		    dispatch(getVolumesByNSAction(name));
	    }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDeployment);
