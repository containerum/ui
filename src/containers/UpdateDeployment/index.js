/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import className from 'classnames/bind';
import cookie from 'react-cookies';

import { routerLinks } from '../../config';
import * as actionGetVolumes from '../../actions/volumesActions/getVolumesByNS';
import * as actionGetConfigMapsByNS from '../../actions/configMapActions/getConfigMapsByNS';
import * as actionGetSecrets from '../../actions/secretsActions/getSecrets';
import * as actionGetNamespace from '../../actions/namespaceActions/getNamespace';
import * as actionUpdateDeployment from '../../actions/deploymentActions/updateDeployment';
import * as actionGetDeployment from '../../actions/deploymentActions/getDeployment';
import type { Dispatch, ReduxState } from '../../types';
import NavigationHeaderItem from '../NavigationHeader';
import Notification from '../Notification';
import Base from '../CreateUpdateDeploymentBase';
import globalStyles from '../../theme/global.scss';
import { UPDATE_DEPLOYMENT_SUCCESS } from '../../constants/deploymentConstants/updateDeployment';

const globalClass = className.bind(globalStyles);

const containerClassName = globalClass(
  'containerFluid',
  'breadcrumbsNavigation'
);

type Props = {
  history: Object,
  match: Object,
  getVolumesByNSReducer: Object,
  getNamespaceReducer: Object,
  updateDeploymentReducer: Object,
  getDeploymentReducer: Object,
  getConfigMapsByNSReducer: Object,
  getSecretsReducer: Object,
  fetchGetNamespaceIfNeeded: (idName: string) => void,
  fetchGetConfigMapsByNSIfNeeded: (idName: string) => void,
  fetchGetSecretsIfNeeded: (idName: string) => void,
  fetchGetVolumesByNSIfNeeded: (idName: string) => void,
  fetchUpdateDeploymentIfNeeded: (
    idName: string,
    idDep: string,
    data: Object
  ) => void,
  fetchGetDeploymentIfNeeded: (idName: string, idDep: string) => void
};

// Export this for unit testing more easily
export class CreateDeployment extends PureComponent<Props> {
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  render() {
    const { match, updateDeploymentReducer } = this.props;
    return (
      <div>
        <Helmet
          title={`Update Deployment ${match.params.idDep} in ${
            match.params.idName
          }`}
        />
        <div className={containerClassName}>
          <NavigationHeaderItem
            idName={match.params.idName}
            IdUpdate="deployment"
          />
        </div>
        <Notification
          status={updateDeploymentReducer.status}
          name={
            updateDeploymentReducer.readyStatus === UPDATE_DEPLOYMENT_SUCCESS &&
            updateDeploymentReducer.data.name
          }
          method={updateDeploymentReducer.method}
          errorMessage={updateDeploymentReducer.err}
        />
        <div className={globalStyles.contentBlock}>
          <div className={`container ${globalStyles.containerNoBackground}`}>
            <Base
              getNamespaceReducer={this.props.getNamespaceReducer}
              updateDeploymentReducer={this.props.updateDeploymentReducer}
              getDeploymentReducer={this.props.getDeploymentReducer}
              getVolumesByNSReducer={this.props.getVolumesByNSReducer}
              getConfigMapsByNSReducer={this.props.getConfigMapsByNSReducer}
              getSecretsReducer={this.props.getSecretsReducer}
              match={this.props.match}
              fetchGetNamespaceIfNeeded={this.props.fetchGetNamespaceIfNeeded}
              fetchGetConfigMapsByNSIfNeeded={
                this.props.fetchGetConfigMapsByNSIfNeeded
              }
              fetchGetSecretsIfNeeded={this.props.fetchGetSecretsIfNeeded}
              fetchGetVolumesByNSIfNeeded={
                this.props.fetchGetVolumesByNSIfNeeded
              }
              fetchUpdateDeploymentIfNeeded={
                this.props.fetchUpdateDeploymentIfNeeded
              }
              fetchGetDeploymentIfNeeded={this.props.fetchGetDeploymentIfNeeded}
            />
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getVolumesByNSReducer,
    getNamespaceReducer,
    updateDeploymentReducer,
    getDeploymentReducer,
    getConfigMapsByNSReducer,
    getSecretsReducer
  }: ReduxState) => ({
    getVolumesByNSReducer,
    getNamespaceReducer,
    updateDeploymentReducer,
    getDeploymentReducer,
    getConfigMapsByNSReducer,
    getSecretsReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetVolumesByNSIfNeeded: (idName: string) =>
      dispatch(actionGetVolumes.fetchGetVolumesByNSIfNeeded(idName)),
    fetchGetNamespaceIfNeeded: (idName: string) =>
      dispatch(actionGetNamespace.fetchGetNamespaceIfNeeded(idName)),
    fetchGetConfigMapsByNSIfNeeded: (idName: string) =>
      dispatch(actionGetConfigMapsByNS.fetchGetConfigMapsByNSIfNeeded(idName)),
    fetchGetSecretsIfNeeded: (idName: string) =>
      dispatch(actionGetSecrets.fetchGetSecretsIfNeeded(idName)),
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
