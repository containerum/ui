/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import className from 'classnames/bind';

import type { Dispatch, ReduxState } from '../../types';
import * as actionGetConfigMapsByNS from '../../actions/configMapActions/getConfigMapsByNS';
import * as actionGetDeployment from '../../actions/deploymentActions/getDeployment';
import * as actionDeletePod from '../../actions/configMapActions/deleteConfigMap';
import {
  GET_DEPLOYMENT_INVALID,
  GET_DEPLOYMENT_REQUESTING,
  GET_DEPLOYMENT_FAILURE,
  GET_DEPLOYMENT_SUCCESS
} from '../../constants/deploymentConstants/getDeployment';
import {
  DELETE_CONFIG_MAP_SUCCESS,
  DELETE_CONFIG_MAP_REQUESTING
} from '../../constants/configMapConstants/deleteConfigMap';
import ConfigMapsList from '../../components/LinkedConfigMapsList';
import Notification from '../Notification';

import globalStyles from '../../theme/global.scss';
import {
  GET_NAMESPACES_FAILURE,
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING
} from '../../constants/namespacesConstants/getNamespaces';
import {
  GET_CONFIG_MAPS_BY_NS_FAILURE,
  GET_CONFIG_MAPS_BY_NS_INVALID,
  GET_CONFIG_MAPS_BY_NS_REQUESTING
} from '../../constants/configMapConstants/getConfigMapsByNS';

const globalClass = className.bind(globalStyles);

const contentClassName = globalClass(
  'contentBlockContent',
  'contentBlockContentFull'
);

type Props = {
  match: Object,
  getDeploymentReducer: Object,
  getNamespacesReducer: Object,
  getConfigMapsByNSReducer: Object,
  deleteConfigMapReducer: Object,
  fetchGetConfigMapsByNSIfNeeded: (idName: string) => void,
  fetchDeleteConfigMapIfNeeded: (idName: string, idPod: string) => void,
  fetchGetDeploymentIfNeeded: (idName: string, idDep: string) => void
};

export class LinkedConfigMaps extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      displayedContainers: []
    };
  }
  componentDidMount() {
    const { fetchGetConfigMapsByNSIfNeeded, match } = this.props;
    fetchGetConfigMapsByNSIfNeeded(match.params.idName);
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getDeploymentReducer.readyStatus !==
        nextProps.getDeploymentReducer.readyStatus &&
      nextProps.getDeploymentReducer.readyStatus === GET_DEPLOYMENT_SUCCESS
    ) {
      const configMaps = nextProps.getDeploymentReducer.data.containers.map(
        container => container.config_maps
      );
      this.setState({
        ...this.state,
        displayedContainers: configMaps ? configMaps[0] : []
      });
    }
    if (
      this.props.deleteConfigMapReducer.readyStatus !==
        nextProps.deleteConfigMapReducer.readyStatus &&
      nextProps.deleteConfigMapReducer.readyStatus === DELETE_CONFIG_MAP_SUCCESS
    ) {
      const { fetchGetDeploymentIfNeeded, match } = this.props;
      fetchGetDeploymentIfNeeded(match.params.idName, match.params.idDep);
    }
  }
  handleDeleteConfigMap = configMapName => {
    const { fetchDeleteConfigMapIfNeeded, match } = this.props;
    fetchDeleteConfigMapIfNeeded(match.params.idName, configMapName);
  };

  renderConfigMapsList = () => {
    const {
      match,
      getDeploymentReducer,
      getNamespacesReducer,
      getConfigMapsByNSReducer,
      deleteConfigMapReducer
    } = this.props;

    if (
      !getNamespacesReducer.readyStatus ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING ||
      !getConfigMapsByNSReducer.readyStatus ||
      getConfigMapsByNSReducer.readyStatus === GET_CONFIG_MAPS_BY_NS_INVALID ||
      getConfigMapsByNSReducer.readyStatus ===
        GET_CONFIG_MAPS_BY_NS_REQUESTING ||
      !getDeploymentReducer.readyStatus ||
      getDeploymentReducer.readyStatus === GET_DEPLOYMENT_INVALID ||
      getDeploymentReducer.readyStatus === GET_DEPLOYMENT_REQUESTING ||
      deleteConfigMapReducer.readyStatus === DELETE_CONFIG_MAP_REQUESTING
    ) {
      return (
        <div
          style={{
            height: '270px',
            margin: '0 30px',
            borderRadius: '2px',
            backgroundColor: '#f6f6f6'
          }}
        />
      );
    }

    if (
      getNamespacesReducer.readyStatus === GET_NAMESPACES_FAILURE ||
      getConfigMapsByNSReducer.readyStatus === GET_CONFIG_MAPS_BY_NS_FAILURE ||
      getDeploymentReducer.readyStatus === GET_DEPLOYMENT_FAILURE
    ) {
      return <p>Oops, Failed to load data of Pods!</p>;
    }

    return (
      <ConfigMapsList
        configMapsData={getConfigMapsByNSReducer.data}
        displayedContainers={this.state.displayedContainers}
        dataNamespace={getNamespacesReducer.data.find(
          namespace => namespace.id === match.params.idName
        )}
        idDep={match.params.idDep}
        handleDeleteConfigMap={this.handleDeleteConfigMap}
      />
    );
  };

  render() {
    const { status, configMapName, err } = this.props.deleteConfigMapReducer;
    return (
      <div>
        <Notification status={status} name={configMapName} errorMessage={err} />
        <div className={contentClassName}>
          <div className="tab-content">
            <div className="tab-pane pods active">
              {this.renderConfigMapsList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getDeploymentReducer,
    getNamespacesReducer,
    getConfigMapsByNSReducer,
    deleteConfigMapReducer
  }: ReduxState) => ({
    getDeploymentReducer,
    getNamespacesReducer,
    getConfigMapsByNSReducer,
    deleteConfigMapReducer
  }),
  (dispatch: Dispatch) => ({
    fetchDeleteConfigMapIfNeeded: (idName: string, idPod: string) =>
      dispatch(actionDeletePod.fetchDeleteConfigMapIfNeeded(idName, idPod)),
    fetchGetConfigMapsByNSIfNeeded: (idName: string) =>
      dispatch(actionGetConfigMapsByNS.fetchGetConfigMapsByNSIfNeeded(idName)),
    fetchGetDeploymentIfNeeded: (idName: string, idDep: string) =>
      dispatch(actionGetDeployment.fetchGetDeploymentIfNeeded(idName, idDep))
  })
);

export default connector(LinkedConfigMaps);
