/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';
import Scrollspy from 'react-scrollspy';

import scrollById from '../../functions/scrollById';
// import * as actionGetVolumes from '../../actions/volumesActions/getVolumesByNS';
import * as actionGetNamespace from '../../actions/namespaceActions/getNamespace';
import * as actionUpdateDeployment from '../../actions/deploymentActions/updateDeployment';
import * as actionGetDeployment from '../../actions/deploymentActions/getDeployment';
// import {
//   GET_VOLUMES_BY_NS_INVALID,
//   GET_VOLUMES_BY_NS_REQUESTING,
//   GET_VOLUMES_BY_NS_FAILURE,
//   GET_VOLUMES_BY_NS_SUCCESS
// } from '../../constants/volumesConstants/getVolumesByNS';
import {
  GET_DEPLOYMENT_INVALID,
  GET_DEPLOYMENT_REQUESTING,
  GET_DEPLOYMENT_FAILURE,
  GET_DEPLOYMENT_SUCCESS
} from '../../constants/deploymentConstants/getDeployment';
import { GET_NAMESPACE_SUCCESS } from '../../constants/namespaceConstants/getNamespace';
import type { Dispatch, ReduxState } from '../../types';
import NavigationHeaderItem from '../NavigationHeader';
import LoadButton from '../../components/LoadButton';
import Notification from '../Notification';
import Replicas from '../../components/CreateDeploymentCards/Replicas';
import Container from '../../components/CreateDeploymentCards/Container';

type Props = {
  // getVolumesByNSReducer: Object,
  getNamespaceReducer: Object,
  updateDeploymentReducer: Object,
  getDeploymentReducer: Object,
  match: Object,
  fetchGetNamespaceIfNeeded: (idName: string) => void,
  // fetchGetVolumesByNSIfNeeded: (idName: string) => void,
  fetchUpdateDeploymentIfNeeded: (
    idName: string,
    idDep: string,
    data: Object
  ) => void,
  fetchGetDeploymentIfNeeded: (idName: string, idDep: string) => void
};

