/* @flow */

import React, { PureComponent } from 'react';
import className from 'classnames/bind';
import _ from 'lodash/fp';
import Scrollspy from 'react-scrollspy';
import cloneDeep from 'clone-deep';

import scrollById from '../../functions/scrollById';
import LoadButton from '../../components/LoadButton';
import {
  GET_CONFIG_MAPS_BY_NS_INVALID,
  GET_CONFIG_MAPS_BY_NS_REQUESTING,
  GET_CONFIG_MAPS_BY_NS_FAILURE,
  GET_CONFIG_MAPS_BY_NS_SUCCESS
} from '../../constants/configMapConstants/getConfigMapsByNS';
import { GET_NAMESPACE_SUCCESS } from '../../constants/namespaceConstants/getNamespace';
import { CREATE_DEPLOYMENT_SUCCESS } from '../../constants/deploymentConstants/createDeployment';
import Name from '../../components/CreateDeploymentCards/Name';
import Replicas from '../../components/CreateDeploymentCards/Replicas';
import Container from '../../components/CreateDeploymentCards/Container';
import CreateServiceCardItem from '../CreateUpdateServiceBase';
import globalStyles from '../../theme/global.scss';
import styles from '../CreateDeployment/index.scss';
import buttonsStyles from '../../theme/buttons.scss';
import { routerLinks } from '../../config';
import {
  GET_DEPLOYMENT_FAILURE,
  GET_DEPLOYMENT_INVALID,
  GET_DEPLOYMENT_REQUESTING,
  GET_DEPLOYMENT_SUCCESS
} from '../../constants/deploymentConstants/getDeployment';
import { CREATE_EXTERNAL_SERVICE_SUCCESS } from '../../constants/serviceConstants/createExternalService';

const stylesClass = className.bind(styles);
const buttonsClass = className.bind(buttonsStyles);

const addClass = buttonsClass('buttonUIAddBlock', 'buttonUIAddBlockBig');

const menuItemClassName = stylesClass(
  'sideMenuItem',
  'sideMenuItemTransformInit'
);
// const containerClassName = globalClass(
//   'containerFluid',
//   'breadcrumbsNavigation'
// );

type Props = {
  getNamespaceReducer: Object,
  createDeploymentReducer: Object,
  getConfigMapsByNSReducer: Object,
  history: Object,
  match: Object,
  createExternalServiceReducer: Object,
  fetchGetNamespaceIfNeeded: (idName: string) => void,
  fetchGetConfigMapsByNSIfNeeded: (idName: string) => void,
  // fetchGetVolumesByNSIfNeeded: (idName: string) => void,
  fetchCreateDeploymentIfNeeded: (idName: string, data: Object) => void,
  fetchCreateInternalServiceIfNeeded: (idName: string, data: Object) => void,
  fetchCreateExternalServiceIfNeeded: (idName: string, data: Object) => void,
  // getVolumesByNSReducer: Object
  updateDeploymentReducer: Object,
  getDeploymentReducer: Object,
  fetchUpdateDeploymentIfNeeded: (
    idName: string,
    idDep: string,
    data: Object
  ) => void,
  fetchGetDeploymentIfNeeded: (idName: string, idDep: string) => void
};

