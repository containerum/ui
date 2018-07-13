/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import className from 'classnames/bind';

import type { Dispatch, ReduxState } from '../../types';
import * as actionGetDeployment from '../../actions/deploymentActions/getDeployment';
import * as actionDeletePod from '../../actions/volumeActions/deleteVolume';
import {
  GET_DEPLOYMENT_INVALID,
  GET_DEPLOYMENT_REQUESTING,
  GET_DEPLOYMENT_FAILURE
  // GET_DEPLOYMENT_SUCCESS
} from '../../constants/deploymentConstants/getDeployment';
import {
  DELETE_VOLUME_SUCCESS,
  DELETE_VOLUME_REQUESTING
} from '../../constants/volumeConstants/deleteVolume';
import LinkedVolumesList from '../../components/LinkedVolumesList';
import Notification from '../Notification';

import globalStyles from '../../theme/global.scss';
import {
  GET_NAMESPACES_FAILURE,
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING
} from '../../constants/namespacesConstants/getNamespaces';

const globalClass = className.bind(globalStyles);

const contentClassName = globalClass(
  'contentBlockContent',
  'contentBlockContentFull'
);

type Props = {
  match: Object,
  getDeploymentReducer: Object,
  getNamespacesReducer: Object,
  deleteVolumeReducer: Object,
  fetchDeleteVolumeIfNeeded: (idName: string, idPod: string) => void,
  fetchGetDeploymentIfNeeded: (idName: string, idDep: string) => void
};

export class LinkedVolumes extends PureComponent<Props> {
  componentWillUpdate(nextProps) {
    if (
      this.props.deleteVolumeReducer.readyStatus !==
        nextProps.deleteVolumeReducer.readyStatus &&
      nextProps.deleteVolumeReducer.readyStatus === DELETE_VOLUME_SUCCESS
    ) {
      const { fetchGetDeploymentIfNeeded, match } = this.props;
      fetchGetDeploymentIfNeeded(match.params.idName, match.params.idDep);
    }
  }
  handleDeleteVolume = configMapName => {
    const { fetchDeleteVolumeIfNeeded, match } = this.props;
    fetchDeleteVolumeIfNeeded(match.params.idName, configMapName);
  };

  renderVolumesList = () => {
    const {
      match,
      getDeploymentReducer,
      getNamespacesReducer,
      deleteVolumeReducer
    } = this.props;

    if (
      !getNamespacesReducer.readyStatus ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING ||
      !getDeploymentReducer.readyStatus ||
      getDeploymentReducer.readyStatus === GET_DEPLOYMENT_INVALID ||
      getDeploymentReducer.readyStatus === GET_DEPLOYMENT_REQUESTING ||
      deleteVolumeReducer.readyStatus === DELETE_VOLUME_REQUESTING
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
      getDeploymentReducer.readyStatus === GET_DEPLOYMENT_FAILURE
    ) {
      return <p>Oops, Failed to load data of Pods!</p>;
    }

    const displayedContainers = getDeploymentReducer.data.containers[0]
      .config_maps
      ? getDeploymentReducer.data.containers[0].config_maps
      : [];
    return (
      <LinkedVolumesList
        displayedContainers={displayedContainers}
        dataNamespace={getNamespacesReducer.data.find(
          namespace => namespace.id === match.params.idName
        )}
        idDep={match.params.idDep}
        handleDeleteVolume={this.handleDeleteVolume}
      />
    );
  };

  render() {
    const { status, configMapName, err } = this.props.deleteVolumeReducer;
    return (
      <div>
        <Notification status={status} name={configMapName} errorMessage={err} />
        <div className={contentClassName}>
          <div className="tab-content">
            <div className="tab-pane pods active">
              {this.renderVolumesList()}
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
    deleteVolumeReducer
  }: ReduxState) => ({
    getDeploymentReducer,
    getNamespacesReducer,
    deleteVolumeReducer
  }),
  (dispatch: Dispatch) => ({
    fetchDeleteVolumeIfNeeded: (idName: string, idPod: string) =>
      dispatch(actionDeletePod.fetchDeleteVolumeIfNeeded(idName, idPod)),
    fetchGetDeploymentIfNeeded: (idName: string, idDep: string) =>
      dispatch(actionGetDeployment.fetchGetDeploymentIfNeeded(idName, idDep))
  })
);

export default connector(LinkedVolumes);