// Export this for unit testing more easily
export class CreateDeployment extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = this.initialState();
  }
  componentDidMount() {
    const {
      // fetchGetVolumesByNSIfNeeded,
      fetchGetNamespaceIfNeeded,
      fetchGetDeploymentIfNeeded,
      getNamespaceReducer,
      match
    } = this.props;
    // fetchGetVolumesByNSIfNeeded(match.params.idName);
    fetchGetDeploymentIfNeeded(match.params.idName, match.params.idDep);
    if (getNamespaceReducer.readyStatus !== GET_NAMESPACE_SUCCESS) {
      fetchGetNamespaceIfNeeded(match.params.idName);
    }
  }
  componentWillUpdate(nextProps) {
    // if (
    //   this.props.getVolumesByNSReducer.readyStatus !==
    //     nextProps.getVolumesByNSReducer.readyStatus &&
    //   nextProps.getVolumesByNSReducer.readyStatus === GET_VOLUMES_BY_NS_SUCCESS
    // ) {
    //   const nextState = Object.assign([], this.state.containers);
    //   if (nextProps.getVolumesByNSReducer.data[0]) {
    //     nextState[0].volumeMounts[0].name =
    //       nextProps.getVolumesByNSReducer.data[0].name;
    //     this.setState({
    //       ...this.state,
    //       volumes: nextProps.getVolumesByNSReducer.data,
    //       containers: nextState
    //     });
    //   }
    // }
    if (
      this.props.getDeploymentReducer.readyStatus !==
        nextProps.getDeploymentReducer.readyStatus &&
      nextProps.getDeploymentReducer.readyStatus === GET_DEPLOYMENT_SUCCESS
    ) {
      console.log(nextProps.getDeploymentReducer);
      const { data } = nextProps.getDeploymentReducer;
      const { name, labels, replicas, containers } = data;
      // const containersArr = [];
      const containersArr = containers.map((item, index) => {
        const {
          image,
          name: imgName,
          limits,
          ports,
          environments,
          commands
          // volumes
        } = item;
        // if (ports) {
        //   ports.map(itemPorts => {
        //     itemPorts.id = _.uniqueId();
        //     itemPorts.index = index + 1;
        //     return null;
        //   });
        // }
        // if (environments) {
        //   environments.map(itemEnv => {
        //     itemEnv.id = _.uniqueId();
        //     itemEnv.index = index + 1;
        //     return null;
        //   });
        // }
        // if (volumes) {
        //   volumes.map(itemVolume => {
        //     itemVolume.id = _.uniqueId();
        //     itemVolume.index = index + 1;
        //     return null;
        //   });
        // }
        return {
          id: _.uniqueId(),
          image,
          name: imgName,
          limits: {
            cpu: `${limits.cpu}`,
            memory: `${limits.memory}`
          },
          ports: ports
            ? ports.map(itemPorts => {
                itemPorts.id = _.uniqueId();
                itemPorts.index = index + 1;
                return null;
              })
            : [
                {
                  containerPort: '',
                  id: _.uniqueId(),
                  index: 1
                }
              ],
          env: environments
            ? environments.map(itemEnv => {
                itemEnv.id = _.uniqueId();
                itemEnv.index = index + 1;
                return null;
              })
            : [
                {
                  value: '',
                  name: '',
                  id: _.uniqueId(),
                  index: 1
                }
              ],
          command: commands || [],
          volumeMounts: []
          // volumeMounts: volumes || []
        };
      });
      console.log('containersArr', containersArr);
      this.setState({
        ...this.state,
        name,
        labels: labels
          ? [labels]
          : [
              {
                key: '',
                label: '',
                id: _.uniqueId()
              }
            ],
        replicas,
        containers: containersArr,
        containersCount: containersArr.length
      });
    }
  }
  initialState = () => ({
    name: '',
    labels: [
      {
        key: '',
        label: '',
        id: _.uniqueId()
      }
    ],
    replicas: 1,
    containers: [
      {
        id: _.uniqueId(),
        image: '',
        name: '',
        limits: {
          cpu: '',
          memory: ''
        },
        ports: [
          {
            containerPort: '',
            id: _.uniqueId(),
            index: 0
          }
        ],
        env: [
          {
            value: '',
            name: '',
            id: _.uniqueId(),
            index: 0
          }
        ],
        command: [],
        volumeMounts: []
      }
    ],
    volumes: [],
    containersCount: 1,
    isActiveService: false,
    activeSubMenu: `container${1}`
  });
  handleSubmitDeployment = e => {
    e.preventDefault();
    const { fetchUpdateDeploymentIfNeeded, match } = this.props;
    fetchUpdateDeploymentIfNeeded(
      match.params.idName,
      match.params.idDep,
      this.state
    );
  };
  handleUpdateMenu = obj => {
    if (
      typeof window !== 'undefined' &&
      typeof window.document !== 'undefined'
    ) {
      if (
        (obj && obj.id === `container${1}`) ||
        (obj && obj.id === `container${1}-volume`)
      ) {
        this.setState({
          ...this.state,
          activeSubMenu: `container${1}`
        });
        [1, 2, 3].map(item => {
          if (item === 1) {
            document.getElementById(`container${item}-info-spy`).style.display =
              'block';
            document.getElementById(
              `container${item}-parameters-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-image-ports-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-commands-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-environments-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-volume-spy`
            ).style.display =
              'block';
          } else {
            document.getElementById(`container${item}-info-spy`).style.display =
              'none';
            document.getElementById(
              `container${item}-parameters-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-image-ports-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-commands-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-environments-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-volume-spy`
            ).style.display =
              'none';
          }
          return null;
        });
      } else if (
        (obj && obj.id === `container${2}`) ||
        (obj && obj.id === `container${2}-volume`)
      ) {
        this.setState({
          ...this.state,
          activeSubMenu: `container${2}`
        });
        [1, 2, 3].map(item => {
          if (item === 2) {
            document.getElementById(`container${item}-info-spy`).style.display =
              'block';
            document.getElementById(
              `container${item}-parameters-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-image-ports-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-commands-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-environments-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-volume-spy`
            ).style.display =
              'block';
          } else {
            document.getElementById(`container${item}-info-spy`).style.display =
              'none';
            document.getElementById(
              `container${item}-parameters-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-image-ports-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-commands-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-environments-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-volume-spy`
            ).style.display =
              'none';
          }
          return null;
        });
      } else if (
        (obj && obj.id === `container${3}`) ||
        (obj && obj.id === `container${3}-volume`)
      ) {
        this.setState({
          ...this.state,
          activeSubMenu: `container${3}`
        });
        [1, 2, 3].map(item => {
          if (item === 3) {
            document.getElementById(`container${item}-info-spy`).style.display =
              'block';
            document.getElementById(
              `container${item}-parameters-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-image-ports-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-commands-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-environments-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-volume-spy`
            ).style.display =
              'block';
          } else {
            document.getElementById(`container${item}-info-spy`).style.display =
              'none';
            document.getElementById(
              `container${item}-parameters-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-image-ports-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-commands-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-environments-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-volume-spy`
            ).style.display =
              'none';
          }
          return null;
        });
      } else if (!obj && this.state.activeSubMenu === `container${1}`) {
        this.setState({
          ...this.state,
          activeSubMenu: `container${2}`
        });
        [1, 2, 3].map(item => {
          if (item === 2) {
            document.getElementById(`container${item}-info-spy`).style.display =
              'block';
            document.getElementById(
              `container${item}-parameters-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-image-ports-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-commands-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-environments-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-volume-spy`
            ).style.display =
              'block';
          } else {
            document.getElementById(`container${item}-info-spy`).style.display =
              'none';
            document.getElementById(
              `container${item}-parameters-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-image-ports-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-commands-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-environments-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-volume-spy`
            ).style.display =
              'none';
          }
          return null;
        });
      } else if (!obj && this.state.activeSubMenu === `container${2}`) {
        this.setState({
          ...this.state,
          activeSubMenu: `container${3}`
        });
        [1, 2, 3].map(item => {
          if (item === 3) {
            document.getElementById(`container${item}-info-spy`).style.display =
              'block';
            document.getElementById(
              `container${item}-parameters-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-image-ports-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-commands-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-environments-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-volume-spy`
            ).style.display =
              'block';
          } else {
            document.getElementById(`container${item}-info-spy`).style.display =
              'none';
            document.getElementById(
              `container${item}-parameters-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-image-ports-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-commands-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-environments-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-volume-spy`
            ).style.display =
              'none';
          }
          return null;
        });
      }
    }
  };
  // ReplicasName
  handleChangeInputReplicasName = value => {
    this.setState({
      ...this.state,
      replicas: value
    });
  };
  // Container
  handleClickContainerRemove = id => {
    const nextContainers = Object.assign({}, this.state).containers.filter(
      container => container.id !== id
    );
    this.setState({
      ...this.state,
      containers: nextContainers,
      containersCount: this.state.containersCount - 1
    });
  };
  handleClickContainerAdd = () => {
    this.setState({
      ...this.state,
      containersCount: this.state.containersCount + 1,
      containers: [
        ...this.state.containers,
        {
          id: _.uniqueId(),
          image: '',
          name: '',
          limits: {
            cpu: '',
            memory: ''
          },
          ports: [
            {
              containerPort: '',
              id: _.uniqueId(),
              index: this.state.containersCount + 1
            }
          ],
          env: [
            {
              value: '',
              name: '',
              id: _.uniqueId(),
              index: this.state.containersCount + 1
            }
          ],
          command: [],
          volumeMounts: []
        }
      ]
    });
  };
  // Common
  handleChangeInputCommon = (value, id, index, type) => {
    const nextState = Object.assign([], this.state.containers);
    const match = nextState.find(container => container.id === id);
    const matchUpdated = { ...match, [`${type}`]: value };
    this.setState({
      ...this.state,
      containers: [
        ...this.state.containers.slice(0, index),
        Object.assign({}, this.state.containers[index], matchUpdated),
        ...this.state.containers.slice(index + 1)
      ]
    });
  };
  // Parameters
  handleChangeInputParameters = (value, id, index, type) => {
    const match = Object.assign({}, this.state.containers[index]);
    const matchUpdated = {
      ...match,
      limits: {
        ...this.state.containers[index].limits,
        [`${type}`]: value
      }
    };
    this.setState({
      ...this.state,
      containers: [
        ...this.state.containers.slice(0, index),
        Object.assign({}, this.state.containers[index], matchUpdated),
        ...this.state.containers.slice(index + 1)
      ]
    });
  };
  // ImagePorts
  handleChangeInputImagePorts = (value, id, index, indexPort) => {
    const nextState = Object.assign([], this.state.containers);
    nextState[index].ports[indexPort].containerPort = value;
    this.setState({
      ...this.state,
      containers: nextState
    });
  };
  handleClickRemoveImagePort = (id, index) => {
    // const containers = this.state.containers.slice();
    const nextState = Object.assign([], this.state.containers);
    if (this.state.containers[index].ports.length > 1) {
      const match = nextState[index].ports.filter(port => port.id !== id);
      nextState[index].ports = match;
      this.setState({
        ...this.state,
        containers: nextState
      });
    } else {
      nextState[index].ports = [
        {
          containerPort: '',
          id: _.uniqueId(),
          index: 0
        }
      ];
      this.setState({
        ...this.state,
        containers: nextState
      });
    }
  };
  handleClickAddImagePort = index => {
    const containers = this.state.containers.slice();
    containers[index].ports.push({
      containerPort: '',
      id: _.uniqueId(),
      index
    });
    this.setState({
      ...this.state,
      containers
    });
  };
  // Commands
  handleChangeInputCommands = (value, id, index) => {
    const nextState = this.state.containers.slice();
    nextState[index].command = value.split(' ');
    this.setState({
      ...this.state,
      containers: nextState
    });
  };
  // Environment
  handleChangeInputEnvironment = (value, id, index, indexEnvironment, type) => {
    const nextState = Object.assign([], this.state.containers);
    nextState[index].env[indexEnvironment][`${type}`] = value;
    this.setState({
      ...this.state,
      containers: nextState
    });
  };
  handleClickRemoveEnvironment = (id, index) => {
    const nextState = Object.assign([], this.state.containers);
    if (this.state.containers[index].env.length > 1) {
      const match = nextState[index].env.filter(env => env.id !== id);
      nextState[index].env = match;
      this.setState({
        ...this.state,
        containers: nextState
      });
    } else {
      nextState[index].env = [
        {
          value: '',
          name: '',
          id: _.uniqueId(),
          index: 0
        }
      ];
      this.setState({
        ...this.state,
        containers: nextState
      });
    }
  };
  handleClickAddEnvironment = index => {
    const containers = this.state.containers.slice();
    containers[index].env.push({
      value: '',
      name: '',
      id: _.uniqueId(),
      index
    });
    this.setState({
      ...this.state,
      containers
    });
  };
  // Volume
  handleChangeVolumeSelect = (value, id, index, indexVolume) => {
    const nextState = Object.assign([], this.state.containers);
    nextState[index].volumeMounts[indexVolume].name = value;
    this.setState({
      ...this.state,
      containers: nextState
    });
  };
  handleChangeInputVolumePath = (value, id, index, indexVolume, type) => {
    const nextState = Object.assign([], this.state.containers);
    nextState[index].volumeMounts[indexVolume][`${type}`] = value;
    this.setState({
      ...this.state,
      containers: nextState
    });
  };
  handleClickRemoveVolume = (id, index) => {
    const nextState = Object.assign([], this.state.containers);
    if (this.state.containers[index].volumeMounts.length > 1) {
      const match = nextState[index].volumeMounts.filter(
        volume => volume.id !== id
      );
      nextState[index].volumeMounts = match;
      this.setState({
        ...this.state,
        containers: nextState
      });
    } else {
      nextState[index].volumeMounts = [
        {
          name: this.state.volumes[0].name,
          mountPath: '',
          subPath: '',
          id: _.uniqueId(),
          index: 0
        }
      ];
      this.setState({
        ...this.state,
        containers: nextState
      });
    }
  };
  handleClickAddVolume = index => {
    const containers = this.state.containers.slice();
    containers[index].volumeMounts.push({
      name: this.state.volumes[0].name,
      mountPath: '',
      subPath: '',
      id: _.uniqueId(),
      index: 0
    });
    this.setState({
      ...this.state,
      containers
    });
  };

  // Render
  renderDeploymentSidebar = () => {
    // const { getVolumesByNSReducer } = this.props;
    // if (
    //   !getVolumesByNSReducer.readyStatus ||
    //   getVolumesByNSReducer.readyStatus === GET_VOLUMES_BY_NS_INVALID ||
    //   getVolumesByNSReducer.readyStatus === GET_VOLUMES_BY_NS_REQUESTING
    // ) {
    //   return (
    //     <div style={{ marginTop: '40px', width: '80%' }}>
    //       {new Array(4)
    //         .fill()
    //         .map(() => (
    //           <img
    //             key={_.uniqueId()}
    //             src={require('../../images/profile-sidebar-big.svg')}
    //             style={{ width: '100%', marginBottom: '20px' }}
    //             alt="sidebar"
    //           />
    //         ))}
    //       {new Array(6)
    //         .fill()
    //         .map(() => (
    //           <img
    //             key={_.uniqueId()}
    //             src={require('../../images/profile-sidebar-small.svg')}
    //             style={{ marginBottom: '20px', float: 'right' }}
    //             alt="sidebar"
    //           />
    //         ))}
    //       {new Array(1)
    //         .fill()
    //         .map(() => (
    //           <img
    //             key={_.uniqueId()}
    //             src={require('../../images/profile-sidebar-big.svg')}
    //             style={{ width: '100%', marginBottom: '20px' }}
    //             alt="sidebar"
    //           />
    //         ))}
    //     </div>
    //   );
    // }

    const arrayOfContainersLinks = [
      'replicas',
      'container1',
      'container1-info',
      'container1-parameters',
      'container1-image-ports',
      'container1-commands',
      'container1-environments',
      'container1-volume',
      'container2',
      'container2-info',
      'container2-parameters',
      'container2-image-ports',
      'container2-commands',
      'container2-environments',
      'container2-volume',
      'container3',
      'container3-info',
      'container3-parameters',
      'container3-image-ports',
      'container3-commands',
      'container3-environments',
      'container3-volume'
    ];
    const { containers } = this.state;
    return (
      <Scrollspy
        items={arrayOfContainersLinks}
        onUpdate={this.handleUpdateMenu}
        style={{
          padding: '20px 0'
        }}
        currentClassName="active"
      >
        <div className="sideMenuHeader">
          <div
            onClick={() => scrollById('replicas')}
            onKeyPress={() => scrollById('replicas')}
            role="presentation"
          >
            replicas
          </div>
        </div>

        <div className="sideMenuHeader" id={`container${1}spy`}>
          <div
            onClick={() => scrollById(`container${1}`)}
            onKeyPress={() => scrollById(`container${1}`)}
            role="presentation"
          >
            Container 1
          </div>
        </div>
        <div
          className="sideMenuHeader sideMenuHeader-nomargin"
          id={`container${1}-info-spy`}
        >
          <div
            className="nav-link sideMenuItem sideMenuItem-transformInit"
            onClick={() => scrollById(`container${1}-info`)}
            onKeyPress={() => scrollById(`container${1}-info`)}
            role="presentation"
          >
            Info
          </div>
        </div>
        <div
          className="sideMenuHeader sideMenuHeader-nomargin"
          id={`container${1}-parameters-spy`}
        >
          <div
            className="nav-link sideMenuItem sideMenuItem-transformInit"
            onClick={() => scrollById(`container${1}-parameters`)}
            onKeyPress={() => scrollById(`container${1}-parameters`)}
            role="presentation"
          >
            Parameters
          </div>
        </div>
        <div
          className="sideMenuHeader sideMenuHeader-nomargin"
          id={`container${1}-image-ports-spy`}
        >
          <div
            className="nav-link sideMenuItem sideMenuItem-transformInit"
            onClick={() => scrollById(`container${1}-image-ports`)}
            onKeyPress={() => scrollById(`container${1}-image-ports`)}
            role="presentation"
          >
            Image Ports
          </div>
        </div>
        <div
          className="sideMenuHeader sideMenuHeader-nomargin"
          id={`container${1}-commands-spy`}
        >
          <div
            className="nav-link sideMenuItem sideMenuItem-transformInit"
            onClick={() => scrollById(`container${1}-commands`)}
            onKeyPress={() => scrollById(`container${1}-commands`)}
            role="presentation"
          >
            Commands
          </div>
        </div>
        <div
          className="sideMenuHeader sideMenuHeader-nomargin"
          id={`container${1}-environments-spy`}
        >
          <div
            className="nav-link sideMenuItem sideMenuItem-transformInit"
            onClick={() => scrollById(`container${1}-environments`)}
            onKeyPress={() => scrollById(`container${1}-environments`)}
            role="presentation"
          >
            Environments
          </div>
        </div>
        <div
          className="sideMenuHeader sideMenuHeader-nomargin"
          id={`container${1}-volume-spy`}
        >
          <div
            className="nav-link sideMenuItem sideMenuItem-transformInit"
            onClick={() => scrollById(`container${1}-volume`)}
            onKeyPress={() => scrollById(`container${1}-volume`)}
            role="presentation"
          >
            Volume
          </div>
        </div>

        <div
          className="sideMenuHeader"
          id={`container${2}spy`}
          style={
            containers.length === 1 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            onClick={() => scrollById(`container${2}`)}
            onKeyPress={() => scrollById(`container${2}`)}
            role="presentation"
          >
            Container 2
          </div>
        </div>
        <div
          className="sideMenuHeader sideMenuHeader-nomargin"
          id={`container${2}-info-spy`}
          style={
            containers.length === 1 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className="sideMenuHeader sideMenuHeader-nomargin"
            id={`container${2}-info-spy`}
          >
            <div
              className="nav-link sideMenuItem sideMenuItem-transformInit"
              onClick={() => scrollById(`container${2}-info`)}
              onKeyPress={() => scrollById(`container${2}-info`)}
              role="presentation"
            >
              Info
            </div>
          </div>
        </div>
        <div
          className="sideMenuHeader sideMenuHeader-nomargin"
          id={`container${2}-parameters-spy`}
          style={
            containers.length === 1 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className="nav-link sideMenuItem sideMenuItem-transformInit"
            onClick={() => scrollById(`container${2}-parameters`)}
            onKeyPress={() => scrollById(`container${2}-parameters`)}
            role="presentation"
          >
            Parameters
          </div>
        </div>
        <div
          className="sideMenuHeader sideMenuHeader-nomargin"
          id={`container${2}-image-ports-spy`}
          style={
            containers.length === 1 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className="sideMenuHeader sideMenuHeader-nomargin"
            id={`container${2}-image-ports-spy`}
          >
            <div
              className="nav-link sideMenuItem sideMenuItem-transformInit"
              onClick={() => scrollById(`container${2}-image-ports`)}
              onKeyPress={() => scrollById(`container${2}-image-ports`)}
              role="presentation"
            >
              Image Ports
            </div>
          </div>
        </div>
        <div
          className="sideMenuHeader sideMenuHeader-nomargin"
          id={`container${2}-commands-spy`}
          style={
            containers.length === 1 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className="sideMenuHeader sideMenuHeader-nomargin"
            id={`container${2}-commands-spy`}
          >
            <div
              className="nav-link sideMenuItem sideMenuItem-transformInit"
              onClick={() => scrollById(`container${2}-commands`)}
              onKeyPress={() => scrollById(`container${2}-commands`)}
              role="presentation"
            >
              Commands
            </div>
          </div>
        </div>
        <div
          className="sideMenuHeader sideMenuHeader-nomargin"
          id={`container${2}-environments-spy`}
          style={
            containers.length === 1 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className="sideMenuHeader sideMenuHeader-nomargin"
            id={`container${2}-environments-spy`}
          >
            <div
              className="nav-link sideMenuItem sideMenuItem-transformInit"
              onClick={() => scrollById(`container${2}-environments`)}
              onKeyPress={() => scrollById(`container${2}-environments`)}
              role="presentation"
            >
              Environments
            </div>
          </div>
        </div>
        <div
          className="sideMenuHeader sideMenuHeader-nomargin"
          id={`container${2}-volume-spy`}
          style={
            containers.length === 1 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className="nav-link sideMenuItem sideMenuItem-transformInit"
            onClick={() => scrollById(`container${2}-volume`)}
            onKeyPress={() => scrollById(`container${2}-volume`)}
            role="presentation"
          >
            Volume
          </div>
        </div>

        <div
          className="sideMenuHeader"
          id={`container${3}spy`}
          style={
            containers.length <= 2 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            onClick={() => scrollById(`container${3}`)}
            onKeyPress={() => scrollById(`container${3}`)}
            role="presentation"
          >
            Container 2
          </div>
        </div>
        <div
          className="sideMenuHeader sideMenuHeader-nomargin"
          id={`container${3}-info-spy`}
          style={
            containers.length <= 2 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className="nav-link sideMenuItem sideMenuItem-transformInit"
            onClick={() => scrollById(`container${3}-info`)}
            onKeyPress={() => scrollById(`container${3}-info`)}
            role="presentation"
          >
            Info
          </div>
        </div>
        <div
          className="sideMenuHeader sideMenuHeader-nomargin"
          id={`container${3}-parameters-spy`}
          style={
            containers.length <= 2 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className="nav-link sideMenuItem sideMenuItem-transformInit"
            onClick={() => scrollById(`container${3}-parameters`)}
            onKeyPress={() => scrollById(`container${3}-parameters`)}
            role="presentation"
          >
            Parameters
          </div>
        </div>
        <div
          className="sideMenuHeader sideMenuHeader-nomargin"
          id={`container${3}-image-ports-spy`}
          style={
            containers.length <= 2 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className="nav-link sideMenuItem sideMenuItem-transformInit"
            onClick={() => scrollById(`container${3}-image-ports`)}
            onKeyPress={() => scrollById(`container${3}-image-ports`)}
            role="presentation"
          >
            Image Ports
          </div>
        </div>
        <div
          className="sideMenuHeader sideMenuHeader-nomargin"
          id={`container${3}-commands-spy`}
          style={
            containers.length <= 2 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className="nav-link sideMenuItem sideMenuItem-transformInit"
            onClick={() => scrollById(`container${3}-commands`)}
            onKeyPress={() => scrollById(`container${3}-commands`)}
            role="presentation"
          >
            Commands
          </div>
        </div>
        <div
          className="sideMenuHeader sideMenuHeader-nomargin"
          id={`container${3}-environments-spy`}
          style={
            containers.length <= 2 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className="nav-link sideMenuItem sideMenuItem-transformInit"
            onClick={() => scrollById(`container${3}-environments`)}
            onKeyPress={() => scrollById(`container${3}-environments`)}
            role="presentation"
          >
            Environments
          </div>
        </div>
        <div
          className="sideMenuHeader sideMenuHeader-nomargin"
          id={`container${3}-volume-spy`}
          style={
            containers.length <= 2 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className="nav-link sideMenuItem sideMenuItem-transformInit"
            onClick={() => scrollById(`container${3}-volume`)}
            onKeyPress={() => scrollById(`container${3}-volume`)}
            role="presentation"
          >
            Volume
          </div>
        </div>
      </Scrollspy>
    );
  };
  renderCreateDeployment = () => {
    const { getDeploymentReducer, match } = this.props;
    if (
      !getDeploymentReducer.readyStatus ||
      getDeploymentReducer.readyStatus === GET_DEPLOYMENT_INVALID ||
      getDeploymentReducer.readyStatus === GET_DEPLOYMENT_REQUESTING
    ) {
      return (
        <div>
          {new Array(7).fill().map(() => (
            <img
              key={_.uniqueId()}
              src={require('../../images/create-dep-serv.svg')}
              style={{
                marginTop: '-2px',
                marginBottom: '30px',
                width: '100%'
              }}
              alt="create service"
            />
          ))}
        </div>
      );
    }

    if (getDeploymentReducer.readyStatus === GET_DEPLOYMENT_FAILURE) {
      return <p>Oops, Failed to load data of Deployment!</p>;
    }

    const { replicas, containers, containersCount, volumes } = this.state;
    return (
      <div>
        <Replicas
          inputReplicas={replicas}
          idDep={match.params.idDep}
          handleChangeInputReplicasName={this.handleChangeInputReplicasName}
        />
        {containers.map((item, index) => (
          <Container
            key={item.id}
            item={item}
            index={index}
            volumes={volumes}
            containersCount={containersCount}
            handleClickContainerRemove={this.handleClickContainerRemove}
            handleClickContainerAdd={this.handleClickContainerAdd}
            handleChangeInputCommon={this.handleChangeInputCommon}
            handleChangeInputParameters={this.handleChangeInputParameters}
            handleChangeInputImagePorts={this.handleChangeInputImagePorts}
            handleClickRemoveImagePort={this.handleClickRemoveImagePort}
            handleClickAddImagePort={this.handleClickAddImagePort}
            handleChangeInputCommands={this.handleChangeInputCommands}
            handleChangeInputEnvironment={this.handleChangeInputEnvironment}
            handleClickRemoveEnvironment={this.handleClickRemoveEnvironment}
            handleClickAddEnvironment={this.handleClickAddEnvironment}
            handleChangeVolumeSelect={this.handleChangeVolumeSelect}
            handleChangeInputVolumePath={this.handleChangeInputVolumePath}
            handleClickRemoveVolume={this.handleClickRemoveVolume}
            handleClickAddVolume={this.handleClickAddVolume}
          />
        ))}
      </div>
    );
  };

  render() {
    const { match, updateDeploymentReducer } = this.props;
    console.log('state', this.state);
    return (
      <div>
        <Helmet
          title={`Update Deployment ${match.params.idDep} in ${
            match.params.idName
          }`}
        />
        <div className="container-fluid breadcrumbNavigation">
          <NavigationHeaderItem
            idName={match.params.idName}
            IdUpdate="deployment"
          />
        </div>
        <Notification
          status={updateDeploymentReducer.status}
          name={updateDeploymentReducer.idDep}
          method={updateDeploymentReducer.method}
          errorMessage={updateDeploymentReducer.err}
        />
        <div className="content-block">
          <div className="container no-back">
            <div className="row pageWidth">
              <div
                className="col-md-3 sideMenu"
                style={{ padding: '20px 0px' }}
              >
                {this.renderDeploymentSidebar()}
              </div>
              <div className="col-md-9 pageContent">
                <form onSubmit={e => this.handleSubmitDeployment(e)}>
                  {this.renderCreateDeployment()}
                  <LoadButton
                    type="submit"
                    buttonText="Update deployment"
                    isFetching={updateDeploymentReducer.isFetching}
                    baseClassButton="btnDeployment btnService"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    // getVolumesByNSReducer,
    getNamespaceReducer,
    updateDeploymentReducer,
    getDeploymentReducer
  }: ReduxState) => ({
    // getVolumesByNSReducer,
    getNamespaceReducer,
    updateDeploymentReducer,
    getDeploymentReducer
  }),
  (dispatch: Dispatch) => ({
    // fetchGetVolumesByNSIfNeeded: (idName: string) =>
    //   dispatch(actionGetVolumes.fetchGetVolumesByNSIfNeeded(idName)),
    fetchGetNamespaceIfNeeded: (idName: string) =>
      dispatch(actionGetNamespace.fetchGetNamespaceIfNeeded(idName)),
    fetchUpdateDeploymentIfNeeded: (
      idName: string,
      idDep: string,
      data: Object
    ) =>
      dispatch(
        actionUpdateDeployment.fetchUpdateDeploymentIfNeeded(
          idName,
          idDep,
          data
        )
      ),
    fetchGetDeploymentIfNeeded: (idName: string, idDep: string) =>
      dispatch(actionGetDeployment.fetchGetDeploymentIfNeeded(idName, idDep))
  })
);

export default connector(CreateDeployment);