export class CreateUpdateDeployment extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = this.initialState();
  }
  componentWillMount() {
    const { fetchGetDeploymentIfNeeded, match } = this.props;
    if (this.props.updateDeploymentReducer) {
      fetchGetDeploymentIfNeeded(match.params.idName, match.params.idDep);
    }
  }
  componentDidMount() {
    const {
      // fetchGetVolumesByNSIfNeeded,
      fetchGetConfigMapsByNSIfNeeded,
      fetchGetNamespaceIfNeeded,
      fetchGetDeploymentIfNeeded,
      getNamespaceReducer,
      match
    } = this.props;
    // fetchGetVolumesByNSIfNeeded(match.params.idName);
    fetchGetConfigMapsByNSIfNeeded(match.params.idName);
    if (getNamespaceReducer.readyStatus !== GET_NAMESPACE_SUCCESS) {
      fetchGetNamespaceIfNeeded(match.params.idName);
    }
    if (this.props.updateDeploymentReducer) {
      fetchGetDeploymentIfNeeded(match.params.idName, match.params.idDep);
    }
  }
  componentWillUpdate(nextProps) {
    // if (
    //   this.props.getVolumesByNSReducer.readyStatus !==
    //     nextProps.getVolumesByNSReducer.readyStatus &&
    //   nextProps.getVolumesByNSReducer.readyStatus === GET_VOLUMES_BY_NS_SUCCESS
    // ) {
    //   if (nextProps.getVolumesByNSReducer.data[0]) {
    //     this.setState({
    //       ...this.state,
    //       volumes: nextProps.getVolumesByNSReducer.data
    //     });
    //   }
    // }
    const serviceObject = this.state;
    const {
      match,
      fetchCreateInternalServiceIfNeeded,
      fetchCreateExternalServiceIfNeeded,
      createExternalServiceReducer
    } = this.props;
    if (
      this.props.createDeploymentReducer &&
      (this.props.createDeploymentReducer.readyStatus !==
        nextProps.createDeploymentReducer.readyStatus &&
        nextProps.createDeploymentReducer.readyStatus ===
          CREATE_DEPLOYMENT_SUCCESS)
    ) {
      if (
        serviceObject.internalSrvObject.length &&
        serviceObject.internalSrvObject[0].internalSrvPort
      ) {
        fetchCreateInternalServiceIfNeeded(match.params.idName, serviceObject);
      }
      if (
        serviceObject.externalSrvObject.length &&
        serviceObject.externalSrvObject[0].externalSrvTargetPort
      ) {
        fetchCreateExternalServiceIfNeeded(match.params.idName, serviceObject);
      } else {
        this.props.history.push(routerLinks.namespaces);
      }
    }
    if (
      createExternalServiceReducer &&
      createExternalServiceReducer.readyStatus !==
        nextProps.createExternalServiceReducer.readyStatus &&
      nextProps.createExternalServiceReducer.readyStatus ===
        CREATE_EXTERNAL_SERVICE_SUCCESS
    ) {
      this.props.history.push(
        routerLinks.createdExternalServiceSuccessfulLink(
          match.params.idName,
          serviceObject.externalSrvNameValue
        )
      );
    }

    if (
      this.props.getDeploymentReducer &&
      (this.props.getDeploymentReducer.readyStatus !==
        nextProps.getDeploymentReducer.readyStatus &&
        nextProps.getDeploymentReducer.readyStatus === GET_DEPLOYMENT_SUCCESS)
    ) {
      const { data } = nextProps.getDeploymentReducer;
      const { name, labels, replicas, containers } = data;
      const containersArr = containers.map((item, index) => {
        const {
          image,
          name: imgName,
          limits,
          ports,
          env,
          commands
          // config_maps: configMaps
          // volumes
        } = item;
        if (ports) {
          ports.map(itemPorts => {
            itemPorts.id = _.uniqueId();
            itemPorts.index = index + 1;
            return null;
          });
        }
        if (env) {
          env.map(itemEnv => {
            itemEnv.id = _.uniqueId();
            itemEnv.index = index + 1;
            return null;
          });
        }
        // if (volumes) {
        //   volumes.map(itemVolume => {
        //     itemVolume.id = _.uniqueId();
        //     itemVolume.index = index + 1;
        //     return null;
        //   });
        // }
        // if (configMaps) {
        //   configMaps.map(itemConfigMap => {
        //     itemConfigMap.id = _.uniqueId();
        //     itemConfigMap.index = index + 1;
        //     delete itemConfigMap.mode;
        //     return null;
        //   });
        // }
        return {
          id: _.uniqueId(),
          image,
          name: imgName,
          limits: {
            cpu: limits.cpu,
            memory: limits.memory
          },
          ports: ports || [
            {
              containerPort: '',
              id: _.uniqueId(),
              index: 1
            }
          ],
          env: env || [
            {
              value: '',
              name: '',
              id: _.uniqueId(),
              index: 1
            }
          ],
          command: commands || [],
          volumeMounts: [],
          config_maps: []
          // config_maps: configMaps || []
          // volumeMounts: volumes || []
        };
      });
      if (containers.length === containersArr.length) {
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
    if (
      this.props.getConfigMapsByNSReducer.readyStatus !==
        nextProps.getConfigMapsByNSReducer.readyStatus &&
      nextProps.getConfigMapsByNSReducer.readyStatus ===
        GET_CONFIG_MAPS_BY_NS_SUCCESS
    ) {
      if (nextProps.getConfigMapsByNSReducer.data.length) {
        this.setState(
          {
            ...this.state,
            configMaps: nextProps.getConfigMapsByNSReducer.data
          },
          () => {
            if (this.props.updateDeploymentReducer) {
              const configMapsNextState = [];
              nextProps.getDeploymentReducer.data &&
                nextProps.getDeploymentReducer.data.containers.map(
                  container => {
                    const configMapsInContainer = [];
                    nextProps.getConfigMapsByNSReducer.data.map(
                      configMapRed => {
                        if (container.config_maps) {
                          container.config_maps.map(configMap => {
                            if (configMapRed.name === configMap.name) {
                              configMapsInContainer.push(configMap);
                            }
                            return null;
                          });
                        }
                        return null;
                      }
                    );
                    configMapsNextState.push(configMapsInContainer);
                    return null;
                  }
                );
              const nextContainers = cloneDeep(this.state.containers);
              nextContainers.map((container, index) => {
                container.config_maps = configMapsNextState[index];
                return null;
              });
              this.setState({
                ...this.state,
                containers: nextContainers
              });
            }
          }
        );
      }
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
        volumeMounts: [],
        config_maps: []
      }
    ],
    volumes: [],
    configMaps: [],
    containersCount: 1,
    isActiveService: false,
    activeSubMenu: `container${1}`,

    currentDeployment: '',
    isActiveInternal: false,
    isActiveExternal: false,
    internalSrvObject: [
      {
        internalSrvName: '',
        internalSrvPort: '',
        internalSrvTargetPort: '',
        intServiceType: 'TCP',
        id: _.uniqueId(),
        index: 0
      }
    ],
    internalSrvName: '',
    externalSrvObject: [
      {
        externalSrvName: '',
        externalSrvTargetPort: '',
        extServiceType: 'TCP',
        id: _.uniqueId(),
        index: 0
      }
    ],
    externalSrvName: ''
  });
  handleSubmitDeployment = e => {
    e.preventDefault();
    const { fetchCreateDeploymentIfNeeded, match } = this.props;
    fetchCreateDeploymentIfNeeded(match.params.idName, this.state);
  };
  handleSubmitUpdateDeployment = e => {
    e.preventDefault();
    const { fetchUpdateDeploymentIfNeeded, match } = this.props;
    fetchUpdateDeploymentIfNeeded(
      match.params.idName,
      match.params.idDep,
      this.state
    );
  };
  handleChangeState = obj => {
    const state = Object.assign({}, this.state, obj);
    this.setState(state);
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
            // document.getElementById(
            //   `container${item}-image-ports-spy`
            // ).style.display =
            //   'block';
            // document.getElementById(
            //   `container${item}-commands-spy`
            // ).style.display =
            //   'block';
            document.getElementById(
              `container${item}-environments-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-volume-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-configMap-spy`
            ).style.display =
              'block';
          } else {
            document.getElementById(`container${item}-info-spy`).style.display =
              'none';
            document.getElementById(
              `container${item}-parameters-spy`
            ).style.display =
              'none';
            // document.getElementById(
            //   `container${item}-image-ports-spy`
            // ).style.display =
            //   'none';
            // document.getElementById(
            //   `container${item}-commands-spy`
            // ).style.display =
            //   'none';
            document.getElementById(
              `container${item}-environments-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-volume-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-configMap-spy`
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
            // document.getElementById(
            //   `container${item}-image-ports-spy`
            // ).style.display =
            //   'block';
            // document.getElementById(
            //   `container${item}-commands-spy`
            // ).style.display =
            //   'block';
            document.getElementById(
              `container${item}-environments-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-volume-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-configMap-spy`
            ).style.display =
              'block';
          } else {
            document.getElementById(`container${item}-info-spy`).style.display =
              'none';
            document.getElementById(
              `container${item}-parameters-spy`
            ).style.display =
              'none';
            // document.getElementById(
            //   `container${item}-image-ports-spy`
            // ).style.display =
            //   'none';
            // document.getElementById(
            //   `container${item}-commands-spy`
            // ).style.display =
            //   'none';
            document.getElementById(
              `container${item}-environments-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-volume-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-configMap-spy`
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
            // document.getElementById(
            //   `container${item}-image-ports-spy`
            // ).style.display =
            //   'block';
            // document.getElementById(
            //   `container${item}-commands-spy`
            // ).style.display =
            //   'block';
            document.getElementById(
              `container${item}-environments-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-volume-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-configMap-spy`
            ).style.display =
              'block';
          } else {
            document.getElementById(`container${item}-info-spy`).style.display =
              'none';
            document.getElementById(
              `container${item}-parameters-spy`
            ).style.display =
              'none';
            // document.getElementById(
            //   `container${item}-image-ports-spy`
            // ).style.display =
            //   'none';
            // document.getElementById(
            //   `container${item}-commands-spy`
            // ).style.display =
            //   'none';
            document.getElementById(
              `container${item}-environments-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-volume-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-configMap-spy`
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
            // document.getElementById(
            //   `container${item}-image-ports-spy`
            // ).style.display =
            //   'block';
            // document.getElementById(
            //   `container${item}-commands-spy`
            // ).style.display =
            //   'block';
            document.getElementById(
              `container${item}-environments-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-volume-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-configMap-spy`
            ).style.display =
              'block';
          } else {
            document.getElementById(`container${item}-info-spy`).style.display =
              'none';
            document.getElementById(
              `container${item}-parameters-spy`
            ).style.display =
              'none';
            // document.getElementById(
            //   `container${item}-image-ports-spy`
            // ).style.display =
            //   'none';
            // document.getElementById(
            //   `container${item}-commands-spy`
            // ).style.display =
            //   'none';
            document.getElementById(
              `container${item}-environments-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-volume-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-configMap-spy`
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
            // document.getElementById(
            //   `container${item}-image-ports-spy`
            // ).style.display =
            //   'block';
            // document.getElementById(
            //   `container${item}-commands-spy`
            // ).style.display =
            //   'block';
            document.getElementById(
              `container${item}-environments-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-volume-spy`
            ).style.display =
              'block';
            document.getElementById(
              `container${item}-configMap-spy`
            ).style.display =
              'block';
          } else {
            document.getElementById(`container${item}-info-spy`).style.display =
              'none';
            document.getElementById(
              `container${item}-parameters-spy`
            ).style.display =
              'none';
            // document.getElementById(
            //   `container${item}-image-ports-spy`
            // ).style.display =
            //   'none';
            // document.getElementById(
            //   `container${item}-commands-spy`
            // ).style.display =
            //   'none';
            document.getElementById(
              `container${item}-environments-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-volume-spy`
            ).style.display =
              'none';
            document.getElementById(
              `container${item}-configMap-spy`
            ).style.display =
              'none';
          }
          return null;
        });
      }
    }
  };
  // Name
  handleChangeInputName = value => {
    this.setState({
      ...this.state,
      name: value,
      currentDeployment: value
    });
  };
  // ReplicasName
  handleChangeInputReplicasName = value => {
    this.setState({
      ...this.state,
      replicas: value
    });
  };
  // Label
  handleClickRemoveLabel = id => {
    if (this.state.labels.length > 1) {
      const nextLabels = Object.assign({}, this.state).labels.filter(
        item => item.id !== id
      );
      this.setState({
        ...this.state,
        labels: nextLabels
      });
    } else {
      this.setState({
        ...this.state,
        labels: [
          {
            key: '',
            label: '',
            id: _.uniqueId()
          }
        ]
      });
    }
  };
  handleClickAddLabel = () => {
    this.setState({
      labels: [
        ...this.state.labels,
        {
          key: '',
          label: '',
          id: _.uniqueId()
        }
      ]
    });
  };
  handleChangeInputLabel = (value, id, type) => {
    const nextState = Object.assign([], this.state.labels);
    const match = nextState.find(label => label.id === id);
    const currentIndex = nextState.findIndex(label => label.id === id);
    const matchUpdated = { ...match, [`${type}`]: value };
    this.setState({
      ...this.state,
      labels: [
        ...this.state.labels.slice(0, currentIndex),
        Object.assign({}, this.state.labels[currentIndex], matchUpdated),
        ...this.state.labels.slice(currentIndex + 1)
      ]
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
          volumeMounts: [],
          config_maps: []
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
  handleChangeSelect = (value, id, index, indexVolume, type) => {
    const nextState = Object.assign([], this.state.containers);
    nextState[index][type][indexVolume].name = value;
    this.setState({
      ...this.state,
      containers: nextState
    });
  };
  handleChangeInputPath = (value, id, index, indexVolume, type, typeList) => {
    const nextState = Object.assign([], this.state.containers);
    nextState[index][typeList][indexVolume][`${type}`] = value;
    this.setState({
      ...this.state,
      containers: nextState
    });
  };
  handleClickRemove = (id, index, type) => {
    const nextState = Object.assign([], this.state.containers);
    if (this.state.containers[index][type].length > 1) {
      const match = nextState[index][type].filter(volume => volume.id !== id);
      nextState[index][type] = match;
      this.setState({
        ...this.state,
        containers: nextState
      });
    } else {
      nextState[index][type] = [];
      // [
      //   {
      //     name: this.state[typeList][0].name,
      //     mount_path: '',
      //     subPath: '',
      //     id: _.uniqueId(),
      //     index: 0
      //   }
      // ];
      this.setState({
        ...this.state,
        containers: nextState
      });
    }
  };
  handleClickAdd = (index, type, typeList) => {
    const containers = this.state.containers.slice();
    containers[index][type].push({
      name: this.state[typeList][0].name,
      mount_path: '',
      subPath: '',
      id: _.uniqueId(),
      index: 0
    });
    this.setState({
      ...this.state,
      containers
    });
  };

  // Service
  handleClickCreateService = () => {
    this.setState({
      ...this.state,
      isActiveService: !this.state.isActiveService
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

    const { getConfigMapsByNSReducer } = this.props;
    if (
      !getConfigMapsByNSReducer.readyStatus ||
      getConfigMapsByNSReducer.readyStatus === GET_CONFIG_MAPS_BY_NS_INVALID ||
      getConfigMapsByNSReducer.readyStatus === GET_CONFIG_MAPS_BY_NS_REQUESTING
    ) {
      return (
        <div style={{ marginTop: '40px', width: '80%' }}>
          {new Array(4)
            .fill()
            .map(() => (
              <img
                key={_.uniqueId()}
                src={require('../../images/profile-sidebar-big.svg')}
                style={{ width: '100%', marginBottom: '20px' }}
                alt="sidebar"
              />
            ))}
          {new Array(6)
            .fill()
            .map(() => (
              <img
                key={_.uniqueId()}
                src={require('../../images/profile-sidebar-small.svg')}
                style={{ marginBottom: '20px', float: 'right' }}
                alt="sidebar"
              />
            ))}
          {new Array(1)
            .fill()
            .map(() => (
              <img
                key={_.uniqueId()}
                src={require('../../images/profile-sidebar-big.svg')}
                style={{ width: '100%', marginBottom: '20px' }}
                alt="sidebar"
              />
            ))}
        </div>
      );
    }

    if (
      getConfigMapsByNSReducer.readyStatus === GET_CONFIG_MAPS_BY_NS_FAILURE
    ) {
      return <p>Oops, Failed to load data of Deployment!</p>;
    }
    const arrayOfContainersLinks = [
      'name',
      'labels',
      'replicas',
      'container1',
      'container1-info',
      'container1-parameters',
      'container1-image-ports',
      'container1-commands',
      'container1-environments',
      'container1-volume',
      'container1-configMap',
      'container2',
      'container2-info',
      'container2-parameters',
      'container2-image-ports',
      'container2-commands',
      'container2-environments',
      'container2-volume',
      'container2-configMap',
      'container3',
      'container3-info',
      'container3-parameters',
      'container3-image-ports',
      'container3-commands',
      'container3-environments',
      'container3-volume',
      'container3-configMap'
    ];
    const { containers } = this.state;
    return (
      <Scrollspy
        items={arrayOfContainersLinks}
        onUpdate={this.handleUpdateMenu}
        style={{
          padding: '20px 0'
        }}
        currentClassName={styles.sideMenuHeaderActive}
      >
        <div className={styles.sideMenuHeader}>
          <div
            onClick={() => scrollById('name')}
            onKeyPress={() => scrollById('name')}
            role="presentation"
          >
            name
          </div>
        </div>
        <div className={styles.sideMenuHeader}>
          <div
            onClick={() => scrollById('labels')}
            onKeyPress={() => scrollById('labels')}
            role="presentation"
          >
            labels
          </div>
        </div>
        <div className={styles.sideMenuHeader}>
          <div
            onClick={() => scrollById('replicas')}
            onKeyPress={() => scrollById('replicas')}
            role="presentation"
          >
            replicas
          </div>
        </div>

        <div className={styles.sideMenuHeader} id={`container${1}spy`}>
          <div
            onClick={() => scrollById(`container${1}`)}
            onKeyPress={() => scrollById(`container${1}`)}
            role="presentation"
          >
            Container 1
          </div>
        </div>
        <div
          className={`${styles.sideMenuHeader} m-0`}
          id={`container${1}-info-spy`}
        >
          <div
            className={`${menuItemClassName} nav-link`}
            onClick={() => scrollById(`container${1}-info`)}
            onKeyPress={() => scrollById(`container${1}-info`)}
            role="presentation"
          >
            Info
          </div>
        </div>
        <div
          className={`${styles.sideMenuHeader} m-0`}
          id={`container${1}-parameters-spy`}
        >
          <div
            className={`${menuItemClassName} nav-link`}
            onClick={() => scrollById(`container${1}-parameters`)}
            onKeyPress={() => scrollById(`container${1}-parameters`)}
            role="presentation"
          >
            Parameters
          </div>
        </div>
        {/* <div */}
        {/* className={`${styles.sideMenuHeader} m-0`} */}
        {/* id={`container${1}-image-ports-spy`} */}
        {/* > */}
        {/* <div */}
        {/* className={`${menuItemClassName} nav-link`} */}
        {/* onClick={() => scrollById(`container${1}-image-ports`)} */}
        {/* onKeyPress={() => scrollById(`container${1}-image-ports`)} */}
        {/* role="presentation" */}
        {/* > */}
        {/* Image Ports */}
        {/* </div> */}
        {/* </div> */}
        {/* <div */}
        {/* className={`${styles.sideMenuHeader} m-0`} */}
        {/* id={`container${1}-commands-spy`} */}
        {/* > */}
        {/* <div */}
        {/* className={`${menuItemClassName} nav-link`} */}
        {/* onClick={() => scrollById(`container${1}-commands`)} */}
        {/* onKeyPress={() => scrollById(`container${1}-commands`)} */}
        {/* role="presentation" */}
        {/* > */}
        {/* Commands */}
        {/* </div> */}
        {/* </div> */}
        <div
          className={`${styles.sideMenuHeader} m-0`}
          id={`container${1}-environments-spy`}
        >
          <div
            className={`${menuItemClassName} nav-link`}
            onClick={() => scrollById(`container${1}-environments`)}
            onKeyPress={() => scrollById(`container${1}-environments`)}
            role="presentation"
          >
            Environments
          </div>
        </div>
        <div
          className={`${styles.sideMenuHeader} m-0`}
          id={`container${1}-volume-spy`}
        >
          <div
            className={`${menuItemClassName} nav-link`}
            onClick={() => scrollById(`container${1}-volume`)}
            onKeyPress={() => scrollById(`container${1}-volume`)}
            role="presentation"
          >
            Volume
          </div>
        </div>
        <div
          className={`${styles.sideMenuHeader} m-0`}
          id={`container${1}-configMap-spy`}
        >
          <div
            className={`${menuItemClassName} nav-link`}
            onClick={() => scrollById(`container${1}-configMap`)}
            onKeyPress={() => scrollById(`container${1}-configMap`)}
            role="presentation"
          >
            ConfigMap
          </div>
        </div>

        <div
          className={styles.sideMenuHeader}
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
          className={`${styles.sideMenuHeader} m-0`}
          id={`container${2}-info-spy`}
          style={
            containers.length === 1 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className={`${styles.sideMenuHeader} m-0`}
            id={`container${2}-info-spy`}
          >
            <div
              className={`${menuItemClassName} nav-link`}
              onClick={() => scrollById(`container${2}-info`)}
              onKeyPress={() => scrollById(`container${2}-info`)}
              role="presentation"
            >
              Info
            </div>
          </div>
        </div>
        <div
          className={`${styles.sideMenuHeader} m-0`}
          id={`container${2}-parameters-spy`}
          style={
            containers.length === 1 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className={`${menuItemClassName} nav-link`}
            onClick={() => scrollById(`container${2}-parameters`)}
            onKeyPress={() => scrollById(`container${2}-parameters`)}
            role="presentation"
          >
            Parameters
          </div>
        </div>
        {/* <div */}
        {/* className={`${styles.sideMenuHeader} m-0`} */}
        {/* id={`container${2}-image-ports-spy`} */}
        {/* style={ */}
        {/* containers.length === 1 ? { display: 'none' } : { display: 'block' } */}
        {/* } */}
        {/* > */}
        {/* /!* <div *!/ */}
        {/* /!* className={`${styles.sideMenuHeader} m-0`} *!/ */}
        {/* /!* id={`container${2}-image-ports-spy`} *!/ */}
        {/* /!* > *!/ */}
        {/* /!* <div *!/ */}
        {/* /!* className={`${menuItemClassName} nav-link`} *!/ */}
        {/* /!* onClick={() => scrollById(`container${2}-image-ports`)} *!/ */}
        {/* /!* onKeyPress={() => scrollById(`container${2}-image-ports`)} *!/ */}
        {/* /!* role="presentation" *!/ */}
        {/* /!* > *!/ */}
        {/* /!* Image Ports *!/ */}
        {/* /!* </div> *!/ */}
        {/* /!* </div> *!/ */}
        {/* /!* </div> *!/ */}
        {/* /!* <div *!/ */}
        {/* /!* className={`${styles.sideMenuHeader} m-0`} *!/ */}
        {/* /!* id={`container${2}-commands-spy`} *!/ */}
        {/* /!* style={ *!/ */}
        {/* /!* containers.length === 1 ? { display: 'none' } : { display: 'block' } *!/ */}
        {/* /!* } *!/ */}
        {/* /!* > *!/ */}
        {/* /!* <div *!/ */}
        {/* /!* className={`${styles.sideMenuHeader} m-0`} *!/ */}
        {/* /!* id={`container${2}-commands-spy`} *!/ */}
        {/* /!* > *!/ */}
        {/* /!* <div *!/ */}
        {/* /!* className={`${menuItemClassName} nav-link`} *!/ */}
        {/* /!* onClick={() => scrollById(`container${2}-commands`)} *!/ */}
        {/* /!* onKeyPress={() => scrollById(`container${2}-commands`)} *!/ */}
        {/* /!* role="presentation" *!/ */}
        {/* /!* > *!/ */}
        {/* /!* Commands *!/ */}
        {/* /!* </div> *!/ */}
        {/* /!* </div> *!/ */}
        {/* </div> */}
        <div
          className={`${styles.sideMenuHeader} m-0`}
          id={`container${2}-environments-spy`}
          style={
            containers.length === 1 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className={`${styles.sideMenuHeader} m-0`}
            id={`container${2}-environments-spy`}
          >
            <div
              className={`${menuItemClassName} nav-link`}
              onClick={() => scrollById(`container${2}-environments`)}
              onKeyPress={() => scrollById(`container${2}-environments`)}
              role="presentation"
            >
              Environments
            </div>
          </div>
        </div>
        <div
          className={`${styles.sideMenuHeader} m-0`}
          id={`container${2}-volume-spy`}
          style={
            containers.length === 1 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className={`${menuItemClassName} nav-link`}
            onClick={() => scrollById(`container${2}-volume`)}
            onKeyPress={() => scrollById(`container${2}-volume`)}
            role="presentation"
          >
            Volume
          </div>
        </div>
        <div
          className={`${styles.sideMenuHeader} m-0`}
          id={`container${2}-configMap-spy`}
          style={
            containers.length === 1 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className={`${menuItemClassName} nav-link`}
            onClick={() => scrollById(`container${2}-configMap`)}
            onKeyPress={() => scrollById(`container${2}-configMap`)}
            role="presentation"
          >
            ConfigMap
          </div>
        </div>

        <div
          className={styles.sideMenuHeader}
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
            Container 3
          </div>
        </div>
        <div
          className={`${styles.sideMenuHeader} m-0`}
          id={`container${3}-info-spy`}
          style={
            containers.length <= 2 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className={`${menuItemClassName} nav-link`}
            onClick={() => scrollById(`container${3}-info`)}
            onKeyPress={() => scrollById(`container${3}-info`)}
            role="presentation"
          >
            Info
          </div>
        </div>
        <div
          className={`${styles.sideMenuHeader} m-0`}
          id={`container${3}-parameters-spy`}
          style={
            containers.length <= 2 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className={`${menuItemClassName} nav-link`}
            onClick={() => scrollById(`container${3}-parameters`)}
            onKeyPress={() => scrollById(`container${3}-parameters`)}
            role="presentation"
          >
            Parameters
          </div>
        </div>
        {/* <div */}
        {/* className={`${styles.sideMenuHeader} m-0`} */}
        {/* id={`container${3}-image-ports-spy`} */}
        {/* style={ */}
        {/* containers.length <= 2 ? { display: 'none' } : { display: 'block' } */}
        {/* } */}
        {/* > */}
        {/* <div */}
        {/* className={`${menuItemClassName} nav-link`} */}
        {/* onClick={() => scrollById(`container${3}-image-ports`)} */}
        {/* onKeyPress={() => scrollById(`container${3}-image-ports`)} */}
        {/* role="presentation" */}
        {/* > */}
        {/* Image Ports */}
        {/* </div> */}
        {/* </div> */}
        {/* <div */}
        {/* className={`${styles.sideMenuHeader} m-0`} */}
        {/* id={`container${3}-commands-spy`} */}
        {/* style={ */}
        {/* containers.length <= 2 ? { display: 'none' } : { display: 'block' } */}
        {/* } */}
        {/* > */}
        {/* <div */}
        {/* className={`${menuItemClassName} nav-link`} */}
        {/* onClick={() => scrollById(`container${3}-commands`)} */}
        {/* onKeyPress={() => scrollById(`container${3}-commands`)} */}
        {/* role="presentation" */}
        {/* > */}
        {/* Commands */}
        {/* </div> */}
        {/* </div> */}
        <div
          className={`${styles.sideMenuHeader} m-0`}
          id={`container${3}-environments-spy`}
          style={
            containers.length <= 2 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className={`${menuItemClassName} nav-link`}
            onClick={() => scrollById(`container${3}-environments`)}
            onKeyPress={() => scrollById(`container${3}-environments`)}
            role="presentation"
          >
            Environments
          </div>
        </div>
        <div
          className={`${styles.sideMenuHeader} m-0`}
          id={`container${3}-volume-spy`}
          style={
            containers.length <= 2 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className={`${menuItemClassName} nav-link`}
            onClick={() => scrollById(`container${3}-volume`)}
            onKeyPress={() => scrollById(`container${3}-volume`)}
            role="presentation"
          >
            Volume
          </div>
        </div>
        <div
          className={`${styles.sideMenuHeader} m-0`}
          id={`container${3}-configMap-spy`}
          style={
            containers.length <= 2 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div
            className={`${menuItemClassName} nav-link`}
            onClick={() => scrollById(`container${3}-configMap`)}
            onKeyPress={() => scrollById(`container${3}-configMap`)}
            role="presentation"
          >
            ConfigMap
          </div>
        </div>

        <div className={styles.sideMenuHeader}>
          <div
            onClick={() => scrollById('linked-services')}
            onKeyPress={() => scrollById('linked-services')}
            role="presentation"
          >
            Linked Services
          </div>
        </div>
        <ul className="nav flex-column linkedMenu" />
      </Scrollspy>
    );
  };
  renderCreateDeployment = () => {
    // const { getVolumesByNSReducer, match } = this.props;
    // if (
    //   !getVolumesByNSReducer.readyStatus ||
    //   getVolumesByNSReducer.readyStatus === GET_VOLUMES_BY_NS_INVALID ||
    //   getVolumesByNSReducer.readyStatus === GET_VOLUMES_BY_NS_REQUESTING
    // ) {
    //   return (
    //     <div>
    //       {new Array(9).fill().map(() => (
    //         <img
    //           key={_.uniqueId()}
    //           src={require('../../images/create-dep-serv.svg')}
    //           style={{
    //             marginTop: '-2px',
    //             marginBottom: '30px',
    //             width: '100%'
    //           }}
    //           alt="create service"
    //         />
    //       ))}
    //     </div>
    //   );
    // }
    //
    // if (getVolumesByNSReducer.readyStatus === GET_VOLUMES_BY_NS_FAILURE) {
    //   return <p>Oops, Failed to load data of Deployment!</p>;
    // }

    const {
      getConfigMapsByNSReducer,
      getDeploymentReducer,
      match
    } = this.props;
    if (
      !getConfigMapsByNSReducer.readyStatus ||
      getConfigMapsByNSReducer.readyStatus === GET_CONFIG_MAPS_BY_NS_INVALID ||
      getConfigMapsByNSReducer.readyStatus === GET_CONFIG_MAPS_BY_NS_REQUESTING
    ) {
      return (
        <div>
          {new Array(9).fill().map(() => (
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

    if (
      getConfigMapsByNSReducer.readyStatus === GET_CONFIG_MAPS_BY_NS_FAILURE
    ) {
      return <p>Oops, Failed to load data of Deployment!</p>;
    }

    if (this.props.createDeploymentReducer) {
      const {
        name,
        // labels,
        replicas,
        containers,
        containersCount,
        volumes,
        configMaps,
        isActiveService
      } = this.state;
      return (
        <div>
          <Name
            inputName={name}
            handleChangeInputName={this.handleChangeInputName}
          />
          {/* {' '}
        <Label
          labels={labels}
          handleClickRemoveLabel={this.handleClickRemoveLabel}
          handleClickAddLabel={this.handleClickAddLabel}
          handleChangeInputLabel={this.handleChangeInputLabel}
        /> */}
          <Replicas
            inputReplicas={replicas}
            handleChangeInputReplicasName={this.handleChangeInputReplicasName}
          />
          {containers.map((item, index) => (
            <Container
              key={item.id}
              item={item}
              index={index}
              volumes={volumes}
              configMaps={configMaps}
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
              handleChangeSelect={this.handleChangeSelect}
              handleChangeInputPath={this.handleChangeInputPath}
              handleClickRemove={this.handleClickRemove}
              handleClickAdd={this.handleClickAdd}
            />
          ))}
          <div id="linked-services">
            {isActiveService ? (
              <CreateServiceCardItem
                deploymentsData={name}
                idName={match.params.idName}
                handleChangeState={this.handleChangeState}
                handleChangeActivityInternal={() =>
                  this.setState({
                    ...this.state,
                    isActiveInternal: !this.state.isActiveInternal,
                    internalSrvObject: [
                      {
                        internalSrvName: '',
                        internalSrvPort: '',
                        internalSrvTargetPort: '',
                        intServiceType: 'TCP',
                        id: _.uniqueId(),
                        index: 0
                      }
                    ]
                  })
                }
                handleChangeActivityExternal={() =>
                  this.setState({
                    ...this.state,
                    isActiveExternal: !this.state.isActiveExternal,
                    externalSrvObject: [
                      {
                        externalSrvName: '',
                        externalSrvTargetPort: '',
                        extServiceType: 'TCP',
                        id: _.uniqueId(),
                        index: 0
                      }
                    ]
                  })
                }
              />
            ) : (
              <div
                className={`${addClass} ${globalStyles.marginTop10}`}
                onClick={this.handleClickCreateService}
                onKeyPress={this.handleClickCreateService}
                role="presentation"
              >
                + Add Linked Services
                {/* <Tooltip */}
                {/* placement='top' */}
                {/* trigger={['hover']} */}
                {/* overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>} */}
                {/* > */}
                {/* <span className="myTooltip" data-toggle="tooltip">?</span> */}
                {/* </Tooltip> */}
              </div>
            )}
          </div>
        </div>
      );
    }

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

    if (getDeploymentReducer.readyStatus === GET_DEPLOYMENT_SUCCESS) {
      const {
        replicas,
        containers,
        containersCount,
        configMaps,
        volumes
      } = this.state;
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
              configMaps={configMaps}
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
              handleChangeSelect={this.handleChangeSelect}
              handleChangeInputPath={this.handleChangeInputPath}
              handleClickRemove={this.handleClickRemove}
              handleClickAdd={this.handleClickAdd}
            />
          ))}
        </div>
      );
    }

    return null;
  };

  render() {
    return (
      <div className={`${styles.pageWidth} row`}>
        <div
          className={`${styles.sideMenu} col-md-3`}
          style={{ padding: '20px 0px' }}
        >
          {this.renderDeploymentSidebar()}
        </div>
        <div className="col-md-9">
          <form
            onSubmit={
              (this.props.createDeploymentReducer &&
                (e => this.handleSubmitDeployment(e))) ||
              (this.props.updateDeploymentReducer &&
                (e => this.handleSubmitUpdateDeployment(e)))
            }
          >
            {this.renderCreateDeployment()}
            <LoadButton
              type="submit"
              buttonText={
                (this.props.createDeploymentReducer && 'Create deployment') ||
                (this.props.updateDeploymentReducer && 'Update deployment')
              }
              isFetching={
                (this.props.createDeploymentReducer &&
                  this.props.createDeploymentReducer.isFetching) ||
                (this.props.updateDeploymentReducer &&
                  this.props.updateDeploymentReducer.isFetching)
              }
              baseClassButton={`${buttonsStyles.buttonUILoadButton} ${
                globalStyles.marginBottom50
              } ${globalStyles.marginTop10}`}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default CreateUpdateDeployment;
