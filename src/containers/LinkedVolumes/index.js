/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import className from 'classnames/bind';

import type { Dispatch, ReduxState } from '../../types';
import * as actionGetDeployment from '../../actions/deploymentActions/getDeployment';
import {
  GET_DEPLOYMENT_INVALID,
  GET_DEPLOYMENT_REQUESTING,
  GET_DEPLOYMENT_FAILURE
  // GET_DEPLOYMENT_SUCCESS
} from '../../constants/deploymentConstants/getDeployment';
import LinkedVolumesList from '../../components/LinkedVolumesList';

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
  getNamespacesReducer: Object
};

export class LinkedVolumes extends PureComponent<Props> {
  renderVolumesList = () => {
    const { match, getDeploymentReducer, getNamespacesReducer } = this.props;

    if (
      !getNamespacesReducer.readyStatus ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING ||
      !getDeploymentReducer.readyStatus ||
      getDeploymentReducer.readyStatus === GET_DEPLOYMENT_INVALID ||
      getDeploymentReducer.readyStatus === GET_DEPLOYMENT_REQUESTING
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
      return <p>Oops, Failed to load data of Volumes!</p>;
    }

    const displayedContainers = getDeploymentReducer.data.containers[0]
      .volume_mounts
      ? getDeploymentReducer.data.containers[0].volume_mounts
      : [];
    return (
      <LinkedVolumesList
        data={displayedContainers}
        dataNamespace={getNamespacesReducer.data.find(
          namespace => namespace.id === match.params.idName
        )}
        idName={match.params.idName}
      />
    );
  };

  render() {
    return (
      <div>
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
  ({ getDeploymentReducer, getNamespacesReducer }: ReduxState) => ({
    getDeploymentReducer,
    getNamespacesReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetDeploymentIfNeeded: (idName: string, idDep: string) =>
      dispatch(actionGetDeployment.fetchGetDeploymentIfNeeded(idName, idDep))
  })
);

export default connector(LinkedVolumes);
