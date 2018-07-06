/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import className from 'classnames/bind';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import cookie from 'react-cookies';

import { routerLinks } from '../../config';
import * as actionGetConfigMapsByNS from '../../actions/configMapActions/getConfigMapsByNS';
import * as actionGetNamespace from '../../actions/namespaceActions/getNamespace';
import * as actionCreateDeployment from '../../actions/deploymentActions/createDeployment';
import * as actionCreateInternalService from '../../actions/serviceActions/createInternalService';
import * as actionCreateExternalService from '../../actions/serviceActions/createExternalService';
import { CREATE_DEPLOYMENT_SUCCESS } from '../../constants/deploymentConstants/createDeployment';
import type { Dispatch, ReduxState } from '../../types';
import NavigationHeaderItem from '../NavigationHeader';

import Notification from '../Notification';

import globalStyles from '../../theme/global.scss';

import Base from '../CreateUpdateDeploymentBase';

const globalClass = className.bind(globalStyles);

const containerClassName = globalClass(
  'containerFluid',
  'breadcrumbsNavigation'
);

type Props = {
  // getVolumesByNSReducer: Object,
  getNamespaceReducer: Object,
  createDeploymentReducer: Object,
  getConfigMapsByNSReducer: Object,
  createExternalServiceReducer: Object,
  history: Object,
  match: Object,
  fetchGetNamespaceIfNeeded: (idName: string) => void,
  fetchGetConfigMapsByNSIfNeeded: (idName: string) => void,
  // fetchGetVolumesByNSIfNeeded: (idName: string) => void,
  fetchCreateDeploymentIfNeeded: (idName: string, data: Object) => void,
  fetchCreateInternalServiceIfNeeded: (idName: string, data: Object) => void,
  fetchCreateExternalServiceIfNeeded: (idName: string, data: Object) => void
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
    const { match, createDeploymentReducer } = this.props;
    return (
      <div>
        <Helmet title={`Create Deployment in ${match.params.idName}`} />
        <div className={containerClassName}>
          <NavigationHeaderItem
            idName={match.params.idName}
            IdCreate="deployment"
          />
        </div>
        <Notification
          status={createDeploymentReducer.status}
          name={
            createDeploymentReducer.readyStatus === CREATE_DEPLOYMENT_SUCCESS &&
            createDeploymentReducer.data.name
          }
          method={createDeploymentReducer.method}
          errorMessage={createDeploymentReducer.err}
        />
        <div className={globalStyles.contentBlock}>
          <div className={`container ${globalStyles.containerNoBackground}`}>
            <Base
              getNamespaceReducer={this.props.getNamespaceReducer}
              createDeploymentReducer={this.props.createDeploymentReducer}
              getConfigMapsByNSReducer={this.props.getConfigMapsByNSReducer}
              createExternalServiceReducer={
                this.props.createExternalServiceReducer
              }
              history={this.props.history}
              match={this.props.match}
              fetchGetNamespaceIfNeeded={this.props.fetchGetNamespaceIfNeeded}
              fetchGetConfigMapsByNSIfNeeded={
                this.props.fetchGetConfigMapsByNSIfNeeded
              }
              // fetchGetVolumesByNSIfNeeded: (idName: string) => void,
              fetchCreateDeploymentIfNeeded={
                this.props.fetchCreateDeploymentIfNeeded
              }
              fetchCreateInternalServiceIfNeeded={
                this.props.fetchCreateInternalServiceIfNeeded
              }
              fetchCreateExternalServiceIfNeeded={
                this.props.fetchCreateExternalServiceIfNeeded
              }
            />
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
    createDeploymentReducer,
    createExternalServiceReducer,
    createInternalServiceReducer,
    getConfigMapsByNSReducer
  }: ReduxState) => ({
    // getVolumesByNSReducer,
    getNamespaceReducer,
    createDeploymentReducer,
    createExternalServiceReducer,
    createInternalServiceReducer,
    getConfigMapsByNSReducer
  }),
  (dispatch: Dispatch) => ({
    // fetchGetVolumesByNSIfNeeded: (idName: string) =>
    //   dispatch(actionGetVolumes.fetchGetVolumesByNSIfNeeded(idName)),
    fetchGetNamespaceIfNeeded: (idName: string) =>
      dispatch(actionGetNamespace.fetchGetNamespaceIfNeeded(idName)),
    fetchGetConfigMapsByNSIfNeeded: (idName: string) =>
      dispatch(actionGetConfigMapsByNS.fetchGetConfigMapsByNSIfNeeded(idName)),
    fetchCreateDeploymentIfNeeded: (idName: string, data: Object) =>
      dispatch(
        actionCreateDeployment.fetchCreateDeploymentIfNeeded(idName, data)
      ),
    fetchCreateInternalServiceIfNeeded: (idName: string, data: Object) =>
      dispatch(
        actionCreateInternalService.fetchCreateInternalServiceIfNeeded(
          idName,
          data
        )
      ),
    fetchCreateExternalServiceIfNeeded: (idName: string, data: Object) =>
      dispatch(
        actionCreateExternalService.fetchCreateExternalServiceIfNeeded(
          idName,
          data
        )
      )
  })
);

export default connector(CreateDeployment);
